import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

const NavbarTop = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };


  const[roleType,setroleType]=useState();

  useEffect(()=>{



    const role=localStorage.getItem('roleType');


    setroleType(role)




  },[])
  return (
      <div>
        <Navbar expand="lg" className="bg-body-tertiary fixed-top">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Club
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mx-auto">


                {

                  roleType==="Admin"?
                      <NavDropdown title="Create" id="basic-nav-dropdown">

                        <NavDropdown.Item as={Link} to="/addparents">
                          Add Parent
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/addstudent">
                          Add Student
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/addallergy">
                          Add Allergy
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/addclub">
                          Add Club
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/addclubcalender">
                          Add Club Calendar
                        </NavDropdown.Item>

                        <NavDropdown.Item as={Link} to="/addemergencycontact">
                          Add Emergency Contact
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/addhealth">
                          Add Health
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/addresource">
                          Add Resource
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/addresourceinventory">
                          Add Resource Inventory
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/addstudentparentrelation">
                          Add Student Parent Relation
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/addteacher">
                          Add Teacher
                        </NavDropdown.Item>

                        <NavDropdown.Item as={Link} to="/addcritical">
                          Add Critical Incident
                        </NavDropdown.Item>
                      </NavDropdown>:''
                }
                {                roleType==="Admin"?

                    <NavDropdown title="Edit" id="basic-nav-dropdown">

                      <NavDropdown.Item as={Link} to="/addparenttable">
                        Edit Parent
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/addstudenttable">
                        Edit Student
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/addallergytable">
                        Edit Allergy
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/addclubtable">
                        Edit Club
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/addemergencycontacttable">
                        Edit Emergency Contact
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/addhealthtable">
                        Edit Health
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/addresourcetable">
                        Edit Resource
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/addresourceinventorytable">
                        Edit Resource Inventory
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/addstudentparentrelationtable">
                        Edit Student Parent Relation
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/addteachertable">
                        Edit Teacher
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/addcriticaltable">
                        Edit Critical Incident
                      </NavDropdown.Item>
                    </NavDropdown>:''
                }
                {                roleType==="Admin"?
                    <NavDropdown title="View" id="basic-nav-dropdown">
                      <NavDropdown.Item as={Link} to="/addstudenttable">
                        {" "}
                        Student
                      </NavDropdown.Item>

                      <NavDropdown.Item as={Link} to="/addparenttable">
                        {" "}
                        Parent
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/addallergytable">
                        {" "}
                        Allergy
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/addclubtable">
                        {" "}
                        Club
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/addemergencycontacttable">
                        {" "}
                        Emergency Contact
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/addhealthtable">
                        {" "}
                        Health
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/addresourcetable">
                        {" "}
                        Resource
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/addresourceinventorytable">
                        {" "}
                        Resource Inventory
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/addstudentparentrelationtable">
                        {" "}
                        Student Parent Relation
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/addteachertable">
                        {" "}
                        Teacher
                      </NavDropdown.Item>

                      <NavDropdown.Item as={Link} to="/addcriticaltable">
                        Critical Incident
                      </NavDropdown.Item>
                    </NavDropdown>:''


                }

                <Nav.Link as={Link} to="/club">
                  {" "}
                  View All Clubs
                </Nav.Link>

                <Nav.Link as={Link} to="/profilepage">
                  Profile
                </Nav.Link>



                {roleType==="Admin"?
                    <Nav.Link as={Link} to="/analytics">
                      Analytics
                    </Nav.Link>:''


                }
              </Nav>

              <Nav>
                <Nav.Link as={Link} to="/">
                  Login
                </Nav.Link>


                <button
                    onClick={toggleDarkMode}
                    style={{ width: "50px" }}
                    className="btn border-0  mt-1 btn-primary"
                >
                  {darkMode === false ? (
                      <i class="bi bi-brightness-high-fill"></i>
                  ) : (
                      <i class="bi bi-moon-stars"></i>
                  )}
                </button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
  );
};

export default NavbarTop;