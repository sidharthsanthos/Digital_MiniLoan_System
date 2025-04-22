import axios from "axios";
import React from "react";
import { Button,Modal,Spinner } from 'react-bootstrap';
import { toast } from "react-toastify";
import './Loan.css'


class Loan_list extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user_id:null,
            loans:[],
            showRepayment:false,
            req_id:null,
            iname:"",
            amt:null,
            total:null,
            intrest:null,
            approved_date:"",
            status:"",
            isModalOpen:false,
            balance:null,
            inv_id:null,
            loading:false,
            noResults:false,
            all_loans:[],
            rdetail:null,
            lpoints:null,
            rwon:null,
            reward_selected:null,
            r_interface:false,
            confettiAnimating: true
        }
    }

    componentDidMount(){
        const uid=localStorage.getItem('user_id');
        this.setState({user_id:uid},()=>{
            this.fetchLoans();
            this.RewardDetails();
            this.fetchBalance(this.state.user_id);
        });
    }

    fetchLoans=()=>{
        var data={
            uid:this.state.user_id
        }
        axios.post("http://localhost/digital_miniloan_backend/loan_list.php",data).then(response=>{
          if(response.data!="zero"){
            this.setState({loans:response.data,all_loans:response.data});
          }else{
            this.setState({noResults:true})
          }
            
        });
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
          (loan.username && loan.username.toLowerCase().includes(sname))||
          (loan.Amount && loan.Amount.toString().includes(sname))
      );

      this.setState({loans:filteredLoans});
    }

    repayment=(req_id,iname,amt,total,intrest,approved_date,status,inv_id)=>{
        this.setState({
            showRepayment:true,
            req_id:req_id,
            iname:iname,
            amt:amt,
            total:total,
            intrest:intrest,
            approved_date:approved_date,
            status:status,
            pamt:"",
            inv_id:inv_id
        });
    }

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
            loan_id:this.state.req_id,
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

              this.setState({isModalOpen:false})
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

      handleClaim=()=>{
        this.setState({r_interface:false});
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
        const {loans,loading,r_interface}=this.state;
        return(
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
                    //listdisplaye
                    <div className="list_parent">
                    <h1 className="admin-title">Loan Lists</h1>
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
                <table className="loan-table">
                    <thead>
                        <tr>
                            <th>Loan ID</th>
                            <th>Investor Name</th>
                            <th>Amount</th>
                            <th>Intrest Rate</th>
                            <th>Total Amount</th>
                            <th>Repaid Amount</th>
                            <th>Date</th>
                            <th>Approved Date</th>
                            <th>Due Date</th>
                            <th>Phone Number</th>
                            <th>Status</th>
                            <th>Repay</th>
                        </tr>    
                    </thead>
                    <tbody>
                        {loans.map((loan)=>(
                            <tr>
                                <td>{loan.req_id}</td>
                                <td>{loan.username}</td>
                                <td>{loan.Amount}</td>                                
                                <td>{loan.intrest_rate}</td>
                                <td>{loan.total_amount}</td>
                                <td>{loan.repaid_amount}</td>
                                <td>{loan.date}</td>
                                <td>{loan.approved_date}</td>
                                <td>{loan.due_date}</td>
                                <td>{loan.phone_number}</td>
                                <td className={loan.Status==="pending"?"pending-font":loan.Status==="approved"?"approved-font":"repaid-font"}>{loan.Status}</td>
                                <td>
                                <Button disabled={loan.Status==="repaid" || loan.Status==="pending"} className={loan.Status==="repaid"?"repaid":"not_repaid"} style={{margin:'10px'}} onClick={()=>this.repayment(loan.req_id,loan.username,loan.Amount,loan.total_amount,loan.intrest_rate,loan.approved_date,loan.Status,loan.investor_id)}>Repay</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                ):(
           //Repayment details section
          <div className="p-2" style={{ maxWidth: '600px', margin: '0 auto', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#f8f9fa' }}>
          <h4 className="mb-4" style={{ textAlign: 'center', color: '#333', fontSize: '24px !important',textTransform:'uppercase' }}>Loan Details</h4>
          <div className="lr-font">
          <h6><strong style={{textTransform:"uppercase"}}>Loan ID:</strong> {this.state.req_id}</h6>
          <h6 style={{textTransform:"uppercase"}}><strong>Investor Name:</strong> {this.state.iname}</h6>
          <h6><strong style={{textTransform:"uppercase"}}>Amount:</strong> {this.state.amt}</h6>
          <h6><strong style={{textTransform:"uppercase"}}>Total Amount:</strong> {this.state.total}</h6>
          <h6><strong style={{textTransform:"uppercase"}}>Interest Rate:</strong> {this.state.intrest}%</h6>
          <h6><strong style={{textTransform:"uppercase"}}>Approved Date:</strong> {this.state.approved_date}</h6>
          <h6><strong style={{textTransform:"uppercase"}}>Current Status:</strong> {this.state.status}</h6>
          </div>{this.state.lpoints}
          {"Balance"+this.state.balance}

          {<div className="d-flex justify-content-between mt-4">
          <Button variant="success" className="btn-lg" type="button" onClick={this.pay_money} disabled={this.state.ldate===""}>
          Pay
          </Button>
          <Button variant="secondary" className="btn-lg" type="button" onClick={() => this.setState({ showRepayment: false })}>
          Back
          </Button>
          </div>}
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
              <button onClick={this.custom_pay} className={this.state.approved_date===""?"restrict_click":""}>Pay Now</button>
            </div>
          </Modal.Body>
        </Modal>                            
        </div>
        )
    }
}

export default Loan_list;