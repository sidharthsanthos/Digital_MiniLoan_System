// ExpenseTracker.js
import React, { Component } from 'react';
import './expense.css'; // Import the CSS file

class ExpenseTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [
                { income: 1000, expense: 200, date: '2024-09-30' },
                { income: 500, expense: 100, date: '2024-09-29' },
                { income: 200, expense: 50, date: '2024-09-28' },
            ]
        };
    }

    render() {
        return (
            <div className="expense-tracker-container">
                <h2>Expense Tracker</h2>

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
                        {this.state.transactions.map((transaction, index) => (
                            <tr key={index}>
                                <td>{transaction.date}</td>
                                <td className="income">${transaction.income.toFixed(2)}</td>
                                <td className="expense">${transaction.expense.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ExpenseTracker;
