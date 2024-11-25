import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const TermsOfService = () => {
  return (
    <Container className="mt-5">
       <div className="text-center my-4">
            <h2 className="display-4 font-weight-bold">Terms Of Service</h2>
        </div>
      <Row className="mb-4">
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>1. Acceptance of Terms</Card.Title>
              <Card.Text>
                By accessing or using our services, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our services.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>2. Changes to Terms</Card.Title>
              <Card.Text>
                We reserve the right to modify these Terms of Service at any time. Any changes will be effective immediately upon posting on our website. Your continued use of our services after any changes signifies your acceptance of the new terms.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>3. Services Provided</Card.Title>
              <Card.Text>
                Our veterinary clinic provides various services, including but not limited to routine check-ups, vaccinations, dental care, emergency services, and surgical procedures. We strive to provide high-quality care for your pets.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>4. User Responsibilities</Card.Title>
              <Card.Text>
                As a user of our services, you agree to provide accurate and complete information when scheduling appointments and to comply with all applicable laws and regulations. You are responsible for the care of your pet during appointments and treatments.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>5. Payment Terms</Card.Title>
              <Card.Text>
                Payments for services must be made at the time of service. We accept various payment methods, including cash, credit/debit cards, and pet insurance. Prices for services may vary and are subject to change.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>6. Limitation of Liability</Card.Title>
              <Card.Text>
                To the fullest extent permitted by law, our clinic will not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to your use of our services.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>7. Privacy Policy</Card.Title>
              <Card.Text>
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>8. Governing Law</Card.Title>
              <Card.Text>
                These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which our clinic operates. Any disputes arising from these terms will be resolved in the appropriate courts of that jurisdiction.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>9. Contact Information</Card.Title>
              <Card.Text>
                If you have any questions about these Terms of Service, please contact us at:
              </Card.Text>
              <Card.Text>
                Email: samrudhiveterinaryclinic@gmail.com <br />
                Phone: (123) 456-7890
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TermsOfService;
