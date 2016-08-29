/********************************************************************************** */
// Based on: https://github.com/jonmiles/react-bootstrap-treeview
/********************************************************************************** */

import React, {Component} from 'react';
import TreeNode from './TreeNode.jsx';

class TreeView extends Component {

    constructor(props, context) {
        super(props, context);

        this.setNodeId = (node) => {

            if (!node.nodes) return;

            var _this = this;
            node.nodes.forEach(function checkStates(node) {
                node.nodeId = _this.props.nodes.length;
                _this.props.nodes.push(node);
                _this.setNodeId(node);
            });
        }
    }

    render() {

        var data = this.props.data;
        this.setNodeId({ nodes: data });

        var children = [];
        if (data) {
            var _this = this;
            data.forEach(function (node, index, arr) {
                children.push(<TreeNode
                    key={'root-parent-node-'+index}
                    node={node}
                    level={1}
                    visible={true}
                    options={_this.props} />);
            });
        }

        return (
            <div id='treeview' className='treeview col-sm-10 col-lg-12' style={this.props.style}>
                <ul className='list-group'>
                    {children}
                </ul>
            </div>
        );
    }
}

TreeView.propTypes = {
    levels: React.PropTypes.number,

    expandIcon: React.PropTypes.string,
    collapseIcon: React.PropTypes.string,
    emptyIcon: React.PropTypes.string,
    nodeIcon: React.PropTypes.string,

    color: React.PropTypes.string,
    backColor: React.PropTypes.string,
    borderColor: React.PropTypes.string,
    onhoverColor: React.PropTypes.string,
    selectedColor: React.PropTypes.string,
    selectedBackColor: React.PropTypes.string,

    enableLinks: React.PropTypes.bool,
    highlightSelected: React.PropTypes.bool,
    showBorder: React.PropTypes.bool,
    showTags: React.PropTypes.bool,

    nodes: React.PropTypes.arrayOf(React.PropTypes.number)
}
TreeView.defaultProps = {
    levels: 2,

    expandIcon: 'glyphicon glyphicon-plus',
    collapseIcon: 'glyphicon glyphicon-minus',
    emptyIcon: 'glyphicon',
    nodeIcon: 'glyphicon glyphicon-stop',

    color: undefined,
    backColor: undefined,
    borderColor: undefined,
    onhoverColor: '#F5F5F5', // TODO Not implemented yet, investigate radium.js 'A toolchain for React component styling'
    selectedColor: '#FFFFFF',
    selectedBackColor: '#428bca',

    enableLinks: false,
    highlightSelected: true,
    showBorder: true,
    showTags: false,

    nodes: []
};

export default TreeView;