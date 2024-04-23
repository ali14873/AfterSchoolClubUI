import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ClubCardChildrensModal from "./ClubCardChildrensModal";
const MyClubsCard = ({ club, index }) => {
  const [clicked, setClicked] = useState(false);
  const [modalShow, setModalShow] = useState(false);


  console.log("club,",club);
  const toggleHeart = () => {
    if (clicked) {
      if (window.confirm("Would You Like to Cancel Your Membership?")) {
        setClicked(false);
      }
    } else {
      if (window.confirm("Would You Like to Become a Member?")) {
        setClicked(true);
      }
    }
  };

  return (
    <>
    
      <Card
        key={club.id}
        className={`m-2 rounded-2 ${index !== -1 ? "border" : "nobordertop"}`}
      >
        <Row className="g-0">
          <Col md={12} style={{ height: "270px" }}>
            <Link
              to={`/footballclub/${club.id}`}
              style={{ textDecoration: "none" }}
            >
              <img
                src={club.img}
                className=" w-100 h-100 rounded-5 img-fluid p-3 "
                alt="..."
              />
            </Link>
          </Col>

          <Col md={12}>
            <Card.Body className="m-0 mx-1 px-lg-0">
              <Row className="justify-content-between w-100">
                <Col>
                  <Card.Text style={{ textWrap: "nowrap" }}>
                    Entire Home in Bordeaux
                  </Card.Text>
                </Col>
                <Col
                  className="text-lg-end  text-sm-end text-md-start text-end"
                  onClick={toggleHeart}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill={clicked ? "red" : "#F8F9FA"}
                    stroke={clicked ? "red" : "black"}
                    strokeWidth="0.05"
                    className="bi bi-heart-fill ms-4"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                    />
                  </svg>
                </Col>
              </Row>
              <Card.Title className="pt-2">{club&&club.clubName}</Card.Title>
              <hr className="w-25" />
              <Card.Text>{club.description}</Card.Text>
              <hr className="w-25" />
              <div>
                5.0{" "}
                <i style={{ color: "orange" }} className="bi bi-star-fill"></i>{" "}
                (318 reviews)
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default MyClubsCard;
