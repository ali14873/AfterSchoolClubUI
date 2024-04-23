import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useEffect } from "react";
const EditModalBookSession = ({ onClose, childrens,selectedrow }) => {
  const [selectedChild, setSelectedChild] = useState();

 
  const handleSave = async () => {
    try {
      const data = {
        userID: selectedChild.id, // Assuming selectedChild is defined elsewhere
        bookingType: "Booked",
        sessionID: selectedrow, // Assuming sessionid is defined elsewhere
        status: "Booked", // Set an appropriate value for status
      };
  
      await axios.post("https://afterschoolclub.azurewebsites.net/sessionBookings/create", data);
      console.log("Booking successful");

      onClose();


  
    } catch (error) {
      console.error("Error booking session:", error.message);
      // Handle the error here, such as showing an error message to the user
    }
    
  };
 
  const [data, setdata] = useState([]);
  const fetchChilds = async () => {
    try {
      const response = await axios.get(
        `https://afterschoolclub.azurewebsites.net/studentParent/getStudentsByParent/d69fe904-e656-4908-af70-5af8366e705c`
      );
      setdata(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching session:", error.message);
    }
  };

  useEffect(() => {
    fetchChilds();
  }, []);
  return (
    <Modal show={true} onHide={onClose} className="complete-session-modal">
      <Modal.Header closeButton>
        <Modal.Title>Add childrens to Session</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Select Children:</Form.Label>
          <Form.Select className="pt-2"
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
          >
            <option value="">Select Child</option>
            {data &&
              data.map((child) => (
                <option key={child.id} value={child.id}>
                  {child.firstName}
                </option>
              ))}
          </Form.Select>
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

export default EditModalBookSession;
