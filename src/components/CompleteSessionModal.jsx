import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
const CompleteSessionModal = ({
  name,
  id,
  selectedRow,
  onClose,
  data,
  setdata,
}) => {
  // Initialize status state for each attendee

  console.log("Thiss", selectedRow.id);
  const [data1, setdata1] = useState();

  const[userIdArray,setUserIdArray]=useState();
  const fetchSessionBookingsByUser = async (userId) => {
    try {
      const response = await axios.get(
        `https://afterschoolclub.azurewebsites.net/sessionBookings/byUser/${userId}`
      );
      console.log("Session bookings for user", userId, ":", response.data);
      // Process the response data as needed
    } catch (error) {
      console.error(
        "Error fetching session bookings for user",
        userId,
        ":",
        error.message
      );
    }
  };

  const fetchsession = async () => {
    try {
      const response = await axios.get(
        `https://afterschoolclub.azurewebsites.net/sessionBookings/studentsBySession/2fad7160-3081-4c68-939c-44981fa35196`
      );

      console.log("This is Data", response.data);

      const userIds = response.data.map((session) => session.id);
      console.log("UserIds", userIds);

      // Iterate over userIds and fetch session bookings for each userId
      userIds.forEach((userId) => fetchSessionBookingsByUser(userId));

      setdata1(response.data);
      setdata(response.data);
      setUserIdArray(userIds); 
    } catch (error) {
      console.error("Error fetching session:", error.message);
    }
  };

  // Call fetchSession to initiate the process

  // Function to handle status change for an attendee
  const handleStatusChange = (attendeeId, status) => {
    setdata((prevNamesData) => {
      return prevNamesData.map((attendee) => {
        if (attendee.id === attendeeId) {
          const index = prevNamesData.findIndex((attendee) => attendee.id === attendeeId);
          const bookingId = userIdArray[index % userIdArray.length];
          return {
            bookingId,
            attendanceStatus: status,
            userId: attendee.id,
            sessionId: selectedRow.id,
          };
        }
        return attendee;
      });
    });
  };


  
  console.log("Prev", data);



  const handleSave =async () => {
    try {
      const response = await axios.post(`https://afterschoolclub.azurewebsites.net/Attendance/create`, data);
      console.log("data1",data);
      console.log('Response:', response.data);
      
      onClose();
    } catch (error) {
      console.error('Error:', error.message);
  }

  };

  useEffect(() => {
    fetchsession();
  }, []);

  return (
    <Modal show={true} onHide={onClose} className="complete-session-modal">
      <Modal.Header closeButton>
        <Modal.Title>All Attendees for Session</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {data1 &&
          data1.map((attendee) => (
            <div key={attendee.id} className="attendee-status">
              <span className="attendee-name">{attendee.firstName}</span>
              <Form.Select
                id={`status_${attendee.id}`}
                value={attendee.attendanceStatus}
                className="selectcomplete"
                name="attendanceStatus"
                onChange={(e) =>
                  handleStatusChange(attendee.id, e.target.value)
                }
              >
                <option value="attended">Attended</option>
                <option value="notattended">Not Attended</option>
                <option value="late">Late</option>
              </Form.Select>
            </div>
          ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save and Next
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CompleteSessionModal;
