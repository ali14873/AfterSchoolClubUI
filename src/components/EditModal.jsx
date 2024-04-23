import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
function EditModal({ show, onHide, onSave, formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    console.log("updated Data Before Submitting", formData);
    try {
      const response = await axios.put(
        `http://localhost:8080/student/edit/${formData.id}`,
        formData
      );

      console.log("Updated Student:", response.data);
      onSave(formData);
      onHide();
    } catch (error) {
      console.error("Error updating teacher:", error.message);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formId">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              name="id"
              value={formData && formData.id}
              readOnly
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData && formData.firstName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData && formData.lastName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>Date Of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              value={formData && formData.dateOfBirth}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Year Group</Form.Label>

            <Form.Select
              name="yearGroup"
              className="p-2"
              aria-label="Floating label select example"
              onChange={handleChange}
            >
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>

              <option value="4">Four</option>
              <option value="5">Five</option>
              <option value="6">Six</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Gender</Form.Label>

            <Form.Select
              name="gender"
              className="p-2"
              aria-label="Floating label select example"
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>
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

export default EditModal;
