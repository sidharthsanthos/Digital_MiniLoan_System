import React, { useState, useEffect, useRef } from "react";
import Sidebar1 from "./Sidebar1";
import Loan from "./Loan";
import Loan_repay from "./Loan_repay";
import Loan_list from "./Loan_list";
import Investment_list from "./Investment_list";
import './ui_loan.css';

function Loan_ui() {
    const [activeComponent, setActiveComponent] = useState("Loan");
    const sidebarRef = useRef(null);
    const loanContainerRef = useRef(null);

    const renderComponent = () => {
        switch (activeComponent) {
            case "Loan":
                return <Loan />;
            case "LoanRepay": 
                return <Loan_repay />;
            case "LoanList": 
                return <Loan_list />;
            case "InvestmentList": 
                return <Investment_list />;
            default:
                return <Loan />;
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
            <div className="row vh-100 m-0" style={{width: '100vw'}}>
                <ul style={{listStyleType: 'none', display: 'flex', margin: '0', padding: '0', width: '100%'}}>
                    <li className="col-auto" style={{
                        padding: '0',
                        position: 'fixed',
                        height: '100vh',
                        zIndex: '1000',
                        overflowY: 'hidden'
                    }} ref={sidebarRef}>
                        <Sidebar1 setActiveComponent={setActiveComponent} />
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

export default Loan_ui;