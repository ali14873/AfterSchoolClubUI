import React, { useEffect, useState } from "react";

import { Row, Col, Container, Button, Card } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import UserProfileCard from "./UserProfileCard";
import { useParams } from "react-router-dom";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import { Link } from "react-router-dom";
import "./css/footclub.css";

import EventCalendarfootball from "./EventCalenderfootball";
import CalenderTable from "./CalenderTable";

const libraries = ["places"];

const Club = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD1ajp6njHPa2VFLQkLL6DkP8crqR20ioI",
    libraries: libraries,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([]);

  const [toggle, setToggle] = useState(true);



  const [map, setMap] = useState(null);
const[clubsinfo,setclubsData]=useState(null);
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
  const clubsData = [
    {
      id: 1,
      title: "Bordeaux Gateway",
      description: "4-6 Guests . Entire Home . 5 beds 3 baths",
      img: "https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_1280.jpg",
      lat: 40.72,
      lng: -74.01,
      price: "$100",
    },
  ];

  // Filter clubs based on search term
  const filteredClubs = clubsData.filter(
    (club) =>
      club.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onMapLoad = (map) => {
    setMap(map);
  };

  const onMarkerLoad = (marker) => {
    setMarkers((prevMarkers) => [...prevMarkers, marker]);
  };
  const [clicked, setClicked] = useState(false);

  
  const renderMap = () => {
    if (loadError) {
      return "Error loading Google Maps";
    } else if (!isLoaded) {
      return "Loading Google Maps...";
    } else {
      return (
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            maxHeight: "100vh",
            minHeight: "91vh",
          }}
          center={{ lat: 40.72, lng: -74.01 }}
          zoom={10}
          onLoad={onMapLoad}
        >
          {filteredClubs.map((club) => (
            <Marker
              key={club.id}
              position={{ lat: club.lat, lng: club.lng }}
              onLoad={onMarkerLoad}
              onClick={() => handleMarkerClick(club)}
            />
          ))}
        </GoogleMap>
      );
    }
  };

  const [firstLoad, setFirstLoad] = useState(true);

  // useEffect to handle page load and revisit
  useEffect(() => {
    if (firstLoad) {
      document.body.classList.remove("apply-css-rules");
    } else {
      document.body.classList.add("apply-css-rules");
    }
  }, [firstLoad]);

  useEffect(() => {
    setFirstLoad(false);

    fetchclubsinfo();


    fetchComments();
    fetchisclubmember();

    fetchCount();
    fetchAverage();
    
  }, []);


  const [showall, setshowall] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [userId, setuserId] = useState('122441');
  
  const [responsegetted, setresponsegetted] = useState('');

  const { clubid } = useParams();

  console.log(clubid);
  const handleHeartClick = async () => {
    // Toggle the heart fill state


    if(!userId)
    {
      window.alert("You Have To Login First To Become A Member");
    }
    else{
    let confirmed;

    if (isFilled) {
      confirmed = window.confirm("Would you like to Cancel Your Membership?");
    }

    if (!isFilled) {
      confirmed = window.confirm("Would you like to become a club member?");
    }
    setIsFilled(!isFilled);

    if (confirmed) {
      try {
        const data = {
          clubID: clubid,
          userID: "71c2265f-3cca-4cd4-b5e9-035343c53897",
          membershipStatus:"member"
        };

        if (isFilled) {
          const response=await axios.post(`https://afterschoolclub.azurewebsites.net/clubMember/delete/${clubid}`);
          console.log(response);
        
          console.log("User is now not a club member");
        } else {
          const response= await axios.post("https://afterschoolclub.azurewebsites.net/clubMember/create",data);
          console.log(response);


          setresponsegetted(response);

          console.log(responsegetted);
          console.log("User is now a club member");
        }
      } catch (error) {
        console.error("Error becoming a club member:", error.message);
        // Handle error, show error message, etc.
      }


    } else {
      // If the user canceled, revert the heart fill state
      setIsFilled(!isFilled);
    }

  }
  };







  const fetchisclubmember=async()=>{
    try {

      const response = await axios.get(`https://afterschoolclub.azurewebsites.net//clubMember/getByUserId/71c2265f-3cca-4cd4-b5e9-035343c53897`);
      console.log("This is the fetch member ",response)

      if(response.ok){
        setIsFilled(true);
      }
    } catch (error) {
      console.error("Error fetching clubs Member:", error.message);
      toast.error("Failed to fetch clubs Member");
    }
  }
  const fetchclubsinfo = async () => {


    try {

      const response = await axios.get(`https://afterschoolclub.azurewebsites.net/clubInfo/${clubid}`);
      console.log("This is the ",response)
      setclubsData(response.data);
    } catch (error) {
      console.error("Error fetching clubs:", error.message);
      toast.error("Failed to fetch clubs");
    }
  };

  
  const fetchsessioninfo = async () => {


    try {

      const response = await axios.get(`https://afterschoolclub.azurewebsites.net/sessions/byClub/${clubid}`);
      console.log("This is the ",response)
      setclubsData(response.data);
    } catch (error) {
      console.error("Error fetching clubs:", error.message);
      toast.error("Failed to fetch clubs");
    }
  };



  const [sessionIDS,setSessionIDS]=useState();


const[comments,setcomments]=useState([]);
  const fetchComments = async () => {
   
    try {

      const response = await axios.get(`https://afterschoolclub.azurewebsites.net/sessionComments/getAllByClubId/${clubid}`);
      console.log("This is the COmments ",response)

      setcomments(response.data);
    } catch (error) {
      console.error("Error fetching clubs:", error.message);
      toast.error("Failed to fetch clubs");
    }
  };


 

  const[count,setcount]=useState();
  const[avg,setavg]=useState();

const fetchCount = async () => {
   
  try {

    const response = await axios.get(`https://afterschoolclub.azurewebsites.net/sessionComments/countByClubId/${clubid}`);
    console.log("This is the count ",response)

    setcount(response.data);
  } catch (error) {
    console.error("Error fetching clubs:", error.message);
    toast.error("Failed to fetch clubs");
  }
};

const fetchAverage = async () => {
   
  try {

    const response = await axios.get(`https://afterschoolclub.azurewebsites.net/sessionComments/averageRatingByClubId/${clubid}`);
    console.log("This is the avg ",response)

    setavg(response.data);
  } catch (error) {
    console.error("Error fetching clubs:", error.message);
    toast.error("Failed to fetch clubs");
  }
};


  return (
    <>
      {/* <ToastContainer/> */}
      <Container className="footclubcontainer">
        <Row className="justify-content-between mx-1 align-items-center">
          <h1 style={{ fontSize: "30px", marginBottom: "0", color: "#333" }}>
             {clubsinfo&&clubsinfo.clubName}
          </h1>
          <Col xs="auto" className="mt-1">
            <div className="d-flex flex-wrap align-items-center">
              <i
                className="bi bi-star"
                style={{
                  fontSize: "20px",
                  color: "#DC2626",
                  marginRight: "5px",
                }}
              ></i>
              <span
                style={{ fontSize: "14px", color: "black", fontWeight: "bold" }}
              >
                {avg&&avg}
              </span>
              <span
                style={{ fontSize: "14px", color: "black", marginLeft: "3px" }}
              >
              </span>
              <span
                className="fw-bold text-decoration-underline ms-1"
                style={{ fontSize: "14px", color: "black" }}
              >
                {" "}
                
                { count} reviews
              </span>
              <img
                src="/badge.png"
                alt=""
                style={{ height: "18px", width: "18px", marginLeft: "5px" }}
              />
              <span
                style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  fontWeight: "500",
                  marginLeft: "5px",
                }}
              >
                <span className="text-decoration-underline">
                  {clubsinfo&&clubsinfo.location}
                </span>
              </span>
            </div>
          </Col>
          <Col xs="auto" className="text-end">
            <div className="d-flex align-items-center">
              <img
                src="/share.png"
                alt=""
                style={{ height: "18px", width: "18px", marginRight: "5px" }}
              />
              <span
                style={{
                  fontSize: "14px",
                  color: "#333",
                  marginRight: "15px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  const currentURL = window.location.href;

                  navigator.clipboard
                    .writeText(currentURL)
                    .then(() => {
                      console.log("URL copied to clipboard:", currentURL);

                      toast.success("Copied to Clipboard");

                      // Optionally, display a success message or perform other actions
                    })
                    .catch((error) => {
                      console.error("Failed to copy URL to clipboard:", error);
                      // Optionally, display an error message or perform other actions
                    });
                }}
              >
                Share
              </span>
              <i
                className={`bi bi-heart${isFilled ? "-fill " : ""}`}
                style={{
                  color: "red",
                  fontSize: "20px",
                  marginRight: "5px",
                  cursor: "pointer",
                }}
                onClick={handleHeartClick}
              ></i>
              <span style={{ fontSize: "14px", color: "#333" }}>
                Become A Member
              </span>
            </div>
          </Col>
        </Row>

        <Row>
          <img className="img-fluid mt-3" src="/grid.png" alt="" />
        </Row>

        <Row className="mt-5">
          <Col>
            <h1 style={{ fontSize: "24px" }}>{clubsinfo&&clubsinfo.clubName}</h1>
          </Col>
          <Col className="text-end">
            <img className="super img-fluid " src="super.png" alt="" />
          </Col>
        </Row>

        <hr />
       

        <span>

          {clubsinfo&&clubsinfo.description}
         
        </span>
        <br />
        <br />
        <br />

        <span>
          <span className=" text-decoration-underline"> Show more</span>
          <i className="bi bi-chevron-right fw-bold"></i>{" "}
        </span>
        <hr />

        <br />

        <h1 style={{ fontSize: "24px" }}>Upcoming sessions </h1>
        <p className="dates">Feb 19, 2022 - Feb 26, 2022</p>

        <Button
          className="btn-white border-black"
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          {toggle&&toggle ? "Show in Table" : "Show in Calender"}
        </Button>

        {toggle&&toggle ? <EventCalendarfootball clubid={clubid} /> : <CalenderTable setIDS={setSessionIDS} />}

        <br />
        <br />

        <Row>
          <Col>
            <i
              style={{ fontSize: "20px", color: "#DC2626", marginRight: "5px" }}
              className="bi bi-star-fill mb-1"
            ></i>
            <span
              className="fw-bold"
              style={{ fontWeight: "400", fontSize: "24px", color: "black" }}
            >
              {avg&&avg} 
            </span>
            <span
              className="fw-bold"
              style={{ fontSize: "24px", fontWeight: "400", color: "black" }}
            >
                           {" "}   { count&&count} {" "} reviews
            </span>
          </Col>

          <Col>
            <div className="text-end">
              <Link to={`/addcomment/${clubid}`}>
                <Button>Add Comment</Button>
              </Link>
            </div>
          </Col>
        </Row>
{/* 
        <Row>
          <Col md={6}>
            <UserProfileCard name="Joes" date="December 2021" />
          </Col>
          <Col md={6}>
            <UserProfileCard name="Joes" date="December 2021" />
          </Col>
        </Row>

       

        {showall ? (
          <Row>
            <Col md={6}>
              <UserProfileCard name="Joes" date="December 2021" />
            </Col>
            <Col md={6}>
              <UserProfileCard name="Joes" date="December 2021" />
            </Col>
          </Row>
        ) : (
          ""
        )}

        <Button
          onClick={() => {
            setshowall(!showall);
          }}
          className="btn-white border-black"
        >
          {showall ? "Hide" : "Show all 12 Reviews"}
        </Button> */}



        <Row>
        {comments&&comments.map((comment) => (

          <Col md={6}>
            <UserProfileCard name={comment.userID} comment={comment.comment} rating={comment.rating} date={comment.date} />
          </Col>
                ))}

        </Row>

      {/* Conditional rendering to show additional comments */}
      {showall && (
        <Row>
          {/* Assuming you have more comments to display */}
          <Col md={6}>
            <UserProfileCard name="Additional User" date="January 2022" />
          </Col>
          <Col md={6}>
            <UserProfileCard name="Another User" date="February 2022" />
          </Col>
        </Row>
      )}

      {/* Button to toggle showing all comments */}
      <Button
        onClick={() => {
          setshowall(!showall);
        }}
        className="btn-white border-black"
      >
        {showall ? "Hide" : "Show all Comments"}
      </Button>

        <hr />

        <h1 className="textwhere">Where you’ll be</h1>

        <Col className=" pt-1 darkmap">{renderMap()}</Col>

        <ToastContainer />
      </Container>
    </>
  );
};

export default Club;
