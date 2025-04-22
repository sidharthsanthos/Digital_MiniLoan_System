import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import './ui_loan.css';

function Profile_sidebar({setActiveComponent}) {
    const [isCollapsed, setIsCollapsed] = useState(false); // False means full view

    const toggleSidebar = () => {
        setIsCollapsed(prev => !prev);
    };

    return (
        <div className='cccc'>
        <div className="d-flex flex-column">
            {/* Toggle Button */}
            <button
                className='navbar-toggler'
                type='button'
                onClick={toggleSidebar}
                aria-controls='sidebar'
                aria-expanded={!isCollapsed}
                aria-label="Toggle navigation"
                style={{ zIndex: 1,backgroundColor:"#15171a",color:"white" }} // Ensures the button is on top
            >
                <span className='navbar-toggler-icon' >
                <i className={`bi bi-list`} />
                </span>
            </button>

            {/* Sidebar */}
            <div className={`bg-dark min-vh-100 ${isCollapsed ? 'collapsed' : 'expanded'}`} id='sidebar' style={{ transition: 'width 0.3s ease', width: isCollapsed ? '60px' : '250px' }}>
                <ul className='nav flex-column p-3'>
                    <li className='nav-item mb-2'>
                        <a className='nav-link px-2' style={{cursor:"pointer"}} onClick={()=>setActiveComponent('Home')}>
                            <i className='bi bi-house' />
                            <span className={`ms-1 ${isCollapsed ? 'd-none' : 'd-inline'}`}>User Details</span>
                        </a>
                    </li>
                    <li className='nav-item mb-2'>
                        <a className='nav-link px-2' style={{cursor:"pointer"}} onClick={()=>setActiveComponent('Edit')}>
                            <i className='bi bi-pencil' />
                            <span className={`ms-1 ${isCollapsed ? 'd-none' : 'd-inline'}`}>Edit Profile</span>
                        </a>
                    </li>
                    <li className='nav-item mb-2'>
                        <a className='nav-link px-2' style={{cursor:"pointer"}} onClick={()=>setActiveComponent('Change_pass')}>
                            <i className='bi bi-key' />
                            <span className={`ms-1 ${isCollapsed ? 'd-none' : 'd-inline'}`}>Change Password</span>
                        </a>
                    </li>
                    <li className='nav-item mb-2'>
                        <a className='nav-link px-2' style={{cursor:"pointer"}} onClick={()=>setActiveComponent('Transaction')}>
                        <i className='bi bi-clock-history' />
                            <span className={`ms-1 ${isCollapsed ? 'd-none' : 'd-inline'}`}>Transactions</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        </div>
    );
}

export default Profile_sidebar;
