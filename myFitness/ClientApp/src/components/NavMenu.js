import './NavComponents.css';
import { Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import './NavMenu.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck, faUser, faDumbbell, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { BaseRoutes } from './helper/Routing';
import { Link } from 'react-router-dom';
import { Styling } from '././helper/Constants';
const NavMenu = () => {
    const [anchorEl, setAnchorEl] = useState({});
    const [activeIcon, setActiveIcon] = useState(null);
    const handleButtonClick = (index) => {
        setActiveIcon(index);
    };
    const renderIconButton = (icon, index, route) => {
        const isActive = activeIcon === index;
        const iconColor = activeIcon === index ? Styling.DeepBlue : 'white';
        return (
            <Link to={`${route}`}>
    
                <button
                    onClick={() => handleButtonClick(index)}
                    style={{
                        backgroundColor: isActive ? 'white' : 'transparent',
                        border: 'none',
                        outline: 'none',
                        borderRadius: '4px',
                        height: '30px',
                        width: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 8px',
                        cursor: 'pointer'
                    }}
                >
                    <FontAwesomeIcon icon={icon} sx={{ color: 'white' }} style={{ color: iconColor, fontSize: '16px' }} />
                </button>

            </Link>
        );
    };
    const createGroup = (icon, name, url) => {
        return {
            icon,
            name,
            url
        }
    }
    const links = [
        createGroup(faUser, null, BaseRoutes.Profile),
        createGroup(faCalendarCheck, null, BaseRoutes.Event),
        createGroup(faDumbbell, null, BaseRoutes.Workout),
        createGroup(faSignInAlt, null, BaseRoutes.Attendance),
    ];
    const generateNavButtons = () => {
        return links.map((group, index) => {
            return (
                <li key={index}>
                    {renderIconButton(group.icon, index, group.url)}
                </li>
            );
        });
    };
    
    return (
        <div className="item-display">
            {/* <div className="side-panel">
                <ul>
                    {generateNavButtons()}
                </ul>
            </div> */}
        </div>
    )
}

export default NavMenu;