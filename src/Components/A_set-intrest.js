import axios from "axios";
import React from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Loan.css';


class Set_intrest extends React.Component{

    constructor(props){
        super(props);
        this.state={
            intrest:"",
            credit:"",
            current_int:null,
            current_cre:null
        }
    }

    componentDidMount(){
        this.current_settings();
    }

    inputSet=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    current_settings=()=>{
        axios.post("http://localhost/digital_miniloan_backend/current_settings.php").then(response=>{
            const irate=response.data.irate;
            const credit=response.data.credit;

            this.setState({
                current_int:irate,
                current_cre:credit
            });
        })
    }

    change_setting=()=>{
        if(this.state.intrest>18){
            alert("Maximum Intrest Allowed is 18%");
        }else{
            var data={
                intrest:this.state.intrest,
                credit:this.state.credit
            }
            axios.post("http://localhost/digital_miniloan_backend/change_loan_settings.php",data).then(response=>{
                if(response.data.status==="success"){
                    alert("intrest Rate updated");
                    this.setState(
                    {    intrest:"",
                         credit:""
                    }
                    )
                }else{
                    alert("intrest not updated");
                }
            })
        }
    }

    render(){
        return(
          <Container 
            fluid 
            className="d-flex justify-content-center pt-5" 
            style={{ 
              minHeight: '100vh', 
              backgroundColor: '#f8f9fa'  // Off-white background
            }}
          >
            <Row className="w-100 justify-content-center">
              <Col xs={12} md={6}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title className="text-center mb-4">
                      <h1 className="admin-title">Loan Settings</h1>
                    </Card.Title>
                    
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Interest Rate</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="intrest" 
                          onChange={this.inputSet}
                          max="18"
                          placeholder="Enter interest rate"
                        />
                      </Form.Group>
    
                      <Form.Group className="mb-3">
                        <Form.Label>Credit Score</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="credit" 
                          onChange={this.inputSet}
                          placeholder="Enter credit score"
                        />
                      </Form.Group>
    
                      <Button 
                        variant="primary" 
                        onClick={this.change_setting}
                        className="w-100"
                      >
                        Submit
                      </Button>
    
                      <Alert variant="info" className="mt-3 text-center">
                        Note: As per Indian law, the maximum permissible interest rate is 18%.
                      </Alert>
    
                      {/* Optional: Display current values for debugging */}
                      <div className="mt-3 text-center">
                        <p>Current Interest Rate: {this.state.current_int}</p>
                        <p>Current Credit Score: {this.state.current_cre}</p>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        )
    }
}

export default Set_intrest;