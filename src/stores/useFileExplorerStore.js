import { useReducer } from 'react';
import { fileExplorerReducer } from './reducers'; // Assuming you've defined the reducer as shown earlier
import { ExpandStatus, FileTypes } from '../common/commonConstants';

// Custom hook to use the file explorer store
const useFileExplorerStore = () => {
    const initialState = {
        id: 'rootFolder',
        label: 'Root Folder',
        fileType: FileTypes.FOLDER_TYPE,
        expanded: ExpandStatus.EXPAND,
        children: [],
    };

    const [state, dispatch] = useReducer( fileExplorerReducer, initialState );

    return {
        state,
        dispatch,
    };
};

export default useFileExplorerStore;
