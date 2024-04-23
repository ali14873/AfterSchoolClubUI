import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
function EditModalStudentParent({ show, onHide, onSave, formData, setFormData }) {

    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSave = async () => {

        console.log('updated Data Before Submitting',formData)
        try {
            const response = await axios.put(`https://afterschoolclub.azurewebsites.net/studentParent/edit/${formData.id}`, formData);


            console.log('Updated teacher:', response.data);
            onSave(formData);
            onHide();
        } catch (error) {
            console.error('Error updating teacher:', error.message);
        }
    };



    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Student Parent Relation</Modal.Title>
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


                    <Form.Group className="mb-3" controlId="formId">
                        <Form.Label>Parent ID</Form.Label>
                        <Form.Control
                            type="text"
                            name="parentID"
                            value={formData && formData.parentID}
                            readOnly
                        />
                    </Form.Group>



                    <Form.Group className='mb-3'>
                        <Form.Label>Relation Type</Form.Label>

                        <Form.Select

                            name='relationshipType'
                            className='p-2'
                            aria-label="Floating label select example"
                            onChange={handleChange}
                        >
                            <option value='Mother'>
                                Mother
                            </option>
                            <option value="Father">Father</option>
                            <option value="Guardian">Guardian</option>
                            <option value="Other">Other</option>

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

export default EditModalStudentParent;
