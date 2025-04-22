import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Admin_add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            phone: "",
            password: "",
            errors: {},
            showPassword: false,
            loading: false,
            responseMessage: ''
        }
    }

    inputChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            ...prevState,
            [name]: value,
            errors: {
                ...prevState.errors,
                [name]: '' // Clear specific field error
            },
            responseMessage: '' // Clear response message
        }));
    }

    validateForm = () => {
        const { username, phone, password } = this.state;
        const errors = {};

        // Username validation
        if (!username.trim()) {
            errors.username = 'Username is required';
        } else if (username.length < 3) {
            errors.username = 'Username must be at least 3 characters';
        }

        // Phone number validation
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phone.trim()) {
            errors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(phone)) {
            errors.phone = 'Invalid phone number';
        }

        // Password validation
        if (!password.trim()) {
            errors.password = 'Password is required';
        } else if (password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }

        this.setState({ errors });
        return Object.keys(errors).length === 0;
    }

    togglePasswordVisibility = () => {
        this.setState(prevState => ({
            showPassword: !prevState.showPassword
        }));
    }

    add_admin = (e) => {
        e.preventDefault();
        
        if (this.validateForm()) {
            this.setState({ 
                loading: true,
                responseMessage: ''
            });

            const data = {
                username: this.state.username,
                phone: this.state.phone,
                password: this.state.password
            };

            axios.post("http://localhost/digital_miniloan_backend/add_admin.php", data)
                .then(response => {
                    this.setState({ loading: false });
                    
                    if (response.data === "success") {
                        this.setState({
                            responseMessage: 'Admin added Successfully',
                            username: '',
                            phone: '',
                            password: ''
                        });
                    } else if (response.data === "user already exists") {
                        this.setState({
                            responseMessage: 'User already Exists'
                        });
                    } else {
                        this.setState({
                            responseMessage: response.data
                        });
                    }
                })
                .catch(error => {
                    this.setState({
                        loading: false,
                        responseMessage: 'An error occurred. Please try again.'
                    });
                    console.error('Error:', error);
                });
        }
    }

    render() {
        const { username, phone, password, errors, showPassword, loading, responseMessage } = this.state;

        return (
            <Container 
                fluid 
                className="d-flex justify-content-center pt-5" // Changed from align-items-center to pt-5
                style={{ 
                    minHeight: '100vh', 
                    backgroundColor: '#f4f6f9'
                }}
            >
                <Row className="w-100 justify-content-center">
                    <Col xs={12} md={6} lg={5}>
                        <Card className="shadow-lg border-0">
                            <Card.Body className="p-5">
                                <h2 className="text-center mb-4" style={{ color: '#333' }}>
                                    <i className="fas fa-user-plus me-2"></i>
                                    Add New Admin
                                </h2>
                                
                                <Form onSubmit={this.add_admin}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="username"
                                            value={username}
                                            onChange={this.inputChange}
                                            isInvalid={!!errors.username}
                                            placeholder="Enter username"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.username}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="phone"
                                            value={phone}
                                            onChange={this.inputChange}
                                            maxLength="10"
                                            isInvalid={!!errors.phone}
                                            placeholder="Enter 10-digit phone number"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.phone}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <div className="input-group">
                                            <Form.Control 
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={password}
                                                onChange={this.inputChange}
                                                isInvalid={!!errors.password}
                                                placeholder="Enter password"
                                            />
                                            <Button 
                                                variant="outline-secondary" 
                                                onClick={this.togglePasswordVisibility}
                                            >
                                                {showPassword ? "Hide" : "Show"}
                                            </Button>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </div>
                                    </Form.Group>

                                    {responseMessage && (
                                        <Alert 
                                            variant={
                                                responseMessage.includes('Successfully') ? 'success' : 
                                                responseMessage.includes('already Exists') ? 'warning' : 'danger'
                                            }
                                            className="mt-3"
                                        >
                                            {responseMessage}
                                        </Alert>
                                    )}

                                    <Button 
                                        variant="primary" 
                                        type="submit" 
                                        className="w-100 mt-3"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <Spinner 
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                    className="me-2"
                                                />
                                                Adding Admin...
                                            </>
                                        ) : (
                                            'Add New Admin'
                                        )}
                                    </Button>
                                    </Form>
                            </Card.Body>
                        </Card>

                        <Alert variant="info" className="mt-3 text-center">
                            <small>Ensure all details are correct before submission</small>
                        </Alert>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Admin_add;