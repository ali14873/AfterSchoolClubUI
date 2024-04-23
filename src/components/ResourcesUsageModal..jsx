import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ResourcesUsageModal = ({onClose }) => {
  // Initialize status state for each attendee
 

 

  const handleSave = () => {
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose} className="complete-session-modal">
       <Modal.Header closeButton>
        <Modal.Title> Resources Used</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>Resource Name</Form.Label>
          <Form.Control
            type="text"
            name="resourceName"
            // onChange={handleChange}
            value='1'

            
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>QuantityUsed</Form.Label>
          <Form.Control
            type="text"
            name="QuantityUsed"

            value='189'
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResourcesUsageModal;
