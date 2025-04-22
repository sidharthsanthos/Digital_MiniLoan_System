import axios from "axios";
import React from "react";
import { useLocation } from "react-router-dom";
import './Loan.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar1 from "./Sidebar1";
import Navbar from "./Navbar";
import {Spinner,Modal} from 'react-bootstrap';
import { Link } from "react-router-dom";

class Loan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: null,
            amount: "",
            loans: [],
            selectedLoan: null,
            isModalOpen:false,
            loading:false,
            link_status:true,
            isAcctModalOpen:false,
            rdetail:null,
            lpoints:null,
            rwon:null,
            r_interface:false,
            reward_selected:null,
            balance:null,
            confettiAnimating: true
        };
    }

    componentDidMount() {
        const uid=localStorage.getItem('user_id');
        this.setState({user_id:uid},()=>{
            this.fetchRewards();
            this.initialiseBalance();
        });
        this.fetchLoans(); // Fetch loan data on component mount
        //also add a functionality that validates and allows a user to request only once in a day just check if there is a loan req in a same date
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.user_id && this.state.user_id !== prevState.user_id) {
            this.linkk();
        }
    }

    fetchRewards=()=>{
        var data={
            uid:this.state.user_id
        }
        axios.post("http://localhost/digital_miniloan_backend/fetch_rewards.php",data).then(response=>{
            if(response.data!=="zero"){
                this.setState({
                    rdetail:response.data,
                    lpoints:parseInt(response.data.loyalty_points),
                    rwon:parseInt(response.data.num_of_rewards) 
                });
            }
        })
    }



    inputSet = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    req = (e) => {
        e.preventDefault();
        if(this.state.amount!==""){
            const data = {
                uid: this.state.user_id,
                amount: this.state.amount
            };
            axios.post("http://localhost/digital_miniloan_backend/loan_req.php", data)
                .then(response => {
                    if (response.data.status === "requested") {
                        toast.success("Successfully Submitted");
                        this.fetchLoans(); 
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
        }else{
            alert("Enter the Amount to send a loan request");
        }
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
                    this.setState({balance:bal},()=>{
                        this.setState(prevState => ({ 
                            lpoints: prevState.lpoints + 2 
                        }), () => { 
                            this.check_rewards(); 
                        });  
                    })                    
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

    check_rewards=()=>{

        if(this.state.lpoints%10===0){
            const rewardsArray = Array.from({ length: 11 }, (_, i) => i); //array creation
            const randomReward=rewardsArray[Math.floor(Math.random()*rewardsArray.length)];
            this.setState({reward_selected:randomReward},()=>{
                this.updateRewards();
                this.setState({r_interface:true});
            });
            toast.success(`Congratulations! You won a reward of ${randomReward} points!`);
            return;
        }else{
            this.updateRewards();
        }
    }

    updateRewards=()=>{
        var data={
            lpoints:this.state.lpoints,
            rwon:this.state.rwon,
            uid:this.state.user_id,
            balance:this.state.balance,
            reward:this.state.reward_selected
        }
        axios.post("http://localhost/digital_miniloan_backend/update_rewards.php",data).then(response=>{
            if(response.data==="success"){
                console.log("rewards updated successfully");
            }else{
                console.log("rewards updation failed");
            }
        })
    }

    fetchDetails=(loan)=>{
        this.setState({
            selectedLoan:loan,
            isModalOpen:true
        },()=>{
            console.log(this.state.selectedLoan.username);    
        });
        
    }
    
    initialiseBalance=()=>{
        var data={
            action:"balance",
            uid:this.state.user_id
        }
        axios.post("http://localhost/digital_miniloan_backend/balance.php",data).then(response=>{
            const balance=response.data.balance;
            this.setState({balance:balance});
        })
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

    linkk=()=>{
        var data={
                uid:this.state.user_id
            }
            axios.post("http://localhost/digital_miniloan_backend/linkk.php",data).then(response=>{
                if(response.data=="failed"){
                    this.setState({link_status:false});
                    this.setState({isAcctModalOpen:true});
                }
            });
    }

    handleClaim=()=>{
        this.setState({r_interface:false});
    }

    render() {
        const { loans,isModalOpen,selectedLoan,loading,link_status,isAcctModalOpen,r_interface } = this.state;

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
                        {r_interface &&(
                             <div className="reward-overlay">
                             <div className="reward-container">
                               <div className="confetti-container">
                                 {[...Array(50)].map((_, index) => (
                                   <div 
                                     key={index} 
                                     className="confetti" 
                                     style={{
                                       left: `${Math.random() * 100}%`,
                                       animationDelay: `${Math.random() * 3}s`
                                     }}
                                   />
                                 ))}
                               </div>
                               <div className="reward-content">
                                 <div className="trophy-icon">🏆</div>
                                 <h1 className="reward-title">Congratulations!</h1>
                                 <p className="reward-subtitle">You've Won</p>
                                 <div className="reward-amount">
                                   <span className="currency">Rs.</span>
                                   <span className="amount">{this.state.reward_selected}</span>
                                 </div><br/>
                                 <button 
                                   className="claim-button" 
                                   onClick={this.handleClaim}
                                 >
                                   Claim Your Reward
                                 </button>
                               </div>
                             </div>
                           </div>
                        )}
                        {/* <p>{this.state.user_id}</p> */}
                        <h1 className="admin-title">LOAN REQUEST</h1>
                        <form onSubmit={this.req}> 
                            <label>Amount</label>
                            <input type="number" name="amount" onChange={this.inputSet} value={this.state.amount} /><br />
                            <button type="submit">Submit</button><br/><br/>
                        </form>
                        <button onClick={()=>this.fetchBalance(this.state.user_id)}>Check Balance</button>
                        <span>{this.state.reward_selected?this.state.reward_selected:""}</span>
                        <span>{this.state.lpoints}</span>
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
                                        <p><strong>Status:</strong> <span className={selectedLoan.Status=="pending"?"text-success":"text-danger"} style={{textTransform:"capitalize"}}> <strong> {selectedLoan.Status}</strong></span></p>
                                    </>
                                ) : (
                                    <p>No details available.</p>
                                )}
                            </Modal.Body>
                        </Modal>

                        <Modal
                        show={isAcctModalOpen}
                        centered
                        backdrop="false" // Prevent closing by clicking outside
                        keyboard={false}    // Prevent closing with the Esc key
                        dialogClassName="custom-modal2" // Custom class for styling
                        >
                            <Modal.Header >
                                <Modal.Title>No Account Found</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {!link_status && 
                                <div>
                                <h1>Link Bank Account to Request Loan</h1>
                                <Link to='/index'>
                                    <button>Link Account</button>
                                </Link>
                                </div>
                                }
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
