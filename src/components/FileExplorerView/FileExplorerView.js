// FileExplorerView.js

import React from 'react';
import FileNode from '../FileNode/FileNode.js';
import useFileExplorerStore from '../../stores/useFileExplorerStore';

const RenderNodes = ( { parentNode } ) => {
    const { children, ...nodeElements } = parentNode;
    const showChildrens = parentNode.expanded && children && children.length > 0;
    return (
        <>
            <FileNode node={nodeElements} />
            {showChildrens && (
                <div className="children-container">
                    {
                        children.map( ( child ) => {
                            return (
                                <RenderNodes parentNode={child} />
                            )
                        } )
                    }
                </div>
            )}
        </>
    );
};

const FileExplorerView = () => {
    const { state: filesCollection } = useFileExplorerStore();
    return (
        <section id='mainSection'>
            <div id='fileExplorer'>
                <RenderNodes parentNode={filesCollection} />
            </div>
        </section>
    );
};

export default FileExplorerView;
