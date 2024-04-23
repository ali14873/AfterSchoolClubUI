import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarTop from './Navbar';
import axios from 'axios'; 

function AddHealth() {
    const [formData, setFormData] = useState({
        studentId: '',
        condition: '',
        details: '',
        medication: ''
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
            const response = await axios.post('https://afterschoolclub.azurewebsites.net/healthRecord/create', formData);
            console.log('Response:', response.data);
            toast.success('Health record added successfully');
        } catch (error) {
            console.error('Error:', error.message);
            toast.error('Failed to add health record');
        }
    };

    return (
        <>
            <NavbarTop />
            <Form className='px-4 py-4 formchild formlogin mx-auto' style={{ width: '40%' }}>
                <div className="text-top mb-1 fs-2">Add Health</div>
                <FloatingLabel controlId="studentId" label="Student ID" className="mb-3 label">
                    <Form.Control name="studentID" type="text" onChange={handleChange} placeholder="Enter Student ID" />
                </FloatingLabel>
                <FloatingLabel controlId="condition" label="Condition" className="mb-3 label">
                    <Form.Control name="condition" type="text" onChange={handleChange} placeholder="Enter Condition" />
                </FloatingLabel>
                <FloatingLabel controlId="details" label="Details" className="mb-3 label">
                    <Form.Control name="details" type="text" onChange={handleChange} placeholder="Enter Details" />
                </FloatingLabel>
                <FloatingLabel controlId="medication" label="Medication" className="mb-3 label">
                    <Form.Control name="medication" type="text" onChange={handleChange} placeholder="Enter Medication" />
                </FloatingLabel>
                <Link to='/upload'>
                    <Button className='w-100 rounded-0 btn-white'>Upload</Button>
                </Link>
                <Button className='w-100 rounded-0 mt-3 btn-success' onClick={handleSubmit}>Submit</Button>
            </Form>
        </>
    );
}

export default AddHealth;
