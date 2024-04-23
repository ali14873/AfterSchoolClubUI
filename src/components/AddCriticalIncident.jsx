import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarTop from './Navbar';
import axios from 'axios'; 

function AddCriticalIncident() {
    const [formData, setFormData] = useState({
        reportedby: '',
        sessionId: '',
        incidentdate: '',
        incidenttype: '',
        description: '',
        actionTaken: '', // Changed from Actiontaken to actionTaken
        resolved: '',
        resolutiondetails: '',
        studentid:''
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
            const response = await axios.post('https://afterschoolclub.azurewebsites.net/criticalIncidents/create', formData);
            console.log('Response:', response.data);
            toast.success('Critical Incident Added successfully');
        } catch (error) {
            console.error('Error:', error.message);
            toast.error('Failed to add Critical Incident ');
        }
    };

    return (
        <>
            <NavbarTop />
            <Form className='px-4 py-4 formchild formlogin mx-auto' style={{ width: '40%' }}>
                <div className="text-top mb-1 fs-2">Add Critical Incident</div>

                <FloatingLabel controlId="reportedby" label="Reported By" className="mb-3 label">
                    <Form.Control name="reportedBy" type="text" onChange={handleChange} placeholder="Enter Reported By" />
                </FloatingLabel>

                <FloatingLabel controlId="studentId" label="Student ID" className="mb-3 label">
                    <Form.Control name="studentId" type="text" onChange={handleChange} placeholder="Enter Student ID" />
                </FloatingLabel>
                
                <FloatingLabel controlId="sessionId" label="Session ID" className="mb-3 label">
                    <Form.Control name="sessionId" type="text" onChange={handleChange} placeholder="Enter Session ID" />
                </FloatingLabel>
                <FloatingLabel controlId="incidentdate" label="Incident Date" className="mb-3 label">
                    <Form.Control name="incidentDate" type="date" onChange={handleChange} placeholder="Enter Incident Date" />
                </FloatingLabel>


                
                <FloatingLabel controlId="incidenttype" label="Incident Type" className="mb-3 label">
                    <Form.Control name="incidentType" type="text" onChange={handleChange} placeholder="Enter Incident Type" />
                </FloatingLabel>
                <FloatingLabel controlId="description" label="Description" className="mb-3 label">
                    <Form.Control name="description" type="text" onChange={handleChange} placeholder="Enter Description" />
                </FloatingLabel>
                <FloatingLabel controlId="actionTaken" label="Action Taken" className="mb-3 label">
                    <Form.Control name="actionTaken" type="text" onChange={handleChange} placeholder="Enter Action Taken" />
                </FloatingLabel>
                <FloatingLabel controlId="resolved" label="Resolved" className="mb-3 label">
                    <Form.Control name="resolved" type="text" onChange={handleChange} placeholder="Enter Resolved" />
                </FloatingLabel>
                <FloatingLabel controlId="resolutiondetails" label="Resolution Details" className="mb-3 label">
                    <Form.Control name="resolutionDetails" type="text" onChange={handleChange} placeholder="Enter Resolution Details" />
                </FloatingLabel>
                <Link to='/upload'>
                    <Button className='w-100 rounded-0 btn-white'>Upload</Button>
                </Link>
                <Button className='w-100 rounded-0 mt-3 btn-success' onClick={handleSubmit}>Submit</Button>
            </Form>
        </>
    );
}

export default AddCriticalIncident;
