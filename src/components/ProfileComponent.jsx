import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function ProfileComponent({profiledata}) {
  return (
<Form className="formprofile   mx-auto shadow p-5 mt-4 rounded-2">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Edit Profile</h1>
       
      </div>

      <Row className="mb-3 mt-2 ">
        <Form.Group as={Col} controlId="formGridFirstName">
          <Form.Label style={{color:'black',fontWeight:"bold"}}>First Name</Form.Label>
          <Form.Control value={profiledata&&profiledata.firstName} className="border-black fields rounded-1" type="text" placeholder="Enter first " />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridLastName">
          <Form.Label style={{color:'black',fontWeight:"bold"}}>Last Name</Form.Label>
          <Form.Control value={profiledata&&profiledata.lastName} className="border-black fields rounded-1" type="text" placeholder="Enter last name" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress">
        <Form.Label style={{color:'black',fontWeight:"bold"}}>Email</Form.Label>
        <Form.Control value={profiledata&&profiledata.email} disabled className="border-black fields rounded-1" type="email" placeholder="Enter Your Email" />
      </Form.Group>

      
      <Form.Group className="mb-3" controlId="formGridAddress">
        <Form.Label style={{color:'black',fontWeight:"bold"}}>Contact Number</Form.Label>
        <Form.Control value={profiledata&&profiledata.phone} className="border-black fields rounded-1" placeholder="Enter Your Contact" />
      </Form.Group>

      

     

      <Row className="mb-3">
        <Col className="d-flex ">
          {/* <Button
            variant="warning"
            className="w-25 rounded-1"
            type="button"
            style={{
              color: "orange",
              backgroundColor: "white",
              border: "2px solid orange",
            }}
          >
            Cancel
          </Button> */}
          <Button
            variant="primary"
            className="w-25  rounded-1"
            type="submit"
            style={{ backgroundColor: "orange", border: "2px solid orange" }}
          >
            Edit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default ProfileComponent;
