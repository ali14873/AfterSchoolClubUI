import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarTop from './Navbar';
import axios from 'axios'; 

function AddResource() {
    const [formData, setFormData] = useState({
        resourceName: '',
        description: ''
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
            const response = await axios.post('https://afterschoolclub.azurewebsites.net/resources/create', formData);
            console.log('Response:', response.data);
            toast.success('Resource added successfully');
        } catch (error) {
            console.error('Error:', error.message);
            toast.error('Failed to add resource');
        }
    };

    return (
        <>
            <NavbarTop />
            <Form className='px-4 py-4 formchild formlogin mx-auto' style={{ width: '40%' }}>
                <div className="text-top mb-1 fs-2">Add Resource</div>
                <FloatingLabel controlId="resourceName" label="Resource Name" className="mb-3 label">
                    <Form.Control name="resourceName" type="text" onChange={handleChange} placeholder="Enter Resource Name" />
                </FloatingLabel>
                <FloatingLabel controlId="description" label="Description" className="mb-3 label">
                    <Form.Control name="description" type="text" onChange={handleChange} placeholder="Enter Description" />
                </FloatingLabel>
                <Link to='/upload'>
                    <Button className='w-100 rounded-0 btn-white'>Upload</Button>
                </Link>
                <Button className='w-100 rounded-0 mt-3 btn-success' onClick={handleSubmit}>Submit</Button>
            </Form>
        </>
    );
}

export default AddResource;
