import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { ArrowRight, CurrencyDollar, Clock, Shield, People } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function Chome() {
    const navigate=useNavigate();

    function sign_in(){
        toast.success("First Create Account!!!!");
        navigate('/signup');
        
    }

    function login(){
        toast.warn("Login to continue");
        navigate('/login');
    }
  return (    
    <div className="min-vh-100 bg-light">
      <Container className="py-5">
        <section className="text-center mb-5">
          <h1 className="display-4 fw-bold text-primary mb-3">Welcome to Digital Miniloan</h1>
          <p className="lead mb-4">Your solution for quick and easy loans, where users can both provide and receive financial support.</p>
          <Button variant="primary" size="lg" className="rounded-pill" onClick={()=>{sign_in()}}>
            Get Started <ArrowRight className="ms-2" />
          </Button>
        </section>

        <section className="mb-5">
          <h2 className="text-center text-primary mb-4">Why Choose Digital Miniloan?</h2>
          <Row xs={1} md={2} lg={4} className="g-4">
            {[
              { icon: CurrencyDollar, title: "Quick Funding", description: "Get the money you need in as little as 24 hours" },
              { icon: Clock, title: "Flexible Terms", description: "Choose repayment terms that work for you" },
              { icon: Shield, title: "Secure Platform", description: "Your data and transactions are always protected" },
              { icon: People, title: "Community Driven", description: "Users can both lend and borrow, creating a supportive ecosystem" },
            ].map((feature, index) => (
              <Col key={index}>
                <Card className="h-100 text-center shadow-sm hover-shadow">
                  <Card.Body>
                    <div className="mb-3">
                      <feature.icon className="text-primary" size={32} />
                    </div>
                    <Card.Title>{feature.title}</Card.Title>
                    <Card.Text>{feature.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section className="text-center">
          <h2 className="text-primary mb-3">Ready to Get Started?</h2>
          <p className="lead mb-4">Join our community of Investors and borrowers today!</p>
          <div>
            <Button variant="outline-primary" size="lg" className="rounded-pill me-3 mb-3" onClick={()=>{login()}}>
              Apply for a Loan
            </Button>
            <Button variant="outline-primary" size="lg" className="rounded-pill mb-3" onClick={()=>login()}>
              Become an Investor
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );

  
}