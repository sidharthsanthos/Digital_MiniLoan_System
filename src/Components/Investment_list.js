import axios from "axios";
import React from "react";
import { Button,Modal,Spinner } from 'react-bootstrap';
import { toast } from "react-toastify";
import './Loan.css';

class Investment_list extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user_id:null,
            investments:[],
            noResults:false,
            loading:false,
            all_investments:[]
        }
    }

    componentDidMount(){
        const uid=localStorage.getItem('user_id');
        this.setState({user_id:uid},()=>{
            this.fetchInvestments();
        })
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
        var data={
            uid:this.state.user_id
        }
        axios.post("http://localhost/digital_miniloan_backend/investment_list.php",data).then(response=>{
            if(response.data!="zero"){
                this.setState({investments:response.data,all_investments:response.data});
            }else{
                this.setState({noResults:true});
            }
        })
    }

    sendAlerts=(req_id,inv_id,username,email,amt,total,due,approved)=>{
        this.setState({loading:true})
        var data={
            uid:this.state.user_id,
            req_id:req_id,
            bor_id:inv_id,
            bname:username,
            email:email,
            amt:amt,
            total:total,
            due:due,
            approved:approved
        }
        axios.post("http://localhost/digital_miniloan_backend/notify.php",data).then(response=>{
            if(response.data==="success"){
                toast.success("Alert Send Successfully");
            }else{
                toast.error("Alert Sending failed");
            }
        }).finally(()=>{
            this.setState({loading:false});
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
            <div>
                {this.state.loading && (
                            <div className="loading-overlay">
                            <h1>Loading</h1><br/>
                            <Spinner animation="border" role="status" variant="primary">
                            <span className="sr-only"></span>
                            </Spinner>
                        </div>
                        )}
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
                {!this.state.noResults?(
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
                                <th>Action</th>
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
                                    <td>
                                        <Button className={inv.Status==="repaid"?"repaid":"not_repaid"} disabled={inv.Status==="repaid"} onClick={()=>this.sendAlerts(inv.req_id,inv.user_id,inv.username,inv.email,inv.Amount,inv.total_amount,inv.due_date,inv.approved_date)}>
                                            Notify
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ):(
                    <h1>No Investment History</h1>
                )}
            </div>
        )
    }
}

export default Investment_list;