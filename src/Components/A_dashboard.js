import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import A_sidebar from "./A_sidebar";
import A_home from "./A_home";
import A_userList from "./A_userList";
import A_loans from "./A_loans";
import A_transactions from "./A_transactions";
import Set_intrest from "./A_set-intrest";
import Admin_add from "./A_adminadd";
import Period_activity from "./A_period";
import Investments from "./A_investments";
import Generate_interest from "./A_generate-interest";
import './ui_loan.css';

function Navbar() {
    return (
        <nav className="navbar">
                <div className="title">
                    <Link to="/">DIGITAL MINILOAN</Link>
                </div>
                <ul className="nav-items">
                    <div className="login-button">
                        <Link to="/logout">
                            <button className="btn-login" onClick={() => localStorage.removeItem('user_id')}>Logout</button>
                        </Link>
                    </div>
                </ul>
            </nav>
    );
}

function A_dash() {
    const [activeComponent, setActiveComponent] = useState("Home");
    const sidebarRef = useRef(null);
    const loanContainerRef = useRef(null);

    const renderComponent = () => {
        switch (activeComponent) {
            case "Home":
                return <A_home />;
            case "User_List":
                return <A_userList />;    
            case "Loan":
                return <A_loans />;
            case "Investments":
                return <Investments />;
            case "Transactions":
                return <A_transactions />;    
            case "Loan_settings":
                return <Set_intrest/>;
            case "Generate_interest":
                return <Generate_interest/>;
            case "Add_admin":
                return <Admin_add/>;
            case "Period_activity":
                return <Period_activity />;
            default:
                return <A_home/>;
        }
    };

    useEffect(() => {
        const adjustLoanContainerMargin = () => {
            if (sidebarRef.current && loanContainerRef.current) {
                const sidebarWidth = sidebarRef.current.offsetWidth;
                loanContainerRef.current.style.marginLeft = `${sidebarWidth}px`;
            }
        };

        adjustLoanContainerMargin();

        const resizeObserver = new ResizeObserver(adjustLoanContainerMargin);
        if (sidebarRef.current) {
            resizeObserver.observe(sidebarRef.current);
        }

        return () => {
            if (sidebarRef.current) {
                resizeObserver.unobserve(sidebarRef.current);
            }
        };
    }, []);

    return (
        <div className="container-fluid p-0">
            <Navbar />
            <div className="row vh-100 m-0" style={{width: '100vw'}}>
                <ul style={{listStyleType: 'none', display: 'flex', margin: '0', padding: '0', width: '100%'}}>
                    <li className="col-auto" style={{
                        padding: '0',
                        position: 'fixed',
                        height: '100vh',
                        zIndex: '1000',
                        overflowY: 'hidden'
                    }} ref={sidebarRef}>
                        <A_sidebar setActiveComponent={setActiveComponent} />
                    </li>
                    <li className="col" ref={loanContainerRef}>
                        <div className="loan-container">
                            {renderComponent()}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default A_dash;