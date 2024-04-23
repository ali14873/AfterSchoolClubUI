import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
const EditModalAddTeacherSession = ({ onClose }) => {
  const [role, setRole] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');

  const handleTeacherSelection = (event) => {
    const selectedId = event.target.value;
    setSelectedTeacher(selectedId);
  };

  const handleRoleChange = (event) => {
    const roleValue = event.target.value;
    setRole(roleValue);
  };


  const[teachers,setteacher]=useState();



const fetchsessionteacher = async () => {
    try {
      const response = await axios.get(
        `https://afterschoolclub.azurewebsites.net/teacher/getAll`
      );
  
      console.log("This is Data",response);

      setteacher(response.data);

    } catch (error) {
      console.error("Error fetching session:", error.message);
    }
  };




  const handleSave =async () => {

    const formData={
      staffID:selectedTeacher,
      role:role

    }
    try {
      const response = await axios.post(
        "https://afterschoolclub.azurewebsites.net/sessionStaff/create",
        formData
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error.message);
    
    }    onClose();
  };

  useEffect(()=>{
fetchsessionteacher();
  },[])

  return (
    <Modal show={true} onHide={onClose} className="complete-session-modal">
      <Modal.Header closeButton>
        <Modal.Title>Add Teachers to Session</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Select Teachers:</Form.Label>
          <Form.Select
        as="select" className="pt-2"
        
        onChange={handleTeacherSelection}
      >
        {teachers && teachers.map((teacher) => (
          <option key={teacher.id} value={teacher.id}>{teacher.firstName}</option>
        ))}
      </Form.Select>
        </Form.Group>


        <Form.Group>

        <Form.Label>Role</Form.Label>

        <Form.Control
        type="text"
        placeholder="Enter role..."
        value={role}
        onChange={handleRoleChange}
      />



        </Form.Group>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModalAddTeacherSession;
