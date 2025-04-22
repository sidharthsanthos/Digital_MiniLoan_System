import React from "react";
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import axios from "axios";
import './Loan.css';

class Period_activity extends React.Component{
    constructor(props){
        super(props);
        this.state={
            start_date:"",
            end_date:"",
            today: new Date().toISOString().split("T")[0],
            showResults:false,
            loans:[],
            all_loans:[]
        }
    }

    inputSet = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    inputset2=(e)=>{
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
            sdate:this.state.start_date,
            edate:this.state.end_date
        }
        if(!this.state.start_date||!this.state.end_date){
            alert("Both Dates are required to bring period activity");
        }else{
            axios.post("http://localhost/digital_miniloan_backend/A_period_list.php",data).then(response=>{
                if(response.data!='zero'){
                    this.setState({loans:response.data,showResults:true,all_loans:response.data});
                }else{
                    alert("No Records Exist in this Time Period");
                }
            });
        }
      }

      sortChange=(e)=>{
        this.setState({sortCriteria:e.target.value},()=>{
            this.SortLoans();
        })
        }

        SortLoans=()=>{
            const{sortCriteria}=this.state;

            const new_loans=this.state.all_loans.slice();

            const filteredLoans=new_loans.filter((loan)=>
            (loan.Status && loan.Status.toLowerCase().includes(sortCriteria))
            )

            this.setState({loans:filteredLoans})
        }


    render(){
        const {loans}=this.state;
        return(
            <div className="main-container">
                {!this.state.showResults ? (
                <Container className="p-4" style={{ maxWidth: '600px',marginTop:'100px', margin: '0 auto', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#f8f9fa' }}>
            <h3 className="text-center mb-4" style={{textTransform:"uppercase"}}><h className='admin-title'>Loan Search</h></h3>
            
            {/* Conditional rendering: show form or repayment details */}
            
              
              <Form>
                <Form.Group controlId="formInvestorName">
                  <Form.Label>Enter Start Date</Form.Label>
                  <Form.Control 
                    type="date" 
                    name="start_date" 
                    onChange={this.inputSet} 
                    className="mb-3"
                    max={this.state.today}
                  />
                </Form.Group>
    
                <Form.Group controlId="formLoanDate">
                  <Form.Label>Enter Date</Form.Label>
                  <Form.Control 
                    type="date" 
                    name="end_date" 
                    onChange={this.inputSet} 
                    className="mb-3"
                    min={this.state.start_date}
                    max={this.state.today}
                  />
                </Form.Group>
    
                <Button variant="primary" type="button" className="btn-lg btn-block" onClick={this.fetchLoans}>
                  Search
                </Button>
              </Form>
              </Container>
            ):(
                <div>
                    <div> 
                        <h1 className='admin-title'>Loan List between {this.state.start_date} and {this.state.end_date} </h1>
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
                        <input type='text' name='sname' onChange={this.inputset2} placeholder='Enter Name or Amount'/>
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
            )}
            </div>
        )
    }
}

export default Period_activity;