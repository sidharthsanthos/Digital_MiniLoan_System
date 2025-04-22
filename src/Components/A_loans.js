import axios from 'axios';
import React from 'react';
import './Loan.css';

class A_loans extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user_id:null,
            loans:[],
            noResults:false,
            sortCriteria:"",
            sname:"",
            all_loans:[]
        }
    }

    componentDidMount(){
        const uid=localStorage.getItem("user_id");
        this.setState({user_id:uid},()=>{
            this.fetchLoans();
        });
    }

    inputset=(e)=>{
        const search_name=e.target.value.toLowerCase();
        this.setState({sname:search_name},()=>{
            this.searchLoans();
        });
    }

    searchLoans=()=>{
        const{sname,all_loans}=this.state;

        if(sname==""){
            this.setState({loans:all_loans});
            return;
        }

        const filteredLoans=all_loans.filter((loan)=>
            (loan.bname && loan.bname.toLowerCase().includes(sname))||
            (loan.iname && loan.iname.toLowerCase().includes(sname))||
            (loan.Amount && loan.Amount.toString().includes(sname))
        );

        this.setState({loans:filteredLoans});
    }

    fetchLoans=()=>{
        var data={
            action:this.state.sortCriteria
        }
        axios.post("http://localhost/digital_miniloan_backend/A_loan_disp.php",data).then(response=>{
            if(response.data!=='zero'){
                this.setState({loans:response.data,all_loans:response.data});
            }else{
                this.setState({noResults:true});
            }
        })
    }

    sortChange=(e)=>{
        this.setState({sortCriteria:e.target.value},()=>{
            this.fetchLoans();
        })
    }

    render(){
        const {loans,sortCriteria}=this.state;
        return(
            <div>
                <div> 
                <h1 className='admin-title'>Loan List</h1>
                </div>
                <div className='header-container'>
    
                <div className='sort-container'>
                    <label>Sort by</label>
                    <select id='sortDropdown' name='sortCriteria' onChange={this.sortChange}>
                        <option value=''>Select</option>
                        <option value='approved'>Approved</option>
                        <option value='pending'>Pending</option>
                        <option value='repaid'>Repaid</option>
                    </select>
                </div>

                <div className='search-bar'>
                    <label>Search Bar</label>
                    <input type='text' name='sname' onChange={this.inputset} placeholder='Enter Name or Amount'/>
                </div>
                </div>

                <table className='loan-table'>
                    <thead>
                        <tr>
                            <th>Loan ID</th>
                            <th>Borrower Name</th>
                            <th>Investor Name</th>
                            <th>Amount</th>
                            <th>Total Amount</th>
                            <th>Repaid Amount</th>
                            <th>Intrest Rate</th>
                            <th>Req Date</th>
                            <th>Approved Date</th>
                            <th>Due Date</th>
                            <th>Last Updated Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loans.map((loan)=>(
                            <tr>
                                <td>{loan.req_id}</td>
                                <td>{loan.bname}</td>
                                <td>{loan.iname}</td>
                                <td>{loan.Amount}</td>
                                <td>{loan.total_amount}</td>
                                <td>{loan.repaid_amount}</td>
                                <td>{loan.intrest_rate}</td>
                                <td>{loan.date}</td>
                                <td>{loan.approved_date}</td>
                                <td>{loan.due_date}</td>
                                <td>{loan.last_updated_date}</td>
                                <td className={loan.Status==="pending"?"pending-font":loan.Status==="approved"?"approved-font":"repaid-font"}>{loan.Status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default A_loans;