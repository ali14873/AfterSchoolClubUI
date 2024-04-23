import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
function EditModalCalendar({ show, onHide, onSave, formData, setFormData }) {

    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSave = async () => {

        console.log('updated Data Before Submitting',formData)
        onHide();

        try {
            const response = await axios.put(`http://localhost:8080/sessions/edit/${formData.id}`, formData);


            console.log('Updated session:', response.data);
            onSave(formData);
        } catch (error) {
            console.error('Error updating session:', error.message);
        }

    };



    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Sessions</Modal.Title>
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


                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>ClubID</Form.Label>
                        <Form.Control
                            type="text"
                            name="clubId"
                            value={formData && formData.clubId}
                            onChange={handleChange}
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={formData && formData.title}
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
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            value={formData && formData.start}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>StartTime</Form.Label>
                        <Form.Control
                            type="time"
                            name="startTime"
                            value={formData && formData.startTime}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>EndTime</Form.Label>
                        <Form.Control
                            type="time"
                            name="endTime"
                            value={formData && formData.endTime}
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

                   

                    <Form.Group  className="mb-3">
                        <Form.Label>IsRecurring</Form.Label>

                        <Form.Select
                            name='isRecurring'
                            className='p-2'
                            aria-label="Floating label select example"

                            onChange={handleChange}
                        >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
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

export default EditModalCalendar;
