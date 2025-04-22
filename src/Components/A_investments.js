import React from "react";
import axios from "axios";
import './Loan.css';

class Investments extends React.Component{
    constructor(props){
        super(props);
        this.state={
            investments:[],
            all_investments:[]
        }
    }

    componentDidMount(){
        this.fetchInvestments();
    }

    
    inputset=(e)=>{
        const search_name=e.target.value.toLowerCase();
        this.setState({sname:search_name},()=>{
            this.searchLoans();
        });
    }

    searchLoans=()=>{
        const{sname,all_investments}=this.state;

        if(sname==""){
            this.setState({investments:all_investments});
            return;
        }

        const filteredInvestments=all_investments.filter((Investment)=>
            (Investment.username && Investment.username.toLowerCase().includes(sname))||
            (Investment.Amount && Investment.Amount.toString().includes(sname))
        );

        this.setState({investments:filteredInvestments});
    }

    fetchInvestments=()=>{
        axios.post("http://localhost/digital_miniloan_backend/A_investments.php").then(response=>{
            if(response!=="zero"){
                this.setState({investments:response.data,all_investments:response.data});
            }else{
                alert("Zero Results");
            }
        })   
    }

    sortChange=(e)=>{
        this.setState({sortCriteria:e.target.value},()=>{
            this.SortInvestments();
        })
        }

    SortInvestments=()=>{
            const{sortCriteria}=this.state;

            const new_loans=this.state.all_investments.slice();

            const filteredInvestments=new_loans.filter((Investment)=>
            (Investment.Status && Investment.Status.toLowerCase().includes(sortCriteria))
            )

            this.setState({investments:filteredInvestments})
    }

    render(){
        return(
            <div className="main-container">
                <h1 className="admin-title">Investment List</h1>

                <div className='header-container'>
    
                <div className='sort-container'>
                    <label>Sort by</label>
                    <select id='sortDropdown' name='sortCriteria' onChange={this.sortChange}>
                        <option value=''>Select</option>
                        <option value='approved'>Approved</option>
                        <option value='repaid'>Repaid</option>
                    </select>
                </div>

                <div className='search-bar'>
                    <label>Search Bar</label>
                    <input type='text' name='sname' onChange={this.inputset} placeholder='Enter Name or Amount'/>
                </div>
                </div>

                <table className="loan-table">
                        <thead>
                            <tr>
                                <th>Loan ID</th>
                                <th>Borrower Name</th>
                                <th>Amount</th>
                                <th>Intrest Rate</th>
                                <th>Total Amount</th>
                                <th>Repaid Amount</th>
                                <th>Date</th>
                                <th>Approved Date</th>
                                <th>Due Date</th>
                                <th>Phone Number</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.investments.map((inv)=>(
                                <tr>
                                    <td>{inv.req_id}</td>
                                    <td style={{textTransform:'capitalize'}}>{inv.username}</td>
                                    <td>{inv.Amount}</td>                                
                                    <td>{inv.intrest_rate}</td>
                                    <td>{inv.total_amount}</td>
                                    <td>{inv.repaid_amount}</td>
                                    <td>{inv.date}</td>
                                    <td>{inv.approved_date}</td>
                                    <td>{inv.due_date}</td>
                                    <td>{inv.phone_number}</td>
                                    <td className={inv.Status==="pending"?"pending-font":inv.Status==="approved"?"approved-font":"repaid-font"}>{inv.Status}</td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
        )
    }
}

export default Investments;