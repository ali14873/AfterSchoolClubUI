import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container className="h-100">
      <Row className="h-100 align-items-center justify-content-center">
        <Col md={6}>
          <div className="text-center">
            <h1 className="display-1 text-danger">404</h1>
            <p className="lead">Oops! Page not found</p>
            <Button href="/" variant="primary">Back to Home</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
