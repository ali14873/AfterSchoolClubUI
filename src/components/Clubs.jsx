import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import ProgressBar from "react-bootstrap/ProgressBar";
import ClubCard from "./ClubCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// import NavbarTop from './Navbar';
const libraries = ["places"];

function Clubs() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD1ajp6njHPa2VFLQkLL6DkP8crqR20ioI",
    libraries: libraries,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([]);

  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map && markers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach((marker) => {
        bounds.extend(marker.position);
      });
      map.fitBounds(bounds);
    }
  }, [map, markers]);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  const getRandomLatitude = () => {
    return Math.random() * (90 - -90) + -90;
  };

  const getRandomLongitude = () => {
    return Math.random() * (180 - -180) + -180;
  };
  // const clubsData = [
    
  //   {
  //     id: "ad6189b5-e585-4f0f-8e48-4f130a5f4620",
  //     clubName: "football",
  //     description: "come play football with us",
  //     img: "https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_1280.jpg",

  //     location: "lordwood ",
  //     lat: 40.72,
  //     lng: -74.01,
  //   },

  //   {
  //     id: "ad6189b5-e585-4f0f-8e48-4f130a5f4620",
  //     clubName: "football",
  //     description: "come play football with us",
  //     img: "https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_1280.jpg",

  //     location: "lordwood ",
  //     lat: 40.72,
  //     lng: -74.01,
  //   }, {
  //     id: "ad6189b5-e585-4f0f-8e48-4f130a5f4620",
  //     clubName: "football",
  //     description: "come play football with us",
  //     img: "https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_1280.jpg",

  //     location: "lordwood ",
  //     lat: 40.72,
  //     lng: -74.01,
  //   }, {
  //     id: "ad6189b5-e585-4f0f-8e48-4f130a5f4620",
  //     clubName: "football",
  //     description: "come play football with us",
  //     img: "https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_1280.jpg",

  //     location: "lordwood ",
  //     lat: 40.72,
  //     lng: -76.01,
  //   }, {
  //     id: "ad6189b5-e585-4f0f-8e48-4f130a5f4620",
  //     clubName: "football",
  //     description: "come play football with us",
  //     img: "https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_1280.jpg",

  //     location: "lordwood ",
  //     lat: 40.72,
  //     lng: -79.01,
  //   }, {
  //     id: "ad6189b5-e585-4f0f-8e48-4f130a5f4620",
  //     clubName: "football",
  //     description: "come play football with us",
  //     img: "https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_1280.jpg",

  //     location: "lordwood ",
  //     lat: 40.72,
  //     lng: -78.01,
  //   },
    
    
  // ];

  const [clubsData,setclubsData]=useState([]);

  useEffect(() => {
    fetchclubs();
  }, []);



  const fetchclubs = async () => {


    try {

      const response = await axios.get("https://afterschoolclub.azurewebsites.net/clubInfo/getAll");
      console.log("This is the ",response)
      setclubsData(response.data);
    } catch (error) {
      console.error("Error fetching clubs:", error.message);
      toast.error("Failed to fetch clubs");
    }
  };

  // Filter clubs based on search term
  const filteredClubs = clubsData.filter(
    (club) =>
      club.clubName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onMapLoad = (map) => {
    setMap(map);
  };

  const onMarkerLoad = (marker) => {
    setMarkers((prevMarkers) => [...prevMarkers, marker]);
  };
  const [clicked, setClicked] = useState(false);



  

  return (
    <>
      {/* <NavbarTop /> */}

      <Row className="g-0">
        <Col
          md={7}
          style={{ height: "100vh", overflowY: "auto" }}
          className="pt-5 hidescroll"
        >
          <div className="d-flex justify-content-between align-items-center pt-3">
            <div className="mx-3 mb-0 pt-3 ">
              <h1 className="trial">All Clubs</h1>
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
          {filteredClubs.map((club, index) => (
            <ClubCard key={club.clubID} clubID={club.clubID} club={club} index={index} />
          ))}
        </Col>
       
      </Row>
    </>
  );
}

export default Clubs;
