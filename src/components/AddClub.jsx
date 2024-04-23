import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarTop from './Navbar';
import axios from 'axios'; 

function AddClub() {
    const [formData, setFormData] = useState({
        clubName: '',
        description: '',
        location: ''
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
            const response = await axios.post('https://afterschoolclub.azurewebsites.net/club/create', formData);
            console.log('Response:', response.data);
            toast.success('Club added successfully');
        } catch (error) {
            console.error('Error:', error.message);
            toast.error('Failed to add club');
        }
    };

    return (
        <>
            <NavbarTop />
            <Form className='px-4 py-4 formchild formlogin mx-auto' style={{ width: '40%' }}>
                <div className="text-top mb-1 fs-2">Add Club</div>

                <FloatingLabel controlId="clubName" label="Club Name" className="mb-3 label">
                    <Form.Control name="clubName" type="text" onChange={handleChange} placeholder="Enter Club Name" />
                </FloatingLabel>
                <FloatingLabel controlId="description" label="Description" className="mb-3 label">
                    <Form.Control name="description" type="text" onChange={handleChange} placeholder="Enter Description" />
                </FloatingLabel>
                <FloatingLabel controlId="location" label="Location" className="mb-3 label">
                    <Form.Control name="location" type="text" onChange={handleChange} placeholder="Enter Location" />
                </FloatingLabel>
                <Link to='/upload'>
                    <Button className='w-100 rounded-0 btn-white'>Upload</Button>
                </Link>
                <Button className='w-100 rounded-0 mt-3 btn-success' onClick={handleSubmit}>Submit</Button>
            </Form>
        </>
    );
}

export default AddClub;
