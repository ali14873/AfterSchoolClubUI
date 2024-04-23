import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarTop from './Navbar';
import axios from 'axios'; 

function AddEmergencycontact() {
    const [formData, setFormData] = useState({
        studentId: '',
        firstName: '',
        lastName: '',
        relationShip: '',
        phone: '',
        email: ''
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
            const response = await axios.post('https://afterschoolclub.azurewebsites.net/emergencyContact/create', formData);
            console.log('Response:', response.data);
            toast.success('Emergency contact added successfully');
        } catch (error) {
            console.error('Error:', error.message);
            toast.error('Failed to add emergency contact');
        }
    };

    return (
        <>
            <NavbarTop />
            <Form className='px-4 py-4 formchild formlogin mx-auto' style={{ width: '40%' }}>
                <div className="text-top mb-1 fs-2">Add Emergency Contact</div>
                <FloatingLabel controlId="studentId" label="Student ID" className="mb-3 label">
                    <Form.Control name="studentId" type="text" onChange={handleChange} placeholder="Enter Student ID" />
                </FloatingLabel>
                <FloatingLabel controlId="firstName" label="First Name" className="mb-3 label">
                    <Form.Control name="firstName" type="text" onChange={handleChange} placeholder="Enter First Name" />
                </FloatingLabel>
                <FloatingLabel controlId="lastName" label="Last Name" className="mb-3 label">
                    <Form.Control name="lastName" type="text" onChange={handleChange} placeholder="Enter Last Name" />
                </FloatingLabel>
                <FloatingLabel controlId="relationShip" label="RelationShip" className="mb-3 label">
                    <Form.Control name="relationShip" type="text" onChange={handleChange} placeholder="Enter RelationShip" />
                </FloatingLabel>
                <FloatingLabel controlId="phone" label="Phone" className="mb-3 label">
                    <Form.Control name="phone" type="text" onChange={handleChange} placeholder="Enter Phone" />
                </FloatingLabel>
                <FloatingLabel controlId="email" label="Email" className="mb-3 label">
                    <Form.Control name="email" type="email" onChange={handleChange} placeholder="Enter Email" />
                </FloatingLabel>
                <Link to='/upload'>
                    <Button className='w-100 rounded-0 btn-white'>Upload</Button>
                </Link>
                <Button className='w-100 rounded-0 mt-3 btn-success' onClick={handleSubmit}>Submit</Button>
            </Form>
        </>
    );
}

export default AddEmergencycontact;
