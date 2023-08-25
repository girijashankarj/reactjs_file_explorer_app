// utils.js

import { ExpandStatus, FileTypes, ValidationContext } from "./commonConstants";

export const createNewItem = ( itemName, fileType ) => {
    // Implement your createNewItem logic based on your provided code
    const newItem = {
        id: Math.random().toString( 36 ).substr( 2, 9 ),
        label: capitalizeFirstLetter( itemName ),
        fileType: fileType,
        expanded: fileType === FileTypes.FOLDER_TYPE ? ExpandStatus.EXPAND : null,
        children: fileType === FileTypes.FOLDER_TYPE ? [] : null,
    };
    return newItem;
}

export const findNodeById = ( parent, nodeId ) => {
    if ( parent.id === nodeId ) {
        return parent;
    } else if ( parent.children ) {
        for ( const child of parent.children ) {
            const foundNode = findNodeById( child, nodeId );
            if ( foundNode ) {
                return foundNode;
            }
        }
    }
    return null;
}

export const findNodeByLabel = ( parent, label ) => {
    if ( parent.label === label ) {
        return parent;
    } else if ( parent.children ) {
        for ( const child of parent.children ) {
            const foundNode = findNodeByLabel( child, label );
            if ( foundNode ) {
                return foundNode;
            }
        }
    }
    return null;
}

export const validateFileName = ( fileName = "", state, validationContext ) => {
    // Implement your validateFileName logic based on your provided code
    const maxCharLimit = 50;

    // Check character limit
    if ( fileName.length < 0 || fileName.trim() === '' ) {
        return 'File name is empty.';
    }

    const checkFileName = fileName.trim();

    // Check character limit
    if ( checkFileName.length > maxCharLimit ) {
        return 'File name exceeds the maximum character limit of 50.';
    }

    // Check for special characters
    // eslint-disable-next-line no-useless-escape
    const specialChars = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/]/;
    if ( specialChars.test( checkFileName ) ) {
        return 'File name contains special characters. Only alphanumeric characters are allowed.';
    }

    // Check for duplicates
    const fileFound = findNodeByLabel( state, checkFileName );
    if ( fileFound != null && validationContext === ValidationContext.ADD_ITEM ) {
        return 'File name is a duplicate and already exists.';
    }

    if ( fileFound != null && validationContext === ValidationContext.SEARCH_ITEM ) {
        return 'File not Found.';
    }

    return null; // Validation successful
}

export const capitalizeFirstLetter = ( string ) => {
    return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
}

export const findParentPath = ( node, label ) => {
    if ( node.label === label ) {
        return [node.id];
    } else if ( node.children ) {
        return node.children.reduce( ( acc, childNode ) => {
            const path = findParentPath( childNode, label );
            if ( path ) {
                return path.concat( node.id );
            } else {
                return acc;
            }
        }, null );
    } else {
        return null;
    }
};

export function addNode( children, itemName, fileType, parentId ) {
    const newItem = createNewItem( itemName, fileType );
    const parent = findNodeById( children, parentId );
    parent.children.push( newItem );
    parent.expanded = ExpandStatus.EXPAND;
    return children;
}

export function deleteNodeRecursive( children, targetNodeId ) {
    const newChildren = children.filter( child => child.id !== targetNodeId );
    for ( let i = 0; i < newChildren.length; i++ ) {
        newChildren[i].children = deleteNodeRecursive( newChildren[i].children, targetNodeId );
    }
    return newChildren;
}

export function toggleNode( children, nodeId ) {
    return children.map( child => {
        if ( child.id === nodeId && child.fileType === FileTypes.FOLDER_TYPE ) {
            return { ...child, expanded: !child.expanded };
        }
        return child;
    } );
}

export function toggleNodesExpandStatus( children, expandStatus ) {
    return children.map( child => {
        const newChild = { ...child, expanded: expandStatus };
        if ( newChild.children ) {
            newChild.children = toggleNodesExpandStatus( newChild.children, expandStatus );
        }
        return newChild;
    } );
}

export function expandNodesByParentPath( children, searchLabel ) {
    return children.map( child => {
        const newChild = { ...child };
        if ( searchLabel.includes( newChild.id ) ) {
            newChild.expanded = ExpandStatus.EXPAND;
        } else {
            newChild.expanded = ExpandStatus.COLLAPSE;
        }
        if ( newChild.children ) {
            newChild.children = expandNodesByParentPath( newChild.children, searchLabel );
        }
        return newChild;
    } );
}
