// IconView.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IconView = ( { icon, tooltipText } ) => {
    return (
        <FontAwesomeIcon icon={icon} className="fa-icon tooltip" aria-hidden="true">
            <span className="tooltiptext">{tooltipText}</span>
        </FontAwesomeIcon>
    );
};

export default IconView;
