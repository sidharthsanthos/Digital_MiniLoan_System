import React, { useState } from "react";
import Sidebar1 from "./Sidebar1";
import Loan from "./Loan";
import Loan_repay from "./Loan_repay";
import './ui_loan.css';

function Loan_ui() {
    const [activeComponent, setActiveComponent] = useState("Loan");

    const renderComponent = () => {
        switch (activeComponent) {
            case "Loan":
                return <Loan />;
            case "LoanRepay":
                return <Loan_repay />;
            default:
                return <Loan />;
        }
    };

    return (
        <div className="container-fluid p-0">
            <div className="row vh-100 m-0">
                <div className="col-auto" style={{ padding: 0 }}>
                    <Sidebar1 setActiveComponent={setActiveComponent} />
                </div>
                <div className="col">
                    <div className="loan-container">
                        {renderComponent()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Loan_ui;
