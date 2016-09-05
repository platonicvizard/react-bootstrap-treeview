import React, {Component} from 'react';

class TreeNode extends Component {

    constructor(props, context) {
        super(props, context);
        var node = this.props.node;
        this.selectedEventProp = this.props.selectedEvent;
        
        var getProp = this.getProp = (name, defaultValue) => {
            var state = node.state;
            return (state && state.hasOwnProperty(name)) ? state[name] : defaultValue;
        };
        this.selectedEvent = this.selectedEvent.bind(this);
        this.state = {
            expanded: getProp('expanded', (this.props.level < this.props.options.levels) ? true : false),
            selected: getProp('selected', false),
            selectable: getProp('selectable', false),
            selectedEvent: this.selectedEvent
        };
        this.toggleExpanded = this.toggleExpanded.bind(this);
        this.toggleSelected = this.toggleSelected.bind(this);
        this.curSelected = null;
        this.prevSelected = null;
    }
    selectedEventProp(e) { 
        console.log(e);
    }
    selectedEvent(e) {
        var event = this.getProp('selectedEvent', null);
        if (event) {
            event.apply(this,e);
        }
        this.prevSelected = this.curSelected;
        this.curSelected = this;
        var se = this.selectedEventProp;

        if (se) { 
            se.apply(this,[e]);
        }
    }
    toggleExpanded(event, id) {
        this.setState({ expanded: !this.state.expanded });
        event.stopPropagation();
        return false;
    }
    toggleSelected(index, event, id) {
        if (!this.state.selectable) { return; }
        this.setState({ selected: !this.state.selected });
        var selectedEvent = this.state.selectedEvent;
        if (selectedEvent) {
            selectedEvent.bind(this, [event])();
        }
        event.stopPropagation();
    }
    render() {

        var node = this.props.node;
        var options = this.props.options;

        var style;
        if (!this.props.visible) {
            style = { display: 'none' };
        }
        else {

            if (options.highlightSelected && this.state.selected) {
                style = {
                    color: options.selectedColor,
                    backgroundColor: options.selectedBackColor
                };
            }
            else {
                style = {
                    color: node.color || options.color,
                    backgroundColor: node.backColor || options.backColor
                };
            }

            style.border = !options.showBorder ? 'none' : '1px solid ' + options.borderColor;
        }

        var indents = [];
        for (var i = 0; i < this.props.level - 1; i++) {
            var k = node.text;//.replace(' ', '-').toLowerCase();
            indents.push(<span key={k + 'indent-' + i} className='indent'> </span>);
        }

        var clickEvent = this.toggleExpanded;
        var expandIcon = !this.state.expanded ? options.expandIcon : options.collapseIcon;
        var expandCollapseIcon = node.nodes ? (<span className={expandIcon} onClick={ clickEvent }> </span>) : (<span className={options.emptyIcon}></span>);

        var nodeIcon = (
            <span className='icon'>
                <i className={node.icon || options.nodeIcon}></i>
            </span>
        );

        var nodeText;
        var badges;
        var el = node.el;
        var np = node.elProps;

        np = np ? np : {};
        if (!np.href) {
            np.href = node.href;
        }

        el = el ? el : (options.enableLinks ? 'a' : 'span');

        nodeText = React.createElement(el, np, node.text);


        if (options.showTags && node.tags) {
            badges = node.tags.map(function (tag, index, arr) {
                return (<span key={'badge-' + index} className='badge'>{tag}</span>);
            });
        }

        var children = [];

        if (node.nodes) {
            var _this = this;
            node.nodes.forEach(function (node, index, arr) {
                children.push(
                    <ul className="list-group" key={'parent-node-' + index}>
                        <TreeNode selectedEvent={_this.props.selectedEvent}
                            key={'child-parent-node-' + index}
                            node={node}
                            level={_this.props.level + 1}
                            visible={_this.state.expanded && _this.props.visible}
                            options={options} />
                    </ul>);
            });
        }

        return (
            <li className='list-group-item'
                style={style}
                onClick={this.toggleSelected.bind(this, node.nodeId) }
                key={node.nodeId}
                >
                {indents}
                {expandCollapseIcon}
                {nodeIcon}
                {nodeText}
                {badges}
                {children}
            </li>
        );
    }
};
export default TreeNode;