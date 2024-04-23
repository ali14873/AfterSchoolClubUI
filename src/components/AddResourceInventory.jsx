import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarTop from './Navbar';
import axios from 'axios'; 

function AddResourceInventory() {
    const [formData, setFormData] = useState({
        inventoryId:'',
        resourceID: '',
        quantityAvailable: '',
        
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
            const response = await axios.post('https://afterschoolclub.azurewebsites.net/resourceInventory/create', formData);
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
                <div className="text-top mb-1 fs-2">Add Resource Inventory</div>
                <FloatingLabel controlId="inventoryId" label="Inventory ID" className="mb-3 label">
                    <Form.Control name="inventoryId" type="text" onChange={handleChange} placeholder="Enter Inventory ID" />
                </FloatingLabel>

                <FloatingLabel controlId="resourceName" label="Resource ID" className="mb-3 label">
                    <Form.Control name="resourceID" type="text" onChange={handleChange} placeholder="Enter Resource ID" />
                </FloatingLabel>

                <FloatingLabel controlId="quantity" label="Quantity Available" className="mb-3 label">
                    <Form.Control name="quantityAvailable" type="text" onChange={handleChange} placeholder="Enter Quantity Available" />
                </FloatingLabel>



                <Link to='/upload'>
                    <Button className='w-100 rounded-0 btn-white'>Upload</Button>
                </Link>
                <Button className='w-100 rounded-0 mt-3 btn-success' onClick={handleSubmit}>Submit</Button>
            </Form>
        </>
    );
}

export default AddResourceInventory;
