import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import NavbarTop from "./Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/addstudent.css";
import axios from "axios";
import { useParams } from "react-router-dom";
function AddComment() {
  const [formData, setFormData] = useState({
    name: "",
    comment: "",
    rating: 0,
  });

  const handleNameChange = (e) => {
    setFormData({
      ...formData,
      name: e.target.value,
    });
  };

  const handlesessionNameChange = (e) => {

    console.log(e.target.value);
    setFormData({
      ...formData,
      sessionID: e.target.value,
    });
  };
  const handleCommentChange = (e) => {
    setFormData({
      ...formData,
      comment: e.target.value,
    });
  };

  const handleStarClick = (ratingValue) => {
    setFormData({
      ...formData,
      rating: ratingValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post(
        "https://afterschoolclub.azurewebsites.net/sessionComments/create",
        formData
      );
      console.log("Response:", response.data);
      toast.success("Comment added successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to add comment");
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`bi bi-star${i <= formData.rating ? "-fill" : ""}`}
          onClick={() => handleStarClick(i)}
          style={{ cursor: "pointer", color: "red" }}
        ></i>
      );
    }
    return stars;
  };

  const [data, setdata] = useState([]);
  let { clubid } = useParams();

  const fetchsession = async () => {
    try {
      console.log("This is ClubId", clubid);

      const response = await axios.get(
        `https://afterschoolclub.azurewebsites.net/sessions/byClub/${clubid}`
      );
      setdata(response.data);

      console.log(response.data)
    } catch (error) {
      console.error("Error fetching session:", error.message);
      toast.error("Failed to fetch session");
    }
  };

  useEffect(() => {
    fetchsession();
  }, []);

  return (
    <>
      <NavbarTop />
      <Form
        className="px-4 py-4 formchild formlogin mx-auto"
        style={{ width: "40%" }}
        onSubmit={handleSubmit}
      >
        <div className="text-top mb-1 fs-2">Add Comment</div>

        {/* <FloatingLabel
          controlId="floatingInput"
          label="SessionName"
          className="mb-3 label"
        >
          <Form.Control
            className="border-0 border-bottom rounded-0 border-color"
            name="name"
            type="text"
            value={formData.sessionName}
            onChange={handlesessionNameChange}
            placeholder="Enter Your Name"
          />
        </FloatingLabel> */}

        <FloatingLabel controlId="sessionName" label="sessionName" className="mb-3">
          <Form.Select name="sessionName" onChange={handlesessionNameChange}>
            {data.map((session) => (
              <option key={session.id} value={session.id}>
                {session.sessionName}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Name"
          className="mb-3 label"
        >
          <Form.Control
            className="border-0 border-bottom rounded-0 border-color"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleNameChange}
            placeholder="Enter Your Name"
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingTextarea"
          label="Enter Your Comment"
          className="mb-3 label"
        >
          <Form.Control
            as="textarea"
            className="border-0 border-bottom rounded-0 border-color"
            name="comment"
            value={formData.comment}
            onChange={handleCommentChange}
            placeholder="Enter Your Comment"
          />
        </FloatingLabel>

        <Form.Label className="ms-3">Give Ratings</Form.Label>
        <br />
        <div className="text-center">{renderStars()}</div>

        <Button className="w-100 rounded-0 mt-3 btn-success" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default AddComment;
