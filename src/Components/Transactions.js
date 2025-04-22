import axios from "axios";
import React from "react";
import './transaction.css';

class Transaction extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user_id:null,
            transactions:[],
            all:[]
        }
    }

    componentDidMount(){
        const uid=localStorage.getItem("user_id");
        this.setState({user_id:uid},()=>{
            this.fetchTransactions();
        })
    }

    inputset=(e)=>{
        const search_name=e.target.value.toLowerCase();
        this.setState({sname:search_name},()=>{
            this.searchLoans();
        });
    }

    searchLoans=()=>{
        const{sname,all}=this.state;

        if(sname==""){
            this.setState({transactions:all});
            return;
        }

        const filtered=all.filter((transaction)=>
            (transaction.borrower_id && transaction.borrower_id.toString().includes(sname))||
            (transaction.investor_id && transaction.investor_id.toString().includes(sname))||
            (transaction.amt && transaction.amt.toString().includes(sname))||
            (transaction.username && transaction.username.toLowerCase().includes(sname))
        );

        this.setState({transactions:filtered});
    }

    fetchTransactions=()=>{
        var data={
            uid:this.state.user_id
        }
        axios.post("http://localhost/digital_miniloan_backend/disp_transactions.php",data).then(response=>{
            if(response.data!=="zero"){
                this.setState({transactions:response.data,all:response.data});
            }
        })
    }

    render() {
        const { transactions } = this.state;
        return (
            <div className="transactions-container">
                <h1 className="admin-title">Transactions List</h1>
                <div className='search-bar'>
                    <label>Search Bar</label>
                    <input type='text' name='sname' onChange={this.inputset} placeholder='Enter Amount'/>
                </div><br/>
                <div className="transactions-grid">
                    {transactions.map((transaction, index) => (
                        <div key={transaction.transaction_id} className="transaction-card">
                           <div 
                                className={transaction.investor_id === this.state.user_id 
                                    ? "transaction-header" 
                                    : "transaction-header2"}
                            >
                                <span className="transaction-id">
                                    Transaction ID: {transaction.transaction_id}
                                </span>
                            </div>

                            <div className="transaction-details">
                                <div className="transaction-detail">
                                    <span className="detail-label">Loan ID:</span>
                                    <span className="detail-value">{transaction.loan_id}</span>
                                </div>
                                <div className="transaction-detail">
                                    <span className="detail-label">
                                        {transaction.borrower_id === this.state.user_id 
                                            ? "Investor ID:" 
                                            : transaction.investor_id === this.state.user_id 
                                            ? "Receiver ID:" 
                                            : ""}
                                    </span>
                                    <span className="detail-value">
                                        {transaction.borrower_id === this.state.user_id 
                                            ? transaction.investor_id 
                                            : transaction.investor_id === this.state.user_id 
                                            ? transaction.borrower_id 
                                            : ""}
                                    </span>
                                </div>
                                <div className="transaction-detail">
                                    <span className="detail-label">
                                        {transaction.borrower_id === this.state.user_id 
                                            ? "Investor Name:" 
                                            : transaction.investor_id === this.state.user_id 
                                            ? "Receiver Name:" 
                                            : ""}
                                    </span>
                                    <span className="detail-value">
                                        {transaction.username}
                                    </span>
                                </div>

                                <div className="transaction-detail">
                                    <span className="detail-label">Transaction Amount:</span>
                                    <span className="detail-value">
                                        ₹{transaction.amt.toLocaleString()}
                                    </span>
                                </div>
                                <div className="transaction-detail">
                                    <span className="detail-label">Timestamp:</span>
                                    <span className="detail-value">{transaction.transaction_at}</span>
                                </div>
                                <div className="transaction-detail">
                                    <span className="detail-label">Transaction Type:</span>
                                    <span className="detail-value">{transaction.type}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Transaction;