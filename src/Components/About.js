import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { ShieldCheck, Lightning, PeopleFill, CashStack } from 'react-bootstrap-icons';

export default function About() {
  return (
    <div className='bg-light'>
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <h1 className="display-4 text-center text-primary mb-4">About Digital Miniloan</h1>
          <p className="lead text-center mb-5">
            We provide fast, reliable, and secure loan services, empowering our community through innovative financial solutions.
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={6} className="mb-4 mb-md-0">
          <Card>
            <Card.Body>
              <Card.Title className="text-primary mb-4">Our Mission</Card.Title>
              <Card.Text style={{fontSize:'18px'}}>
                At Digital Miniloan, our mission is to democratize lending and borrowing. We believe in creating a 
                financial ecosystem where individuals can support each other, fostering economic growth and financial 
                inclusion. By leveraging technology, we aim to make the loan process simple, transparent, and accessible to all.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-primary mb-4">Our Vision</Card.Title>
              <Card.Text style={{fontSize:'18px'}}>
                We envision a world where financial barriers are minimized, and opportunities are maximized. 
                Digital Miniloan strives to be at the forefront of peer-to-peer lending, continuously innovating 
                to meet the evolving needs of our users. We aim to build a global community of empowered individuals 
                who can achieve their financial goals through mutual support and trust.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <h2 className="text-center text-primary mb-4">Why Choose Us?</h2>
          <Row xs={1} md={2} className="g-4">
            {[
              { icon: ShieldCheck, title: "Secure Transactions", description: "State-of-the-art encryption and security measures to protect your data and funds." },
              { icon: Lightning, title: "Fast Processing", description: "Quick approval process and rapid fund disbursement to meet your urgent needs." },
              { icon: PeopleFill, title: "Community-Driven", description: "A platform where users can be both lenders and borrowers, fostering a supportive ecosystem." },
              { icon: CashStack, title: "Competitive Rates", description: "Favorable interest rates for borrowers and attractive returns for lenders." }
            ].map((feature, index) => (
              <Col key={index}>
                <Card className="h-100">
                  <Card.Body className="d-flex flex-column">
                    <div className="text-center mb-3">
                      <feature.icon className="text-primary" size={40} />
                    </div>
                    <Card.Title className="text-center mb-3">{feature.title}</Card.Title>
                    <Card.Text className="text-center">{feature.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <Row>
        <Col md={8} className="mx-auto">
          <Card>
            <Card.Body>
              <Card.Title className="text-primary mb-4">Our Commitment to You</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>Transparency in all our operations and fee structures</ListGroup.Item>
                <ListGroup.Item>Continuous improvement of our platform based on user feedback</ListGroup.Item>
                <ListGroup.Item>Dedicated customer support to assist you at every step</ListGroup.Item>
                <ListGroup.Item>Compliance with all relevant financial regulations and standards</ListGroup.Item>
                <ListGroup.Item>Promotion of financial literacy and responsible lending practices</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
}