import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
function EditModalresourceInventory({
  show,
  onHide,
  onSave,
  formData,
  setFormData,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
        const response = await axios.put(`https://afterschoolclub.azurewebsites.net/resourceInventory/edit/${formData.inventoryID}`, formData);
        console.log('Response:', response.data);
        
        onSave(formData);
        onHide();
    } catch (error) {
        console.error('Error:', error.message);
    }
};

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit ResourceInventory</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
         

          <Form.Group className="mb-3" controlId="formId">
            <Form.Label>Inventory ID</Form.Label>
            <Form.Control
              type="text"
              name="inventoryID"
              value={formData && formData.inventoryID}
              readOnly
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label>Resource ID</Form.Label>
            <Form.Control
              type="text"
              name="resourceName"
              value={formData && formData.resourceID}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>QuantityAvailable</Form.Label>
            <Form.Control
              type="text"
              name="quantityAvailable"
              value={formData && formData.quantityAvailable}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditModalresourceInventory;
