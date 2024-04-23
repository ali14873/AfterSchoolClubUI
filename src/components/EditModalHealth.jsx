import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
function EditModalHealth({ show, onHide, onSave, formData, setFormData }) {

    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSave = async () => {

        console.log('updated Data Before Submitting',formData)
        try {
            const response = await axios.put(`https://afterschoolclub.azurewebsites.net/health/edit/${formData.id}`, formData);


            console.log('Updated health:', response.data);
            onSave(formData);
            onHide();
        } catch (error) {
            console.error('Error updating health:', error.message);
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Health</Modal.Title>
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
                            name="studentID"
                            value={formData && formData.studentID}
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>Condition</Form.Label>
                        <Form.Control
                            type="text"
                            name="condition"
                            value={formData && formData.condition}
                            onChange={handleChange}
                        />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Details</Form.Label>
                        <Form.Control
                            type="text"
                            name="details"
                            value={formData && formData.details}
                            onChange={handleChange}
                        />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Medication</Form.Label>
                        <Form.Control
                            type="text"
                            name="medication"
                            value={formData && formData.medication}
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

export default EditModalHealth;
