import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import './ui_loan.css';

function A_sidebar({setActiveComponent}) {
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
                            <i className='bi bi-credit-card' />
                            <span className={`ms-1 ${isCollapsed ? 'd-none' : 'd-inline'}`}>Home</span>
                        </a>
                    </li>
                    <li className='nav-item mb-2'>
                        <a className='nav-link px-2'style={{cursor:"pointer"}} onClick={()=>setActiveComponent('User_List')}>
                            <i className='bi bi-calendar' />
                            <span className={`ms-1 ${isCollapsed ? 'd-none' : 'd-inline'}`}>Users List</span>
                        </a>
                    </li>
                    <li className='nav-item mb-2'>
                        <a className='nav-link px-2'style={{cursor:"pointer"}} onClick={()=>setActiveComponent('Loan')}>
                            <i className='bi bi-list' />
                            <span className={`ms-1 ${isCollapsed ? 'd-none' : 'd-inline'}`}>Loan List</span>
                        </a>
                    </li>
                    <li className='nav-item mb-2'>
                        <a className='nav-link px-2'style={{cursor:"pointer"}} onClick={()=>setActiveComponent('Investments')}>
                        <i className="bi bi-graph-up" />
                            <span className={`ms-1 ${isCollapsed ? 'd-none' : 'd-inline'}`}>Investment List</span>
                        </a>
                    </li>
                    <li className='nav-item mb-2'>
                        <a className='nav-link px-2'style={{cursor:"pointer"}} onClick={()=>setActiveComponent('Transactions')}>
                            <i class='bi bi-arrow-left-right' />
                            <span className={`ms-1 ${isCollapsed ? 'd-none' : 'd-inline'}`}>Transactions</span>
                        </a>
                    </li>
                    <li className='nav-item mb-2'>
                        <a className='nav-link px-2'style={{cursor:"pointer"}} onClick={()=>setActiveComponent('Loan_settings')}>
                            <i class='bi bi-sliders' />
                            <span className={`ms-1 ${isCollapsed ? 'd-none' : 'd-inline'}`}>Set Intrest Rate</span>
                        </a>
                    </li>
                    <li className='nav-item mb-2'>
                        <a className='nav-link px-2'style={{cursor:"pointer"}} onClick={()=>setActiveComponent('Generate_interest')}>
                            <i class='bi bi-sliders' />
                            <span className={`ms-1 ${isCollapsed ? 'd-none' : 'd-inline'}`}>Generate Interest</span>
                        </a>
                    </li>
                    <li className='nav-item mb-2'>
                        <a className='nav-link px-2'style={{cursor:"pointer"}} onClick={()=>setActiveComponent('Add_admin')}>
                            <i class='bi bi-person-gear' />
                            <span className={`ms-1 ${isCollapsed ? 'd-none' : 'd-inline'}`}>Add New Admin</span>
                        </a>
                    </li>
                    <li className='nav-item mb-2'>
                        <a className='nav-link px-2'style={{cursor:"pointer"}} onClick={()=>setActiveComponent('Period_activity')}>
                        <i class="bi bi-calendar-event"></i>
                            <span className={`ms-1 ${isCollapsed ? 'd-none' : 'd-inline'}`}>Period Activity</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        </div>
    );
}

export default A_sidebar;
