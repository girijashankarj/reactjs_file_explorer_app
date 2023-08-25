// FooterView.js

import React from 'react';
import { faLinkedin, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';
import IconView from '../IconView/IconView';

const FooterLinks = ( { href, icon, tooltipText } ) => {
    return (
        <a className="fa-icon" href={href} rel="noopener">
            <IconView icon={icon} tooltipText={tooltipText} />
        </a>
    )
}

const FooterView = () => {
    return (
        <footer id='mainFooter'>
            <div style={{ textAlign: 'right' }}>React Flux Assignment</div>
            <div className="social-icons">
                <FooterLinks href={'https://www.linkedin.com'} icon={faLinkedin} tooltipText={'LinkedIn'} />
                <FooterLinks href={'https://www.github.com'} icon={faGithub} tooltipText={'GitHub'} />
                <FooterLinks href={'https://www.medium.com'} icon={faMedium} tooltipText={'Medium'} />
            </div>
        </footer>
    );
};

export default FooterView;
