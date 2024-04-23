import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ClubCardChildrensModal from "./ClubCardChildrensModal";
import axios from "axios";
const ClubCard = ({ club, index, key, clubID }) => {
  const [clicked, setClicked] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [childsget, setchildsget] = useState([]);

  console.log("This is the CLUB ID", clubID);
  const [userId, setuserId] = useState();
  useEffect(() => {
    const idd = localStorage.getItem("userId");
    setuserId(idd);
  }, [userId]);
  const toggleHeart = async () => {
    if (clicked) {
      if (window.confirm("Would You Like to Cancel Your Membership?")) {
        setClicked(false);
      }
    } else {
      if (window.confirm("Would You Like to Become a Member?")) {
        setClicked(true);

        try {
          const response = await axios.get(
            `https://afterschoolclub.azurewebsites.net/studentParent/getStudentsByParent/${userId}`
          );
          console.log("Response:", response.data);
          setClicked(true);

          setchildsget(response.data);

          setShow(true);
        } catch (error) {
          console.error("Error:", error.message);

          setClicked(false);
        }
      }
    }
  };

  console.log(club);

  const [count, setcount] = useState();
  const [avg, setavg] = useState();

  const fetchCount = async () => {
    try {
      const response = await axios.get(
        `https://afterschoolclub.azurewebsites.net/sessionComments/countByClubId/${clubID}`
      );
      console.log("This is the count ", response);

      setcount(response.data);
    } catch (error) {
      console.error("Error fetching clubs:", error.message);
    }
  };

  const fetchAverage = async () => {
    try {
      const response = await axios.get(
        `https://afterschoolclub.azurewebsites.net/sessionComments/averageRatingByClubId/${clubID}`
      );
      console.log("This is the avg ", response);

      setavg(response.data);
    } catch (error) {
      console.error("Error fetching clubs:", error.message);
    }
  };

  useEffect(() => {
    fetchAverage();
    fetchCount();
  }, []);

  return (
    <>
      <ClubCardChildrensModal
        show={show}
        childs={childsget}
        clubID={club.clubID}
        setShow={setShow}
      />
      <Card
        key={club.clubID}
        className={`m-3 rounded-2 ${index !== -1 ? "border" : "nobordertop"}`}
      >
        <Link to={`/club/${club.clubID}`} style={{ textDecoration: "none" }}>
          <Row className="g-0">
            <Col md={6} style={{ height: "270px" }}></Col>

            <Col md={6}>
              <Card.Body className="m-0 px-lg-0">
                <Row className="justify-content-between w-100">
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
                <Card.Title className="pt-2">{club.clubName}</Card.Title>
                <hr className="w-25" />
                <Card.Text>{club.description}</Card.Text>
                <hr className="w-25" />
                <div>
                  {count && count}{" "}
                  <i
                    style={{ color: "orange" }}
                    className="bi bi-star-fill"
                  ></i>{" "}
                  {avg && avg} reviews
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Link>
      </Card>
    </>
  );
};

export default ClubCard;
