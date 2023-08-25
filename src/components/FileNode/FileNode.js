import React from 'react';
import { FileTypes } from '../../common/commonConstants.js';
import useFileExplorerStore from '../../stores/useFileExplorerStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faCircle, faFile, faFolder, faTrash } from '@fortawesome/free-solid-svg-icons';

const ToggleButton = ( { expanded, onToggle } ) => (
    <button className="fa-icon" onClick={onToggle}>
        <FontAwesomeIcon
            icon={expanded ? faChevronDown : faChevronRight}
            className="toggle-icon"
        />
    </button>
);

const CircleButton = () => (
    <button className="fa-icon fa-icon-red">
        <FontAwesomeIcon icon={faCircle} className="circle-icon" />
    </button>
);

const Label = ( { text } ) => <span className="node-label">{text}</span>;

const AddButtons = ( { onAddFile, onAddFolder } ) => (
    <React.Fragment>
        <button className="fa-icon addFileBtn" onClick={onAddFile}>
            <FontAwesomeIcon icon={faFile} className="add-icon" />
        </button>
        <button className="fa-icon addFolderBtn" onClick={onAddFolder}>
            <FontAwesomeIcon icon={faFolder} className="add-icon" />
        </button>
    </React.Fragment>
);

const DeleteButton = ( { onDelete } ) => (
    <button className="fa-icon deleteBtn" onClick={onDelete}>
        <FontAwesomeIcon icon={faTrash} className="delete-icon" />
    </button>
);

const FileNode = ( { node } ) => {
    const { dispatch } = useFileExplorerStore();
    const handleToggleItem = () => {
        dispatch( {
            type: 'TOGGLE_NODE',
            payload: { nodeId: node.id },
        } );
    };

    const handleAddItem = ( itemType ) => {
        dispatch( {
            type: 'ADD_NODE',
            payload: { fileType: itemType, parentId: node.id },
        } );
    };

    const handleDeleteItem = () => {
        dispatch( {
            type: 'DELETE_NODE',
            payload: { nodeId: node.id },
        } );
    };

    const bShowFileNodesButton = node.fileType === FileTypes.FOLDER_TYPE;
    const bShowExpandIcon = node.fileType === FileTypes.FOLDER_TYPE;

    return (
        <div className="node" id={node.id}>
            {bShowExpandIcon ? (
                <ToggleButton expanded={node.expanded} onToggle={handleToggleItem} />
            ) : (
                <CircleButton />
            )}

            <Label text={node.label} />

            {bShowFileNodesButton && (
                <AddButtons onAddFile={() => handleAddItem( FileTypes.FILE_TYPE )} onAddFolder={() => handleAddItem( FileTypes.FOLDER_TYPE )} />
            )}

            <DeleteButton onDelete={handleDeleteItem} />
        </div>
    );
};

export default FileNode;
