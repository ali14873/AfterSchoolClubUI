import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import ProgressBar from "react-bootstrap/ProgressBar";
import MyClubsCard from "./MyClubsCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// import NavbarTop from './Navbar';
const libraries = ["places"];

function MyClubs({ idss }) {
  const [searchTerm, setSearchTerm] = useState("");

  const [clubsData, setclubsData] = useState([]);
  useEffect(() => {
    fetchClubs();
  }, [idss]);
  const fetchClubs = async () => {
    try {
      const response = await axios.get(
        `https://afterschoolclub.azurewebsites.net/clubMember/getByUserId/${idss}`
      );
      const clubIds = response.data.map((club) => club.id); // Assuming club IDs are under 'id' key, adjust accordingly
      // Fetch details for each club
      const clubDetailsPromises = clubIds.map(async (clubId) => {
        try {
          const clubDetailsResponse = await axios.get(
            `https://afterschoolclub.azurewebsites.net/clubInfo/${clubId}`
          );
          return clubDetailsResponse.data;
        } catch (error) {
          console.error(
            `Error fetching club details for club ID ${clubId}:`,
            error.message
          );
          return null;
        }
      });

      const clubDetails = await Promise.all(clubDetailsPromises);
      console.log("Club Details:", clubDetails);
      setclubsData(clubDetails);
    } catch (error) {
      console.error("Error fetching clubs:", error.message);
      toast.error("Failed to fetch clubs");
    }
  };


  // Filter clubs based on search term
  const filteredClubs =
  clubsData &&
  clubsData.filter((club) => {
    // Check if club is not null and clubName is not null
    if (club && club.clubName) {
      return (
        club.clubName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return false; 
  });


  console.log("filteredClubs,", filteredClubs);
  const [clicked, setClicked] = useState(false);

 

  return (
    <>
      <Row className="justify-content-center mt-2 flex-row">
        <Col
          md={12}
          style={{ height: "100vh", overflowY: "auto" }}
          className=" hidescroll"
        >
          <div className="d-flex justify-content-between align-items-center pt-3">
            <div className="mx-3 mb-0 pt-3">
              <h1 className="trial">Clubs Enrolled</h1>
            </div>
            <InputGroup className="m-3 p-0 w-25">
              <Form.Control
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </div>
          <p className="mx-3 mb-3 mt-0">200+ Stays in Bordeaux</p>
          <Row>


            { 


filteredClubs?
              filteredClubs.map((club, index) => (
                <Col key={index} md={4} className="mb-3">
                  {club && club.clubName && (
                    <MyClubsCard key={club.id} club={club} index={index} />
                  )}
                </Col>
              ))
              :''
            
            
            
            
            }
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default MyClubs;
