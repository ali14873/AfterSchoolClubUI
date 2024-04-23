import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const UserProfileCard = ({ name, date, comment, rating }) => {
  // Function to generate stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    // Loop to generate stars
    for (let i = 0; i < rating; i++) {
      stars.push(
        <i
          key={i}
          style={{ fontSize: "20px", color: "#DC2626", marginRight: "5px" }}
          className="bi bi-star-fill mb-1"
        ></i>
      );
    }
    return stars;
  };

  return (
    <Card className="border-0">
      <Card.Body className="d-flex rounded-circle">
        <Col md={2}>
          <div className="profile-picture rounded-circle">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="rounded-circle w-50 h-75 img-fluid"
            />
          </div>
        </Col>

        <Col md={4}>
          <div className="profile-info">
            <span className="name">{name}</span>
            <br />
            <span>{date}</span>
          </div>
        </Col>
      </Card.Body>
      <div className="d-flex">
      
      {renderStars(rating)}
      </div>
    </Card>
  );
};

export default UserProfileCard;
