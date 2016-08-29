/**
 * Module dependencies.
 */
import TreeView from './src';
import {render} from 'react-dom';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./src/style.less";

var data = [
    {
        text: 'Parent 1',
        selectable: false,
        nodes: [
            {
                text: 'Child 1',
                selectable: false,
                nodes: [
                    {
                        selectable: true,
                        text: 'Grandchild 1'
                    },
                    {
                        text: 'Grandchild 2'
                    }
                ]
            },
            {
                text: 'Child 2'
            }
        ]
    },
    {
        text: 'Parent 2'
    },
    {
        text: 'Parent 3'
    },
    {
        text: 'Parent 4'
    },
    {
        text: 'Parent 5'
    }
];

render(<TreeView data={data} color={"#428bca"} />, document.getElementById('treeview'));