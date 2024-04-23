import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from"axios"
function EditModalCriticalIncident({ show, onHide, onSave, formData, setFormData }) {

    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    // const handleSave = () => {
    //     onSave(formData);
    //     onHide();
    // };

    const handleSave = async () => {

        console.log('updated Data Before Submitting',formData)
        try {
            const response = await axios.put(`https://afterschoolclub.azurewebsites.net/criticalIncidents/edit/${formData.incidentId}`, formData);


            console.log('Updated critical:', response.data);
            onSave(formData);
            onHide();
        } catch (error) {
            console.error('Error critical health:', error.message);
        }
    };



    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Critical Incident</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form>
                    <Form.Group className="mb-3" controlId="formId">
                        <Form.Label>ID</Form.Label>
                        <Form.Control
                            type="text"
                            name="incidentId"
                            value={formData && formData.incidentId}
                            readOnly
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formId">
                        <Form.Label>Reported By</Form.Label>
                        <Form.Control
                            type="text"
                            name="reportedBy"
                            value={formData && formData.reportedBy}
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>Session ID</Form.Label>
                        <Form.Control
                            type="text"
                            name="sessionId"
                            value={formData && formData.sessionId}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Incident Type</Form.Label>
                        <Form.Control
                            type="text"
                            name="incidentType"
                            value={formData && formData.incidentType}
                            onChange={handleChange}
                        />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={formData && formData.description}
                            onChange={handleChange}
                        />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>ActionTaken</Form.Label>
                        <Form.Control
                            type="text"
                            name="actionTaken"
                            value={formData && formData.actionTaken}
                            onChange={handleChange}
                        />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Resolved</Form.Label>
                        <Form.Control
                            type="text"
                            name="resolved"
                            value={formData && formData.resolved}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Resolution Details</Form.Label>
                        <Form.Control
                            type="text"
                            name="resolutionDetails"
                            value={formData && formData.resolutionDetails}
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

export default EditModalCriticalIncident;
