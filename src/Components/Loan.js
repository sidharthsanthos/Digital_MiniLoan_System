import axios from "axios";
import React from "react";
import { useLocation } from "react-router-dom";
import './Loan.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar1 from "./Sidebar1";
import Navbar from "./Navbar";
import {Spinner,Modal} from 'react-bootstrap';

class Loan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: null,
            amount: "",
            loans: [],
            selectedLoan: null,
            isModalOpen:false,
            loading:false
        };
    }

    componentDidMount() {
        const uid=localStorage.getItem('user_id');
        this.setState({user_id:uid});
        this.fetchLoans(); // Fetch loan data on component mount
    }



    inputSet = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    req = (e) => {
        e.preventDefault();
        const data = {
            uid: this.state.user_id,
            amount: this.state.amount
        };
        axios.post("http://localhost/digital_miniloan_backend/loan_req.php", data)
            .then(response => {
                if (response.data.status === "requested") {
                    toast.success("Successfully Submitted");
                    this.fetchLoans(); // Refresh loan data after submission
                    this.setState({amount:""})
                } else if (response.data.status === "limit exceeded") {
                    toast.error("Limit Exceeded");
                }
                else if(response.data.status==="credit_issue"){
                    toast.warning("credit score not good");
                }
                else {
                    alert("Failed");
                }
            })
            .catch(error => {
                console.error("There was an error making the request!", error);
                alert("An error occurred. Please try again.");
            });
    }

    fetchLoans = () => {
        axios.get("http://localhost/digital_miniloan_backend/loan_req.php")
            .then(response => {
                this.setState({ loans: response.data });
            })
            .catch(error => {
                console.error("There was an error fetching the loan data!", error);
            });
    }

    investment=(r_uid,req_id,loan_aount)=>{
        console.log(r_uid);

        if(r_uid===this.state.user_id){
            alert("You cannot send yourself");
        }
        else if(window.confirm("Click OK to Continue")){
            this.setState({loading:true});
            var data={
                user_id:this.state.user_id,
                r_uid:r_uid,
                loan_id:req_id,
                amt:loan_aount
            }
            axios.post("http://localhost/digital_miniloan_backend/invest.php",data).then(response=>{
                const res=response.data.status;
                if(res==="success"){
                    const bal=response.data.balance;
                    const message="successful";
                    toast.success(message);
                    this.fetchLoans();
                    toast.dark("Your New Balance is ₹"+bal);
                }else if(res==="insufficient"){
                    toast.error("You Dont Have Enough Balance");
                    this.fetchLoans();
                }
            }).finally(()=>{
                this.setState({loading:false})
            })
        }
        else{
            this.fetchLoans();
        }
    }

    fetchDetails=(loan)=>{
        this.setState({
            selectedLoan:loan,
            isModalOpen:true
        },()=>{
            console.log(this.state.selectedLoan.username);    
        });
        
    }

    fetchBalance=(user_id)=>{
        var data={
            action:"balance",
            uid:user_id
        }
        axios.post("http://localhost/digital_miniloan_backend/balance.php",data).then(response=>{
            const balance=response.data.balance;
            toast.dark("Your Balance is ₹"+balance);
        })
    }

    handleCloseModal = () => {
        this.setState({ isModalOpen: false, selectedLoan: null });
    }

    render() {
        const { loans,isModalOpen,selectedLoan,loading } = this.state;

        return (
            <div>
                        {loading && (
                        <div className="loading-overlay">
                            <h1>Loading</h1><br/>
                            <Spinner animation="border" role="status" variant="primary">
                            <span className="sr-only"></span>
                            </Spinner>
                        </div>
                        )}
                        <p>{this.state.user_id}</p>
                        <h1>LOAN REQUEST</h1>
                        <form onSubmit={this.req}>
                            <label>Amount</label>
                            <input type="number" name="amount" onChange={this.inputSet} value={this.state.amount} /><br />
                            <button type="submit">Submit</button><br/><br/>
                        </form>
                        <button onClick={()=>this.fetchBalance(this.state.user_id)}>Check Balance</button>
                        <h2>Loan Requests</h2>
                        <table className="loan-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User ID</th>
                                    <th>Name</th>
                                    <th>Amount</th>
                                    <th>Intrest Rate</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loans.map((loan) => (
                                    <tr key={loan.req_id}> {/* Use unique key prop */}
                                        <td onClick={()=>this.fetchDetails(loan)}>{loan.req_id}</td>
                                        <td onClick={()=>this.fetchDetails(loan)}>{loan.user_id}</td>
                                        <td className="username-style" onClick={()=>this.fetchDetails(loan)}>{loan.username}</td>
                                        <td onClick={()=>this.fetchDetails(loan)}>{loan.Amount}</td>
                                        <td onClick={()=>this.fetchDetails(loan)}>{loan.intrest_rate}</td>
                                        <td onClick={()=>this.fetchDetails(loan)} className={loan.Status==="pending"?"pending-font":"approved-font"}>{loan.Status}</td>
                                        <td onClick={()=>this.fetchDetails(loan)}>{loan.date}</td>
                                        <td><button onClick={()=>this.investment(loan.user_id,loan.req_id,loan.Amount)} disabled={loan.Status==="approved" || loan.user_id===this.state.user_id} 
                                        className={loan.Status==="approved"?"disabled-button":"" || loan.user_id===this.state.user_id?"disabled-button":""}>Invest</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Modal
                        show={isModalOpen}
                        onHide={this.handleCloseModal}
                        centered
                        backdrop="true" // Prevent closing by clicking outside
                        keyboard={true}    // Prevent closing with the Esc key
                        dialogClassName="custom-modal" // Custom class for styling
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Borrower Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedLoan ? (
                                    <>
                                        <p><strong>User ID:</strong> {selectedLoan.user_id}</p>
                                        <p><strong>Username:</strong> {selectedLoan.username}</p>
                                        <p><strong>Amount:</strong> {selectedLoan.Amount}</p>
                                        <p><strong>Interest Rate:</strong> {selectedLoan.intrest_rate}%</p>
                                        <p><strong>Credit Score:</strong> <span className={parseInt(selectedLoan.credit_score) >= 700 ? "text-success" : "text-danger"}><strong>{selectedLoan.credit_score}</strong></span></p>
                                    </>
                                ) : (
                                    <p>No details available.</p>
                                )}
                            </Modal.Body>
                        </Modal>

                        </div>
                        
                
        );
    }
}

function withLocation(Component) {
    return (props) => {
        const location = useLocation();
        return <Component {...props} location={location} />;
    };
}

export default withLocation(Loan);
