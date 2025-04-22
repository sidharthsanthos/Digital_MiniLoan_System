import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Profile_sidebar from "./Profile_sidebar";
import Profile_ui from "./Profile_ui";
import Edit_profile from "./Edit_profile";
import Change_password from "./Change_password";
import Transaction from "./Transactions";
import './ui_loan.css';

function Navbar() {
    return (
        <nav className="navbar">
                <div className="title">
                    <Link to="/">DIGITAL MINILOAN</Link>
                </div>
                <ul className="nav-items">
                    <div className="login-button">
                        <ul className="nav-items">
                            <li className="nav-item"><Link to="/index">Home</Link></li>
                        </ul>
                    </div>
                </ul>
            </nav>
    );
}

function Manage_profile() {
    const [activeComponent, setActiveComponent] = useState("Home");
    const sidebarRef = useRef(null);
    const loanContainerRef = useRef(null);

    const renderComponent = () => {
        switch (activeComponent) {
            case "Home":
                return <Profile_ui />;
            case "Edit":
                return <Edit_profile />;
            case "Change_pass":
                return <Change_password />;
            case "Transaction":
                return <Transaction />;
            default:
                return <Profile_ui/>;
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
                        <Profile_sidebar setActiveComponent={setActiveComponent} />
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

export default Manage_profile;