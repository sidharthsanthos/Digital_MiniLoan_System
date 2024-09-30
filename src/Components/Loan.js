import axios from "axios";
import React from "react";
import { useLocation } from "react-router-dom";
import './Loan.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Loan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: null,
            amount: "",
            loans: [] 
        };
    }

    componentDidMount() {
        const { state } = this.props.location;
        if (state && state.user_id) {
            this.setState({ user_id: state.user_id });
        }
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
                    alert("Successfully Submitted");
                    this.fetchLoans(); // Refresh loan data after submission
                } else if (response.data.status === "limit exceeded") {
                    alert("Limit Exceeded");
                }
                else if(response.data.status==="credit_issue"){
                    alert("credit score not good");
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
                    const message="successfully transferred!!! Your new balance is"+bal;
                    alert(message);
                    this.fetchLoans();
                }
            })
        }
        else{
            this.fetchLoans();
        }
    }

    render() {
        const { loans } = this.state;

        return (
            <div>
                <h1>LOAN REQUEST</h1>
                <form onSubmit={this.req}>
                    <label>Amount</label>
                    <input type="number" name="amount" onChange={this.inputSet} value={this.state.amount} /><br />
                    <button type="submit">Submit</button>
                </form>

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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loans.map((loan) => (
                            <tr key={loan.req_id}> {/* Use unique key prop */}
                                <td>{loan.req_id}</td>
                                <td>{loan.user_id}</td>
                                <td className="username-style">{loan.username}</td>
                                <td>{loan.Amount}</td>
                                <td>{loan.intrest_rate}</td>
                                <td className={loan.Status==="pending"?"pending-font":"approved-font"}>{loan.Status}</td>
                                <td><button onClick={()=>this.investment(loan.user_id,loan.req_id,loan.Amount)} disabled={loan.Status==="approved" || loan.user_id===this.state.user_id} 
                                className={loan.Status==="approved"?"disabled-button":"" || loan.user_id===this.state.user_id?"disabled-button":""}>Invest</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
