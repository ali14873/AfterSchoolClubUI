import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
const EditModalAssignResources = ({
  name,
  id,
  onClose,
  data,
  setdata,
  formData1,
}) => {
  // Initialize status state for each attendee

  console.log("formData", formData1);
  // Function to handle status change for an attendee
  const handleStatusChange = (attendeeId, status) => {
    setdata((prevNamesData) => {
      return prevNamesData.map((attendee) => {
        if (attendee.id === attendeeId) {
          return { ...attendee, status: status };
        }
        return attendee;
      });
    });
  };
  const handleSave = async () => {
    try {
      const dataToSend = {
        resourceID: selectedResources,
        quantityAllocated: quantityAllocated,
        sessionID:formData1.id
      };

      console.log(dataToSend);
      const response = await axios.post(
        "https://afterschoolclub.azurewebsites.net/resourceAllocations/create",
        dataToSend
      );

      console.log("Response from backend:", response.data);

      onClose();
    } catch (error) {
      console.error("Error saving data:", error.message);
      // Handle error condition (e.g., show error message to the user)
    }
  };
  const [resources, setresources] = useState();

  const [selectedResources, setSelectedResources] = useState("");
  const [quantityAllocated, setQuantityAllocated] = useState("");

  // Event handler for checkbox changes
  const handleResourceChange = (e) => {
    const { value } = e.target;

    setSelectedResources(value);
  };

  // Event handler for QuantityAllocated input change
  const handleQuantityChange = (e) => {
    const { value } = e.target;
    setQuantityAllocated(value);
  };

  const fetchresource = async () => {
    try {
      const response = await axios.get(
        `https://afterschoolclub.azurewebsites.net/resources/getAll`
      );

      console.log(response);
      setresources(response.data);
    } catch (error) {
      console.error("Error fetching session:", error.message);
    }
  };

  useEffect(() => {
    fetchresource();
  }, []);
  return (
    <Modal show={true} onHide={onClose} className="complete-session-modal">
      <Modal.Header closeButton>
        <Modal.Title>Assign Resources</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>SessionID</Form.Label>
          <Form.Control
            type="text"
            name="sessionID"
            // onChange={handleChange}
            value={formData1 && formData1.id}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formResourceName">
          <Form.Label>Resource Name</Form.Label>
          <div>
            <Form.Select className="pt-2" name="selectedResources" id="selectResource" onChange={handleResourceChange}>
              <option value="">Select Resource...</option>
              {resources &&
                resources.map((resource) => (
                  <option key={resource.id} value={resource.resourceId}>
                    {resource.resourceName}
                  </option>
                ))}
            </Form.Select>
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>QuantityAllocated</Form.Label>
          <Form.Control
            type="text"
            onChange={handleQuantityChange}
            name="quantityAllocated"
            value={quantityAllocated}
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

export default EditModalAssignResources;
