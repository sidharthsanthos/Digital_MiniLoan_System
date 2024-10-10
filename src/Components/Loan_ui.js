import React from "react";
import Sidebar1 from "./Sidebar1";
import Loan from "./Loan";

class Loan_ui extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <Sidebar1/>
                    <div className="col p-4">
                        <Loan/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Loan_ui;