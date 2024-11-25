import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function FAQ  () {
  return (
    <Container className="mt-5">
        
        <div className="text-center my-4">
            <h2 className="display-4 font-weight-bold">Frequently Asked Questions</h2>
        </div>

      <Row className="mb-4 mt-5">
        <Col md={6}>
          <h5>Question 1: What services do you offer?</h5>
          <p>
            We offer a variety of veterinary services including routine check-ups,
            vaccinations, dental care, emergency services, and surgical procedures.
            Our team is dedicated to providing the best care for your pets.
          </p>
        </Col>
        <Col md={6}>
          <h5>Question 2: How can I book an appointment?</h5>
          <p>
            You can book an appointment by calling us directly at (123) 456-7890
            or using our online appointment system available on our website.
          </p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6}>
          <h5>Question 3: What should I bring to my pet's first appointment?</h5>
          <p>
            For your pet's first appointment, please bring any previous medical
            records, vaccination history, and a list of any medications your pet
            is currently taking.
          </p>
        </Col>
        <Col md={6}>
          <h5>Question 4: Do you provide emergency services?</h5>
          <p>
            Yes, we provide emergency services during our regular business hours.
            For after-hours emergencies, please contact your nearest emergency
            veterinary hospital.
          </p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6}>
          <h5>Question 5: How do I know if my pet needs to see a vet?</h5>
          <p>
            If your pet shows signs of illness such as vomiting, diarrhea,
            lethargy, or if you notice any unusual behavior, it is best to
            schedule an appointment with our veterinary team.
          </p>
        </Col>
        <Col md={6}>
          <h5>Question 6: What payment methods do you accept?</h5>
          <p>
            We accept various payment methods, including cash, credit/debit cards,
            and pet insurance. Please contact our office for specific insurance
            inquiries.
          </p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6}>
          <h5>Question 7: How can I keep my pet healthy between visits?</h5>
          <p>
            Regular exercise, a balanced diet, and preventive care such as
            vaccinations and check-ups are essential for maintaining your pet's
            health. We can provide specific advice tailored to your pet’s needs
            during your visits.
          </p>
        </Col>
        <Col md={6}>
          <h5>Question 8: What is your policy on vaccinations?</h5>
          <p>
            We follow recommended vaccination protocols for dogs and cats.
            Our veterinarians will discuss a vaccination schedule based on your
            pet's age, lifestyle, and health status.
          </p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6}>
          <h5>Question 9: Can I visit my pet if they are hospitalized?</h5>
          <p>
            Yes, we allow visits for pets that are hospitalized, but we ask that
            you coordinate with our staff to ensure a smooth and safe visit.
          </p>
        </Col>
        <Col md={6}>
          <h5>Question 10: How can I contact you for more information?</h5>
          <p>
            You can contact us through our website, call us at (123) 456-7890,
            or visit us during our business hours for any inquiries you may have.
          </p>
        </Col>
      </Row>
    </Container>
  );
};


