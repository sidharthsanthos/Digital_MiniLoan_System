// ExpenseTracker.js
import React, { Component } from 'react';
import axios from 'axios';
import './expense.css'; // Import the CSS file

class ExpenseTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [
                { income: 1000, expense: 200, date: '2024-09-30' },
                { income: 500, expense: 100, date: '2024-09-29' },
                { income: 200, expense: 50, date: '2024-09-28' },
            ],
            user_id:null,
            lendings:[],
            investments:[]
        };
    }

    componentDidMount(){
        const a=localStorage.getItem('user_id');
        this.setState({user_id:a},()=>{
            this.fetchExpense();
        });

    }

    fetchExpense=()=>{
        var data={
            user_id:this.state.user_id
        }
        axios.post("http://localhost/digital_miniloan_backend/expense.php",data).then(response=>{
            if(response){
                this.setState({lendings:response.data.lendings});
                this.setState({investments:response.data.investments});
            }
        })
    }

    formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.getDate().toString().padStart(2, '0') + '-' +
            (date.getMonth() + 1).toString().padStart(2, '0') + '-' +
            date.getFullYear();
    }

    // sumFn=(arr)=>{
    //     const sum=0;
    //     for(var i=0;i<arr.length;i++){
    //         const a=arr[i];
    //         sum=sum+a;
    //     }
    //     return sum
    // }

    render() {
        return (
            <div className="expense-tracker-container">
                <h2>Expense Tracker</h2>
                {this.state.user_id}
                <h3>Transaction List</h3>
                <table className="transaction-table">
                    <thead>
                   <tr>
                            <th>Date</th>
                            <th>Income</th>
                            <th>Expense</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Render lendings as income */}
        {this.state.lendings.length > 0 && this.state.lendings.map((lending, index) => (
            <tr key={`lending-${index}`}>
                <td>{this.formatDate(lending.transaction_at)}</td>
                <td className="income">{lending.amount}</td>
                <td className="expense">-</td> {/* No expense for lending */}
            </tr>
        ))}

        {/* Render investments as expense */}
        {this.state.investments.length > 0 && this.state.investments.map((investment, index) => (
            <tr key={`investment-${index}`}>
                <td>{this.formatDate(investment.transaction_at)}</td>
                <td className="income">-</td> {/* No income for investment */}
                <td className="expense">${investment.amount}</td>
            </tr>
        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ExpenseTracker;
