import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import FloatingLabel from "react-bootstrap/FloatingLabel";

import { useNavigate } from "react-router-dom";
import App from "../App.css";
import { Link } from "react-router-dom";

import axios from "axios";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (!formData.email || !formData.password) {
      toast.error("Please Fill All The Fields!");
      return;
    }

    const Username=formData.email;
    const Password=formData.password;
    try {
        const response = await axios.post("https://afterschoolclub.azurewebsites.net/auth/login", {
          Username: formData.email,
          Password: formData.password,
        }, {
          headers: {
            Authorization: `Basic ${btoa(`${Username}:${Password}`)}`
          }
        });


      
        localStorage.setItem("authToken", response.data.accessToken);

        localStorage.setItem("userId",response.data.userId);
        localStorage.setItem("roleType",response.data.roleType)



        toast.success("Login successful");

        navigate('/profilepage')
      } catch (err) {
        console.error("API Error:", err.response.data);
        toast.error("An error occurred. Please try again later.");
      }
      
      
  };
  return (
    <>
      <ToastContainer />
      <Form
        className="shadow px-4 py-4 my-1  formlogin mx-auto"
        onSubmit={handleSubmit}
        style={{ width: "40%" }}
      >
        <div className="text-top mb-1  fs-2 text-center">Login</div>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control
            name="email"
            type="email"
            onChange={handleChange}
            placeholder="Enter Your Email"
          />
        </FloatingLabel>
        <FloatingLabel
          className="mb-3"
          controlId="floatingPassword"
          label="Password"
        >
          <Form.Control
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Password"
          />
        </FloatingLabel>
        <Button type="submit" className="w-100 signup">
          Log In
        </Button>
      
      </Form>
    </>
  );
};

export default Login;
