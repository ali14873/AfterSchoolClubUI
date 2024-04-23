import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarTop from './Navbar';
import axios from 'axios'; 

function AddAllergy() {
    const [formData, setFormData] = useState({
        studentId: '',
        allergyType: '1',
        severity: '',
        actionPlan: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://afterschoolclub.azurewebsites.net/allergies/create', formData);
            console.log('Response:', response.data);
            toast.success('Allergy record added successfully');
        } catch (error) {
            console.error('Error:', error.message);
            toast.error('Failed to add allergy record');
        }
    };

    return (
        <>
            <NavbarTop />
            <Form className='px-4 py-4 formchild formlogin mx-auto' style={{ width: '40%' }}>
                <div className="text-top mb-1 fs-2">Add Allergy</div>
                <FloatingLabel controlId="studentId" label="Student ID" className="mb-3 label">
                    <Form.Control name="studentId" type="text" onChange={handleChange} placeholder="Enter Student ID" />
                </FloatingLabel>
                <FloatingLabel controlId="allergyType" label="Allergy Type" className='mb-3'>
                    <Form.Select name="allergyType" onChange={handleChange}>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </FloatingLabel>
                <FloatingLabel controlId="severity" label="Severity" className="mb-3 label">
                    <Form.Control name="severity" type="text" onChange={handleChange} placeholder="Enter Severity" />
                </FloatingLabel>
                <FloatingLabel controlId="actionPlan" label="Action Plan" className="mb-3 label">
                    <Form.Control name="actionPlan" type="text" onChange={handleChange} placeholder="Enter Action Plan" />
                </FloatingLabel>
                <Link to='/upload'>
                    <Button className='w-100 rounded-0 btn-white'>Upload</Button>
                </Link>
                <Button className='w-100 rounded-0 mt-3 btn-success' onClick={handleSubmit}>Submit</Button>
            </Form>
        </>
    );
}

export default AddAllergy;
