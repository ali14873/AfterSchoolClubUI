import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarTop from "./Navbar";
import axios from "axios";

function AddStudent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    yearGroup: "1",
    gender: "Male",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:8080/students/create",
        formData
      );
      console.log("Response:", response.data);
      toast.success("Student added successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to add student");
    }
  };

  return (
    <>
      <ToastContainer />
      <NavbarTop />
      <Form
        className="px-4 py-4 formchild formlogin mx-auto"
        style={{ width: "40%" }}
      >
        <div className="text-top mb-1 fs-2">Add Student</div>
        <FloatingLabel
          controlId="firstName"
          label="First Name"
          className="mb-3 label"
        >
          <Form.Control
            name="firstName"
            type="text"
            onChange={handleChange}
            placeholder="Enter First Name"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="lastName"
          label="Last Name"
          className="mb-3 label"
        >
          <Form.Control
            name="lastName"
            type="text"
            onChange={handleChange}
            placeholder="Enter Last Name"
          />
        </FloatingLabel>
        <Form.Group className="mb-3" controlId="dob">
          <Form.Label className="dob">Date Of Birth</Form.Label>
          <Form.Control
            name="dob"
            type="date"
            onChange={handleChange}
            placeholder="Enter Date of Birth"
          />
        </Form.Group>
        <FloatingLabel
          controlId="yearGroup"
          label="Year Group"
          className="mb-3"
        >
          <Form.Select name="yearGroup" onChange={handleChange}>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            <option value="4">Four</option>
            <option value="5">Five</option>
            <option value="6">Six</option>


          </Form.Select>
        </FloatingLabel>
        <FloatingLabel controlId="gender" label="Gender" className="mb-3">
          <Form.Select name="gender" onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Form.Select>
        </FloatingLabel>
        <Link to="/upload">
          <Button className="w-100 rounded-0 btn-white">Upload</Button>
        </Link>
        <Button
          className="w-100 rounded-0 mt-3 btn-success"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form>
    </>
  );
}

export default AddStudent;
