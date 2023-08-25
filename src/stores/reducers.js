import { ValidationContext } from '../common/commonConstants';
import { addNode, deleteNodeRecursive, expandNodesByParentPath, toggleNode, toggleNodesExpandStatus, validateFileName } from '../common/utils';

// Reducer function
export const fileExplorerReducer = ( state, action ) => {
    let newState = { ...state };
    const { parentId, nodeId, searchLabel, fileType, expandStatus } = action.payload;

    switch ( action.type ) {
        case 'ADD_NODE':
            const itemName = prompt( `Enter ${fileType} name: ` );
            const validationResult = validateFileName( itemName, { ...newState }, ValidationContext.ADD_ITEM );
            if ( validationResult ) {
                alert( `Validation Failed: ${validationResult}` );
            } else {
                newState = addNode( newState, itemName, fileType, parentId );
            }
            break;
        case 'DELETE_NODE':
            if ( nodeId === 'rootFolder' ) {
                alert( 'Validation Failed: Cannot Delete Root Folder' );
            } else {
                newState = deleteNodeRecursive( newState, nodeId );
            }
            break;
        case 'TOGGLE_NODE':
            newState = toggleNode( newState, nodeId );
            break;
        case 'SEARCH_AND_EXPAND_NODE':
            const searchValidation = validateFileName( searchLabel, { ...newState }, ValidationContext.SEARCH_ITEM );
            if ( searchValidation ) {
                alert( `Search Validation Failed: ${searchValidation}` );
            } else {
                newState = expandNodesByParentPath( newState, searchLabel );
            }
            break;
        case 'EXPAND_NODES':
            newState = toggleNodesExpandStatus( newState, expandStatus );
            break;
        default:
        // No-op
    }

    return newState;
};