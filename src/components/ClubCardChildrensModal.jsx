import React, { useState } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
function ClubCardChildrensModal({ show, setShow, childs,clubID }) {


    console.log(clubID);
    const [selectedchild,setselectedchild]=useState();
  const handleChange = (e) => {


    const { name, value } = e.target;

    setselectedchild(e.target.value)

  };


  console.log("These are childs",childs);
  const handleSave = async () => {
    try {

        const data = {
            clubID: clubID, 
            userID: selectedchild,
            membershipStatus: 'member'
          };
      const response = await axios.post(

        'https://afterschoolclub.azurewebsites.net/clubMember/create',data
      );
      console.log("Response:", response.data);
      toast.success("Club updated successfully");

      setShow(false)
    } catch (error) {
      console.error("Error:", error.message);
      
      toast.error("Failed to update club");
    }
  };

  return (

    <>
    <ToastContainer/>

    <Modal show={show} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Club Childrens</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FloatingLabel controlId="gender" label="Childrens" className="mb-3">
            <Form.Select name="childrens" onChange={handleChange}>
              {childs&&childs.map((child) => {
                return(

                <option value={child.id}>{child.firstName}</option>

                )
              })}
            </Form.Select>
          </FloatingLabel>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setShow(false);
          }}
        >
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
    
    
    
    
    </>
   
  );
}

export default ClubCardChildrensModal;
