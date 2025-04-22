import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Table, Tabs, Tab, Badge } from 'react-bootstrap';
import { ArrowUpCircleFill, ArrowDownCircleFill, CurrencyDollar } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CurrencyRupee } from 'react-bootstrap-icons/dist';

class ExpenseTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: null,
            lendings: [],
            investments: []
        };
    }

    componentDidMount() {
        const userId = localStorage.getItem('user_id');
        this.setState({ user_id: userId }, () => {
            this.fetchExpense();
        });
    }

    fetchExpense = () => {
        const data = { user_id: this.state.user_id };
        axios.post("http://localhost/digital_miniloan_backend/expense.php", data)
            .then(response => {
                if (response.data) {
                    this.setState({
                        lendings: response.data.lendings,
                        investments: response.data.investments
                    });
                }
            })
            .catch(error => console.error("Error fetching expense data:", error));
    }

    formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    }

    calculateTotal = (transactions) => {
        return transactions.reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0).toFixed(2);
    }

    renderTransactions = (transactions, type) => (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Payer</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction, index) => (
                    <tr key={`${type}-${index}`}>
                        <td>{this.formatDate(transaction.transaction_at)}</td>
                        <td>
                            <Badge bg={type === 'lending' ? 'success' : 'danger'}>
                                ₹{parseFloat(transaction.amount).toFixed(2)}
                            </Badge>
                        </td>
                        <td style={{textTransform:'capitalize'}}>
                            {transaction.username}
                        </td>
                        <td>
                            {type === 'lending' ? (
                                <ArrowUpCircleFill color="green" size={20} />
                            ) : (
                                <ArrowDownCircleFill color="red" size={20} />
                            )}
                            {' '}
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )

    render() {
        const { lendings, investments } = this.state;
        const totalLendings = this.calculateTotal(lendings);
        const totalInvestments = this.calculateTotal(investments);

        return (
            <Container className="mt-5" style={{ maxWidth: '900px' }}> {/* Increased maxWidth */}
                <Row>
                    <Col>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title className="mb-4">
                                    <CurrencyRupee size={30} className="me-2" />
                                    Expense Tracker
                                </Card.Title>
                                <Row className="mb-4">
                                    <Col>
                                        <Card bg="light">
                                            <Card.Body>
                                                <Card.Title>Total Money Borrowed</Card.Title>
                                                <Card.Text className="text-success h3">₹{totalLendings}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card bg="light">
                                            <Card.Body>
                                                <Card.Title>Total Money Investmented</Card.Title>
                                                <Card.Text className="text-danger h3">₹{totalInvestments}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <Tabs defaultActiveKey="lendings" id="expense-tabs" className="mb-3">
                                    <Tab eventKey="lendings" title="Lendings">
                                        {this.renderTransactions(lendings, 'lending')}
                                    </Tab>
                                    <Tab eventKey="investments" title="Investments">
                                        {this.renderTransactions(investments, 'investment')}
                                    </Tab>
                                </Tabs>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ExpenseTracker;
