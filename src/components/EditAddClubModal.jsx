import React, { useState } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; 
import { Button, Modal, Form } from 'react-bootstrap';
function EditAddClubModal({ show, onHide, onSave, formData, setFormData }) {

    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSave = async () => {
        try {
            const response = await axios.put(`https://afterschoolclub.azurewebsites.net/club/edit/${formData.id}`, formData);
            console.log('Response:', response.data);
            toast.success('Club updated successfully');
            
            onSave(formData);
            onHide();
        } catch (error) {
            console.error('Error:', error.message);
            toast.error('Failed to update club');
        }
    };
    

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Club</Modal.Title>
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
                        <Form.Label>Club Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="clubName"
                            value={formData && formData.clubName}
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
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            name="location"
                            value={formData && formData.location}
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

export default EditAddClubModal;
