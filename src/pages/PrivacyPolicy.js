import React from 'react';
import { Container, Row, Col, Card, Nav } from 'react-bootstrap';

const PrivacyPolicy = () => {
  return (
    <Container fluid className="mt-3">
      <Row>
        <Col md={3} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Table of Contents</Card.Title>
              <Nav className="flex-column">
                <Nav.Link href="#introduction">1. Introduction</Nav.Link>
                <Nav.Link href="#information-collection">2. Information We Collect</Nav.Link>
                <Nav.Link href="#use-of-information">3. How We Use Your Information</Nav.Link>
                <Nav.Link href="#data-sharing">4. Data Sharing and Disclosure</Nav.Link>
                <Nav.Link href="#data-security">5. Data Security</Nav.Link>
                <Nav.Link href="#your-rights">6. Your Rights</Nav.Link>
                <Nav.Link href="#changes">7. Changes to This Privacy Policy</Nav.Link>
                <Nav.Link href="#contact">8. Contact Us</Nav.Link>
              </Nav>
            </Card.Body>
          </Card>
        </Col>

        <Col md={9}>
          <div className="text-center ">
            <h2 className="display-4 font-weight-bold">Privacy Policy</h2>
          </div>

          <Row id="introduction" className="mb-4 mt-4">
            <Col md={12}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>1. Introduction</Card.Title>
                  <Card.Text>
                    This Privacy Policy explains how we collect, use, and protect your personal information when you visit our veterinary clinic and use our services. By using our services, you consent to the data practices described in this policy.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row id="information-collection" className="mb-4">
            <Col md={12}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>2. Information We Collect</Card.Title>
                  <Card.Text>
                    We may collect the following types of personal information:
                    <ul>
                      <li>Name and contact information (e.g., phone number, email address)</li>
                      <li>Pet information (e.g., name, breed, age, medical history)</li>
                      <li>Payment information (e.g., credit card details)</li>
                      <li>Appointment and service records</li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row id="use-of-information" className="mb-4">
            <Col md={12}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>3. How We Use Your Information</Card.Title>
                  <Card.Text>
                    We use your personal information for the following purposes:
                    <ul>
                      <li>To provide and manage our veterinary services</li>
                      <li>To communicate with you regarding appointments and services</li>
                      <li>To process payments and manage billing</li>
                      <li>To improve our services and customer experience</li>
                      <li>To comply with legal obligations</li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row id="data-sharing" className="mb-4">
            <Col md={12}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>4. Data Sharing and Disclosure</Card.Title>
                  <Card.Text>
                    We do not sell, rent, or lease your personal information to third parties. We may share your information with trusted service providers who assist us in operating our clinic, processing payments, or conducting our services, provided they agree to keep your information confidential.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row id="data-security" className="mb-4">
            <Col md={12}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>5. Data Security</Card.Title>
                  <Card.Text>
                    We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or method of electronic storage is completely secure, and we cannot guarantee its absolute security.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row id="your-rights" className="mb-4">
            <Col md={12}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>6. Your Rights</Card.Title>
                  <Card.Text>
                    You have the right to:
                    <ul>
                      <li>Request access to the personal information we hold about you</li>
                      <li>Request correction of any inaccuracies in your personal information</li>
                      <li>Request deletion of your personal information under certain circumstances</li>
                      <li>Opt-out of marketing communications</li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row id="changes" className="mb-4">
            <Col md={12}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>7. Changes to This Privacy Policy</Card.Title>
                  <Card.Text>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website. You are advised to review this policy periodically for any changes.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row id="contact" className="mb-4">
            <Col md={12}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>8. Contact Us</Card.Title>
                  <Card.Text>
                    If you have any questions or concerns about this Privacy Policy, please contact us at:
                  </Card.Text>
                  <Card.Text>
                    Email: samrudhiveterinaryclinic@gmail.com <br />
                    Phone: (123) 456-7890
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPolicy;
