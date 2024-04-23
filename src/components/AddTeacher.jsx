import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import NavbarTop from "./Navbar";
import axios from "axios";

function AddTeacher() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    roleType: "Admin",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log(formData);
      const response = await axios.post(
        "https://afterschoolclub.azurewebsites.net/teacher/create",
        formData
      );
      console.log("Response:", response.data);
      toast.success("Teacher added successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to add teacher");
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
        <div className="text-top mb-1 fs-2">Add Teacher</div>
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
        <FloatingLabel
          controlId="email"
          label="Email Address"
          className="mb-3 label"
        >
          <Form.Control
            name="email"
            type="email"
            onChange={handleChange}
            placeholder="Enter Email"
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="password"
          label="Password"
          className="mb-3 label"
        >
          <Form.Control
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Enter Password"
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="roleType"
          label="roleType"
          className="mb-3 label"
        >
          <Form.Select name="roleType" onChange={handleChange}>
            <option value="Admin">Admin</option>
            {/* <option value="Parent">Parent</option> */}
            <option value="Teacher">Teacher</option>
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel controlId="phone" label="Phone" className="mb-3 label">
          <Form.Control
            name="phone"
            type="text"
            onChange={handleChange}
            placeholder="Enter Phone"
          />
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

export default AddTeacher;
