import React from "react";
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import axios from "axios";
import './Loan.css';
import {Modal,Spinner} from 'react-bootstrap';
import { toast } from "react-toastify";

class Loan_repay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: null,
      loan_id: "",
      loan_date: "",
      showRepayment: false, // State to toggle between form and repayment result
      inv_name:"",
      amt:"",
      total:"",
      intrest:"",
      ldate:"",
      status:"",
      isModalOpen:false,
      pamt:"",
      balance:null,
      inv_id:"",
      loading:false,
      rdetail:null,
      lpoints:null,
      rwon:null,
      reward_selected:null,
      r_interface:false,
      confettiAnimating: true
    };
  }

  componentDidMount() {
    const uid = localStorage.getItem('user_id');
    this.setState({ user_id: uid },()=>{
      this.RewardDetails();
    });
    this.fetchBalance(uid);
  }

  inputSet = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Function to show repayment details
  repayment = () => {

    if(this.state.loan_date==""&&this.state.loan_id==""){
      alert("Insufficient Details");
    }else{
      var data={
        uid:this.state.user_id,
        lid:this.state.loan_id,
        ldate:this.state.loan_date
      }
      axios.post("http://localhost/digital_miniloan_backend/retrieve_ldetails.php",data).then(response=>{
        if(response.data.mstatus=="success"){
          // var iid=response.data.inv;
          
          if(response.data.inv==null){
            var iid="not found";
          }else{
            var iid=response.data.inv;
          }

          if(this.state.loan_id==""){
            var lid=response.data.loan_id;
          }
          else{
            var lid=this.state.loan_id;
          }

          var amt=response.data.amt;
          var total=response.data.total;
          var intrest=response.data.intrest;

          if(response.data.date==null){
            var date1="";
          }else{
            var date1=response.data.date;
          }

          var status=response.data.status;
          var inv_id=response.data.inv_id;

          
          this.setState({
            loan_id:lid,
            inv_name:iid,
            amt:amt,
            total:total,
            intrest:intrest,
            ldate:date1,
            status:status,
            inv_id:inv_id,
            showRepayment: true
          });          
        }else{
          alert("data not received");
        }
      })
    }
  };

  pay_money=()=>{
    this.setState({
      isModalOpen:true
    },()=>{
      console.log(this.state.isModalOpen);
    });
  }

  handleCloseModal=()=>{
    this.setState({
      isModalOpen:false
    });
  }

  custom_pay=()=>{
    const amount=parseInt(this.state.total);
    const repay_amount=parseInt(this.state.pamt);
    const balance=parseInt(this.state.balance);

    if(repay_amount>amount){
      toast.error("Maximum Amount to repay is "+amount);
    }else if(this.state.pamt==""){
      toast.error("enter amount to repay");
    }else if(repay_amount>balance){
      toast.error("Insufficient Balance");
    }else if(window.confirm("Continue to Pay ₹"+repay_amount)){
      this.setState({loading:true});
      var data={
        uid:this.state.user_id,
        inv_id:this.state.inv_id,
        amount:this.state.total,
        loan_id:this.state.loan_id,
        repay:repay_amount
      }
      axios.post("http://localhost/digital_miniloan_backend/repay.php",data).then(response=>{
        if(response.data.status=="success"){
          const new_balance=balance-repay_amount;
          toast.success("successful transaction");
          this.setState({balance:new_balance},()=>{
            this.setState(prevState => ({ 
              lpoints: prevState.lpoints + 1 
            }), () => { 
              this.check_rewards(); 
          });
          })
        }else{
          toast.error("transaction failed");
        }
      }).finally(()=>{
        this.setState({loading:false});
      })
    }else{
      return;
    }
  }

  RewardDetails=()=>{
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

  handleClaim=()=>{
    this.setState({r_interface:false});
  }

  check_rewards=()=>{

    if(this.state.lpoints%10===0){
        const rewardsArray = Array.from({ length: 11 }, (_, i) => i); //array creation
        const randomReward=rewardsArray[Math.floor(Math.random()*rewardsArray.length)];
        this.setState({reward_selected:randomReward},()=>{
            this.updateRewards();
            this.handleCloseModal();
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

  fetchBalance=(user_id)=>{
    var data={
        action:"balance",
        uid:user_id
    }
    axios.post("http://localhost/digital_miniloan_backend/balance.php",data).then(response=>{
        const balance=response.data.balance;
        this.setState({balance:balance});
    })
  }

  render() {
    const{loading,r_interface}=this.state;
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
        {!this.state.showRepayment ? (
        <Container className="p-4" style={{ maxWidth: '600px', margin: '0 auto', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#f8f9fa' }}>
        <h1 className="admin-title">Loan Repayment Search</h1>
        
        {/* Conditional rendering: show form or repayment details */}
        
          
          <Form>
            <Form.Group controlId="formInvestorName">
              <Form.Label style={{ fontWeight: 'bold' }}>Loan ID</Form.Label>
              <Form.Control 
                type="text" 
                name="loan_id" 
                placeholder="Enter your Loan ID" 
                onChange={this.inputSet} 
                className="mb-3"
              />
            </Form.Group>

            <Form.Group controlId="formLoanDate">
              <Form.Label>Enter Date</Form.Label>
              <Form.Control 
                type="date" 
                name="loan_date" 
                onChange={this.inputSet} 
                className="mb-3"
              />
            </Form.Group>

            <Button variant="primary" type="button" className="btn-lg btn-block" onClick={this.repayment}>
              Search
            </Button>
          </Form>
          </Container>
        ) : (
          // Repayment details section
          <div className="p-2" style={{ maxWidth: '600px', margin: '0 auto', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#f8f9fa' }}>
          <h4 className="mb-4" style={{ textAlign: 'center', color: '#333', fontSize: '24px !important',textTransform:'uppercase' }}>Loan Details</h4>
          <div className="lr-font">
          <h6><strong style={{textTransform:"uppercase"}}>Loan ID:</strong> {this.state.loan_id}</h6>
          <h6 style={{textTransform:"uppercase"}}><strong>Investor Name:</strong> {this.state.inv_name}</h6>
          <h6><strong style={{textTransform:"uppercase"}}>Amount:</strong> {this.state.amt}</h6>
          <h6><strong style={{textTransform:"uppercase"}}>Total Amount:</strong> {this.state.total}</h6>
          <h6><strong style={{textTransform:"uppercase"}}>Interest Rate:</strong> {this.state.intrest}%</h6>
          <h6><strong style={{textTransform:"uppercase"}}>Approved Date:</strong> {this.state.ldate}</h6>
          <h6><strong style={{textTransform:"uppercase"}}>Current Status:</strong> {this.state.status}</h6>
          </div>{this.state.lpoints?this.state.lpoints:""}

          <div className="d-flex justify-content-between mt-4">
          <Button variant="success" className="btn-lg" type="button" onClick={this.pay_money} disabled={this.state.ldate===""}>
          Pay
          </Button>
          <Button variant="secondary" className="btn-lg" type="button" onClick={() => this.setState({ showRepayment: false })}>
          Back
          </Button>
          </div>
        </div>

        )}

        <Modal show={this.state.isModalOpen} onHide={this.handleCloseModal} centered backdrop="true" keyboard={true} dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>Payment Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="custom-amount">
              <label>Enter the amount you to have: </label><br/>
              <input type="text" name="pamt" onChange={this.inputSet}/><br/><br/>
              <button onClick={this.custom_pay} className={this.state.ldate===""?"restrict_click":""}>Pay Now</button>
            </div>
          </Modal.Body>
        </Modal>
      

      </div>
    );
  }
}

export default Loan_repay;
