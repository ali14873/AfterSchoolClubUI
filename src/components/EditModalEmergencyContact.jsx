import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

function EditModalEmergencyContact({ show, onHide, onSave, formData, setFormData }) {

    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSave = () => {
        onSave(formData);
        onHide();
    };


    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Emergency Contact</Modal.Title>
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

                    <Form.Group className="mb-3" controlId="formId">
                        <Form.Label>StudentID</Form.Label>
                        <Form.Control
                            type="text"
                            name="studentId"
                            value={formData && formData.studentId}
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
                        <Form.Label>RelationShip</Form.Label>
                        <Form.Control
                            type="text"
                            name="relationship"
                            value={formData && formData.relationship}
                            onChange={handleChange}
                        />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={formData && formData.phone}
                            onChange={handleChange}
                        />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData && formData.email}
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

export default EditModalEmergencyContact;
