import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

function EditModalAllergy({ show, onHide, onSave, formData, setFormData }) {

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
                <Modal.Title>Edit Allergy</Modal.Title>
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
                        <Form.Label>Student ID</Form.Label>
                        <Form.Control
                            type="text"
                            name="studentId"
                            value={formData && formData.studentId}
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>AllergyType</Form.Label>
                        <Form.Control
                            type="text"
                            name="AllergyType"
                            value={formData && formData.AllergyType}
                            onChange={handleChange}
                        />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Severity</Form.Label>
                        <Form.Control
                            type="text"
                            name="severity"
                            value={formData && formData.severity}
                            onChange={handleChange}
                        />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>ActionType</Form.Label>
                        <Form.Control
                            type="text"
                            name="actionType"
                            value={formData && formData.actionType}
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

export default EditModalAllergy;
