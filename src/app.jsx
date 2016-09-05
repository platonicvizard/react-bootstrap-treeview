/**
 * Module dependencies.
 */
import TreeView from './index.jsx';
import {render} from 'react-dom';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.less";

var data = [
    {
        text: "Parent 1",
        icon: "none",
        color: "#000000",
        backColor: "#FFFFFF",
        state: {
            expanded: true
        },
        tags: ['available'],
        nodes: [
            {
                text: "Child 1",
                icon: "none",
                color: "#000000",
                backColor: "#FFFFFF",
                href: "google.com",
                state: {
                    expanded: true
                },

                tags: ['available'],
                nodes: [
                    {
                        text: "Grandchild 1",
                        icon: "glyphicon glyphicon-flag",
                        color: "#000000",
                        backColor: "#FFFFFF",
                        state: {
                            expanded: true,
                            selectedEvent: function (e) {
                                console.log(e);
                            },
                            selectable: true
                        },
                        tags: ['available']
                    }
                ]
            },
            {
                text: "Child 2",
                icon: "glyphicon glyphicon-flag",
                color: "#000000",
                backColor: "#FFFFFF",
                state: {
                    expanded: true,
                    selected: false,
                    selectable: true
                },
                tags: ['available']
            }
        ]
    },
    {
        text: "Parent 2"
    },
    {
        text: "Parent 3",
        state: {
            expanded: false,
            selected: false,
            selectable: false
        },
        nodes: [
            {
                el: "s",
                elProps: {
                    className: "pull-left",
                    style: { color: "#F00" }
                },
                selectedEvent: function (e) { //this should not get call since this is not sellectable
                    console.log(e);
                },
                text: "Child 1",
                icon: "glyphicon glyphicon-flag",
                color: "#000000",
                backColor: "#FFFFFF",
                state: {
                    expanded: false,
                    selected: false,
                    selectable: false
                },
                tags: ['available']
            }, {
                text: "Child 2",
                icon: "glyphicon glyphicon-home",
                color: "#000000",
                backColor: "#FFFFFF",
                state: {
                    expanded: true,
                    selected: false,
                    selectable: true
                },
                tags: ['available']
            }
        ]
    },
    {
        text: "Parent 3"
    }
];

render(<TreeView singleSelection={true} data={data} color={"#428bca"} />, document.getElementById('treeview'));