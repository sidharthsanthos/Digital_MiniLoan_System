import axios from "axios";
import React from "react";
import './Loan.css';

class A_transactions extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user_id:null,
            transactions:[],
            noResults:false,
            sortCriteria:"",
            all_transactions:[]
        }
    }

    componentDidMount(){
        const uid=localStorage.getItem("user_id");
        this.setState({user_id:uid},()=>{
            this.fetchData();
        });
    }

    sortChange=(e)=>{
        this.setState({sortCriteria:e.target.value},()=>{
            this.fetchData();
        })
    }

    inputset=(e)=>{
        const search_name=e.target.value.toLowerCase();
        this.setState({sname:search_name},()=>{
            this.searchTransactions();
        });
    }

    searchTransactions=()=>{
        const{sname,all_transactions}=this.state;

        if(sname==""){
            this.setState({transactions:all_transactions});
            return;
        }

        const filteredTransactions=all_transactions.filter((transaction)=>
            (transaction.bname && transaction.bname.toLowerCase().includes(sname))||
            (transaction.iname && transaction.iname.toLowerCase().includes(sname))||
            (transaction.amt && transaction.amt.toString().includes(sname))
        );

        this.setState({transactions:filteredTransactions});
    }

    fetchData=()=>{
        var data={
            action:this.state.sortCriteria
        }
        axios.post("http://localhost/digital_miniloan_backend/transactions.php",data).then(response=>{
            if(response.data!=="zero"){
                this.setState({transactions:response.data,all_transactions:response.data});
            }else{
                this.setState({noResults:true});
            }
        })
    }

    render(){
        const {transactions}=this.state;
        return(
            <div>
                <h1 className="admin-title">
                    Transactions
                </h1>
                <div className="header-container">
                <div className="sort-container">
                <label>Sort by</label>
                    <select id='sortDropdown' name='sortCriteria' onChange={this.sortChange}>
                        <option value=''>Select</option>
                        <option value='investment'>Investments</option>
                        <option value='repayment'>Repayments</option>
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
                            <th>Transaction ID</th>
                            <th>Borrower Name</th>
                            <th>Investor Name</th>
                            <th>Amount</th>
                            <th>Timestamp</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction)=>(
                            <tr>
                                <td>{transaction.transaction_id}</td>
                                <td>{transaction.bname}</td>
                                <td>{transaction.iname}</td>
                                <td>{transaction.amt}</td>
                                <td>{transaction.transaction_at}</td>
                                <td>{transaction.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default A_transactions;