// HeaderView.js

import React from 'react';
import { ExpandStatus } from '../../common/commonConstants.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faExpand, faCompress, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import IconView from '../IconView/IconView.js';
import useFileExplorerStore from '../../stores/useFileExplorerStore';

const TitleView = () => {
    return (
        <span id="title-container">
            <FontAwesomeIcon icon={faFolderOpen} />
            <span>File Explorer</span>
        </span>
    )
};

const SearchSection = () => {
    const { dispatch } = useFileExplorerStore();
    const handleSearchClick = ( searchInputValue ) => {
        dispatch( {
            type: 'SEARCH_AND_EXPAND_NODE',
            payload: { searchLabel: searchInputValue },
        } );
    };
    return (
        <span id="search-container">
            <input
                type="text"
                id="searchInput"
                placeholder="Search files..."
                onKeyDown={( event ) => {
                    if ( event.key === 'Enter' ) {
                        handleSearchClick( event.target.value );
                    }
                }}
            />
            <button id="clearButton" className="fa-icon fa-icon-black" onClick={() => handleSearchClick()}>
                <IconView icon={faTimes} tooltipText={'Clear Input'} />
            </button>
            <button
                id="searchButton"
                className="fa-icon fa-icon-black"
                onClick={() => handleSearchClick( document.getElementById( 'searchInput' ).value )}
            >
                <IconView icon={faSearch} tooltipText={'Search File'} />
            </button>
        </span>
    )
};

const OperationButtons = ( { dispatcher } ) => {
    const { dispatch } = useFileExplorerStore();
    const handleExpandAllClick = () => {
        dispatch( {
            type: 'EXPAND_NODES',
            payload: { expandStatus: ExpandStatus.EXPAND },
        } );
    };

    const handleCollapseAllClick = () => {
        dispatch( {
            type: 'EXPAND_NODES',
            payload: { expandStatus: ExpandStatus.COLLAPSE },
        } );
    };

    return (
        <span id="operationSection">
            <button id="expanAllButton" className="fa-icon fa-icon-black" onClick={handleExpandAllClick}>
                <IconView icon={faExpand} tooltipText={'Expand All'} />
            </button>
            <button id="collapseAllButton" className="fa-icon fa-icon-black" onClick={handleCollapseAllClick}>
                <IconView icon={faCompress} tooltipText={'Collapse All'} />
            </button>
        </span>
    )
};

const HeaderView = ( { dispatcher } ) => {
    return (
        <header id='mainHeader'>
            <TitleView />
            <OperationButtons />
            <SearchSection />
        </header>
    );
};

export default HeaderView;
