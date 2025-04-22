import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import './ui_loan.css';

function Sidebar1({setActiveComponent}) {
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
                style={{ zIndex: 1 }} // Ensures the button is on top
            >
                <span className='navbar-toggler-icon' >
                <i className={`bi bi-list`} />
                </span>
            </button>

            {/* Sidebar */}
            <div className={`bg-dark min-vh-100 ${isCollapsed ? 'collapsed' : 'expanded'}`} id='sidebar' style={{ transition: 'width 0.3s ease', width: isCollapsed ? '60px' : '250px' }}>
                <ul className='nav flex-column p-3'>
                    <li className='nav-item mb-2'>
                        <Link to='/index' className='nav-link px-2'>
                            <i className='bi-house' />
                            <span className={`ms-1 ${isCollapsed ? 'd-none' : 'd-inline'}`}>Home</span> {/* Show text only when not collapsed */}
                        </Link>
                    </li>
                    <li className='nav-item mb-2'>
                        <a className='nav-link px-2' style={{cursor:"pointer"}} onClick={()=>setActiveComponent('Loan')}>
                            <i className='bi bi-credit-card' />
                            <span className={`ms-1 ${isCollapsed ? 'd-none' : 'd-inline'}`}>Loan Request</span>
                        </a>
                    </li>
                    <li className='nav-item mb-2'>
                        <a className='nav-link px-2'style={{cursor:"pointer"}} onClick={()=>setActiveComponent('LoanRepay')}>
                            <i className='bi bi-calendar' />
                            <span className={`ms-1 ${isCollapsed ? 'd-none' : 'd-inline'}`}>Repayment</span>
                        </a>
                    </li>
                    <li className='nav-item mb-2'>
                        <a className='nav-link px-2'style={{cursor:"pointer"}} onClick={()=>setActiveComponent('LoanList')}>
                            <i className='bi bi-list' />
                            <span className={`ms-1 ${isCollapsed ? 'd-none' : 'd-inline'}`}>My Loans</span>
                        </a>
                    </li>
                    <li className='nav-item mb-2'>
                        <a className='nav-link px-2'style={{cursor:"pointer"}} onClick={()=>setActiveComponent('InvestmentList')}>
                            <i className='bi bi-graph-up-arrow' />
                            <span className={`ms-1 ${isCollapsed ? 'd-none' : 'd-inline'}`}>Investment List</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        </div>
    );
}

export default Sidebar1;
