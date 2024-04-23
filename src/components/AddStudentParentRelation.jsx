import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarTop from './Navbar';

function AddStudentParentRelation() {
    const [formData, setFormData] = useState({
        studentID: '',
        parentID: '',
        relationshipType: '',
        attachChildToParent: '',
        attachStudentToCaregiver: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {

        console.log(formData);
        try {
            const response = await axios.post('https://afterschoolclub.azurewebsites.net/studentParent/create', formData);
            console.log('Response:', response.data);
            toast.success('Student-Parent relation added successfully');
        } catch (error) {
            console.error('Error:', error.message);
            toast.error('Failed to add student-parent relation');
        }
    };

    return (
        <>
            <NavbarTop/>
            <Form className='px-4 py-4 formchild formlogin mx-auto' style={{ width: '40%' }}>
                <div className="text-top mb-1 fs-2">Add Student Parent Relation</div>
                <FloatingLabel controlId="studentID" label="Student ID" className="mb-3 label">
                    <Form.Control name="studentID" type="text" onChange={handleChange} placeholder="Enter Student ID" />
                </FloatingLabel>
                <FloatingLabel controlId="parentID" label="Parent ID" className="mb-3 label">
                    <Form.Control name="parentID" type="text" onChange={handleChange} placeholder="Enter Parent ID" />
                </FloatingLabel>
                <FloatingLabel controlId="relationType" label="Relation Type" className="mb-3 label">
                    <Form.Select name="relationshipType" onChange={handleChange}>
                        <option value="Mother">Mother</option>
                        <option value="Father">Father</option>
                        <option value="Guardian">Guardian</option>
                        <option value="Other">Other</option>
                    </Form.Select>
                </FloatingLabel>
                <FloatingLabel controlId="attachChildToParent" label="Attach Child To Parent?" className="mb-3 label">
                    <Form.Select name="attachChildToParent" onChange={handleChange}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </Form.Select>
                </FloatingLabel>
                <FloatingLabel controlId="attachStudentToCaregiver" label="Attach Student To Caregiver?" className="mb-3 label">
                    <Form.Select name="attachStudentToCaregiver" onChange={handleChange}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </Form.Select>
                </FloatingLabel>
                <Link to='/upload'>
                    <Button className='w-100 rounded-0 btn-white'>Upload</Button>
                </Link>
                <Button className='w-100 rounded-0 mt-3 btn-success' onClick={handleSubmit}>Submit</Button>
            </Form>
        </>
    );
}

export default AddStudentParentRelation;
