import React, { useEffect, useState } from "react";

import ProfileComponent from "./ProfileComponent";
import MyClubs from "./MyClubs";
import AddCriticalIncidenttable from "./AddCriticalIncidenttable";
import AddHealthTable from "./AddHealthTable";
import AddEmergencyContactTable from "./AddEmergencyContactTable";
import CalenderTableProfile from "./CalenderTableProfile";
import Card from "react-bootstrap/Card";
import EventCalendarProfile from "./EventCalenderProfile";
import { Row, Col, Dropdown } from "react-bootstrap";

import axios from "axios";
const ProfilePage = () => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [idss, setIdss] = useState(null); // Define id state

const[userId,setuserId]=useState();
const [toggle, setToggle] = useState(false);
useEffect(()=>{


  const userId1=localStorage.getItem('userId');


  setuserId(userId1)
  console.log("This is the userId",userId);

  const roleType=localStorage.getItem('roleType');

  if(roleType==="Parent")
  {
    fetchparentdata()
  }

  if(roleType==="Teacher"||roleType==="Admin")
  {
    fetchteacherdata()
  }




},[userId])


  useEffect(() => {
    if (firstLoad) {
      document.body.classList.remove("apply-css-rules");
    } else {
      document.body.classList.add("apply-css-rules");
    }
  }, [firstLoad]);

  useEffect(() => {
    setFirstLoad(false);




  }, []);


  const[profiledata,setprofiledata]=useState();

  const fetchparentdata = async () => {
    try {
      const response = await axios.get(
        `https://afterschoolclub.azurewebsites.net/parent/getParent/${userId}`
      );
      setprofiledata(response.data);
      console.log("Parent",response.data);
    } catch (error) {
      console.error("Error fetching session:", error.message);
    }
  };

  const fetchteacherdata = async () => {
    try {
      const response = await axios.get(
        `https://afterschoolclub.azurewebsites.net/teacher/getTeacher/${userId}`
      );
      setprofiledata(response.data);
      console.log("Teacher",response.data);

    } catch (error) {
      console.error("Error fetching session:", error.message);
    }
  };

  const [selectedMenuItem, setSelectedMenuItem] = useState("myProfile");
 
  const renderSelectedComponent = () => {
    switch (selectedMenuItem) {
      case "myProfile":
        return <ProfileComponent profiledata={profiledata} />;
      case "myClubs":
        return <MyClubs idss={idss} />;
      case "mysessions":
        return (
          <div className="mx-3 ">
            <button
              onClick={() => {
                setToggle(!toggle);
              }}
              className="btn mt-4 mb-2 btnprofile btn-primary"
            >
              {toggle ? "Switch To Table" : "Switch To Calendar"}
            </button>
            {toggle ? <CalenderTableProfile idss={idss} /> : <EventCalendarProfile />}
          </div>
        );
      case "criticalIncidents":
        return (
          <div className="mx-5">
            <AddCriticalIncidenttable idss={idss} none={"none"} />
          </div>
        );
      case "healthrecord":
        return (
          <div className="mx-5">
            <AddHealthTable idss={idss} none={"none"} />;
          </div>
        );
      case "emergencycontact":
        return <AddEmergencyContactTable idss={idss}  none={"none"} />;
      default:
        return null;
    }
  };

  const handleMenuItemSelect = (menuItem, id) => {
    console.log(id);
    setIdss(id);
    setSelectedMenuItem(menuItem);
  };
  
  const [data, setdata] = useState([]);
  const fetchChilds = async () => {
    try {
      const response = await axios.get(
        `https://afterschoolclub.azurewebsites.net/studentParent/getStudentsByParent/${userId}`
      );
      setdata(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching session:", error.message);
    }
  };

  useEffect(() => {
    fetchChilds();
  }, []);

  return (
    <div>
      <div
        className=" headerprofilepage "
        style={{
          display: "flex",
          marginTop: "90px ",
          alignItems: "end",
          flexWrap: "wrap",
        }}
      >
        <div style={{ marginRight: "10px" }}>
          <button
            className="btn btnprofile btn-primary"
            onClick={() => setSelectedMenuItem("myProfile")}
          >
            My Profile
          </button>
        </div>

        <div style={{ marginRight: "10px" }}>
          <Dropdown>
            <Dropdown.Toggle className="btn btnprofile btn-primary">
              My Clubs{" "}
            </Dropdown.Toggle>

            <Dropdown.Menu>
            
              {data.map((child) => (
                <Dropdown.Item
                  key={child.id}
                  onClick={() => handleMenuItemSelect("myClubs",child.id)}

                >
                  {child.firstName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div style={{ marginRight: "10px" }}>
          <Dropdown>
            <Dropdown.Toggle className="btn btnprofile btn-primary">
              My Sessions
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {data.map((child) => (
                <Dropdown.Item
                  key={child.id}
                  onClick={() => handleMenuItemSelect("mysessions",child.id)}

                >
                  {child.firstName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div style={{ marginRight: "10px" }}>
          <Dropdown>
            <Dropdown.Toggle className="btn btnprofile btn-primary">
              Critical Incidents
            </Dropdown.Toggle>

            <Dropdown.Menu>
             

              {data.map((child) => (
                <Dropdown.Item
                  key={child.id}
                  onClick={() => handleMenuItemSelect("criticalIncidents",child.id)}
                >
                  {child.firstName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div style={{ marginRight: "10px" }}>
          <Dropdown>
            <Dropdown.Toggle className="btn btnprofile btn-primary">
              Health Record
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {/* Menu items */}

            
            


              {data.map((child) => (
                <Dropdown.Item
                  key={child.id}
                  onClick={() => handleMenuItemSelect("healthrecord",child.id)}
                >
                  {child.firstName}
                </Dropdown.Item>
              ))}
             
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div style={{ marginRight: "10px" }}>
          <Dropdown>
            <Dropdown.Toggle className="btn btnprofile btn-primary">
              Emergency Contact
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {/* Menu items */}
            

              {data.map((child) => (
                <Dropdown.Item
                  key={child.id}
                  onClick={() => handleMenuItemSelect("emergencycontact",child.id)}
                >
                  {child.firstName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <Row>
        <Col md={3} className="d-flex justify-content-center">
          <Card className="m-4 shadow border-0">
            <Card.Body>
              {/* Profile Image */}

              <div className="w-100 d-flex justify-content-center ">
                <img
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                  }}
                  className="rounded-circle "
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAACUCAMAAADyHdbUAAAAMFBMVEXk5ueutLersbTn6erq7O2zuLu4vcDg4+TGysyorrLU19m7wMLLz9HBxcjZ3N3Q1NUSeXufAAAEhklEQVR4nO2c0ZarIAxFJREQEPj/v71o29HO2FYgNriu+7FP50iA0BC67uLi4uLi4uLi4uLi4hAwwa2hFEQd4piIMWhuMZmg1nZQYBZADVbr7hSjgRiiFwZArAEA6WNoP6CS/PTtn8UvJpRv3QIGJ7bV3z1Ir3tuka/Bzr/4+OthGJodA7Rvv/5iIXAr3QT1YHbInzCDbm8UUvTv+fz3QXDNDQIGtV//NJlDY2MQMtTPDkRbDsLe8F8wDc0DLNCfBqGZMcDc+LkjG5nJqFWZAVCNRJHPWX+eHAzc0icwlupPDiy3+mkClOtPDho46mRswBsGFHduirFkBV0wlnkeY5X8hOQ10I81ATQzsgYRylr9QrHqH6oHIA0BZxAV7sFrwPMtpWjrIyjBmNRRRJCAkU1/3insJYorhtBSyE+bGVtaXb8JzLDFkC7Oo38ZcEyzWJOsQRM8+ruqRHqNYZrFti4RXRlgOteQ7AITMLAkdEg0hxOOJyMlSITuSB4DZIuQEDwG6PQDz0ZANgWEuQz8nwbI9HPNgdOvQqc3cPaNjC6VAM8zAkQHsrQIMf01RJdOMx2K9dkPNKc/UpId6j3Tob6mOraG60RZXB/+A9sfW7qqPvYAHNvf0yTlAQF8BQIMFOsQ580bJIgh8Gzyp/+nCWKItdCK9RmpY5RfelPoichcKJaVQaS4b9zoyqsG7Lc9sOpUYHj+1n1CV1T6gLVM/6CmWNzErbmKIOKrED+Brkw+6x78BBatpW1MgDsFDkC11MyRvxQ1c2n0BuY6SKeYlvR3uacz41vTn9jdwDFtwNxit+j3X16x/AnEFqjf92DdANFc+C9gdB/7sBzzAeA9qKMyry2AcbHdz38DtXWwOZ3BgDtHXyvqUZrf4wAgm//4C9h3dlDykWdLqQaL/Wnk3+j7TgebCCEZanPdfAdiUv3DiTrTcQoVHYKN4/Bg6ku3af7i5IRb4BumQAlxcCn45d9jZvpNOT82G0/ps0cnYUc/sZj661saiSRFh/kNgA/aVzuCkb6RRwLmxxe8fLP7vjQBbrSB2QOm5d6Jj2Hz0kSKpsgYTX0YpqgvVH+zkDx4y2IBe+vErh76z8jx6xZS7EiqiwYJA9/tsk9JsyCUPwEwhG95mJNNWvk3C/4raxJ28dXTI9UW5HB8wRKtIpq5LywcOwjYFf6Pu9+CCAdmShjzd9xszGF/WiDV9ZoPgDzm9grG2oLkfgsH7ArY+QMn7x8HinomFD+9UOpARlIHGL4WPj8WKN9R2vnyES3Gk20JGBn0z43GNA4I+uYLHdBUodj0E9WhGPXPbaK1DlL8c1JdCyfqmq9wUFlNq7mKQuSg6lImxa3EaioOOX1G5fQwQBQbILjRRwGU97pyS78DhXVN9NzKH8ii0iD7CrpQmJl+5wC5i5L74VTPdpBQsiHTNDdQUfDGahtL6IP8xz+a2INXZF9RrrwSTU7u0xM03TGk5MVQ35z+zBf1yN59oSPrUcO+mSxiISufIHj/jp6cGCLpD6MmYx1iPslvk7OX9QO32i22X3P7B3xQPIiAQmPTAAAAAElFTkSuQmCC"
                  alt="Profile"
                />
              </div>
              {/* Profile Details */}
              <h4 style={{ color: "grey" }} className="mt-3 text-center mb-2">
                Name:{profiledata&&profiledata.firstName + profiledata.lastName}
              </h4>
              <p className="text-center" style={{ color: "grey" }}>
                Email: {profiledata&&profiledata.email}
              </p>

              <p className="text-center" style={{ color: "grey" }}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis
                nisi, ipsa a amet blanditiis at, facilis architecto delectus non
                ex .
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col className="flex-1 overflow-x-auto">
          {renderSelectedComponent()}
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
