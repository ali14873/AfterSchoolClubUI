import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Pagination from "react-bootstrap/Pagination";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { DropdownButton, Dropdown } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import "./css/addstudent.css";
import NavbarTop from "./Navbar";
import EditModal from "./EditModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddStudentTable = () => {
  // const data = [
  //   { id: 1, firstName: 'John', lastName: 'Smith', dateOfBirth: '1990-05-15', yearGroup: '1999', gender: 'Male' },
  //   { id: 2, firstName: 'Emily', lastName: 'Johnson', dateOfBirth: '1985-08-20', yearGroup: '1996', gender: 'Female' },
  //   { id: 3, firstName: 'Michael', lastName: 'Williams', dateOfBirth: '1993-11-10', yearGroup: '1992', gender: 'Male' },
  //   { id: 4, firstName: 'Sarah', lastName: 'Brown', dateOfBirth: '1988-03-25', yearGroup: '1993', gender: 'Female' },
  //   { id: 5, firstName: 'David', lastName: 'Jones', dateOfBirth: '1997-09-05', yearGroup: '1996', gender: 'Male' },
  //   { id: 6, firstName: 'Jessica', lastName: 'Davis', dateOfBirth: '1999-12-18', yearGroup: '1998', gender: 'Female' },
  //   { id: 7, firstName: 'Matthew', lastName: 'Wilson', dateOfBirth: '1991-06-30', yearGroup: '2000', gender: 'Male' },
  //   { id: 8, firstName: 'Samantha', lastName: 'Miller', dateOfBirth: '1983-10-12', yearGroup: '1994', gender: 'Female' },
  //   { id: 9, firstName: 'Christopher', lastName: 'Taylor', dateOfBirth: '1995-02-08', yearGroup: '1997', gender: 'Male' },
  //   { id: 10, firstName: 'Ashley', lastName: 'Martinez', dateOfBirth: '1989-07-04', yearGroup: '1995', gender: 'Female' }
  // ];

  const [data, setdata] = useState([]);
  const [sortBy, setSortBy] = useState("Sort By Oldest");
  const [sortedData, setSortedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [countall, setcountall] = useState("");
  const [birth, setbirthday] = useState("");
  const [countactive, setcountActive] = useState("");


  useEffect(() => {
    fetchStudents();
    countAll();
    countActive();
    countNextMonthBirthdays();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("https://afterschoolclub.azurewebsites.net/students/getAll");
      setdata(response.data);

      setSortedData(response.data);

      console.log(response.data)
    } catch (error) {
      console.error("Error fetching Students:", error.message);
      toast.error("Failed to fetch Students");
    }
  };


  const countAll = async () => {
    try {
      const response = await axios.get("https://afterschoolclub.azurewebsites.net/students/countAll");
      console.log(response.data);

      setcountall(response.data);

    } catch (error) {
      console.error("Error fetching CountAll:", error.message);
      toast.error("Failed to fetch Count ALL");
    }
  };
  const countNextMonthBirthdays = async () => {
    try {
      const response = await axios.get("https://afterschoolclub.azurewebsites.net/students/countNextMonthBirthdays");
      console.log("Birth",response.data);

      setbirthday(response.data);

    } catch (error) {
      console.error("Error fetching Birthday:", error.message);
      toast.error("Failed to fetch Birthday");
    }
  };

  const countActive = async () => {
    try {
      const response = await axios.get("https://afterschoolclub.azurewebsites.net/students/countActive");
      console.log(response);
      setcountActive(response.data);

    } catch (error) {
      console.error("Error fetching Students:", error.message);
      toast.error("Failed to fetch Students");
    }
  };






  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };



  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortBy(value);
    if (value === "Sort By Newest") {
      setSortedData(data.slice().sort((a, b) => b.id - a.id)); // Sort descending by ID
    } else if (value === "Sort By Oldest") {
      setSortedData(data.slice().sort((a, b) => a.id - b.id)); // Sort ascending by ID
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchQuery(value);
    const filteredData = data && data.filter(
      (row) =>
        row.id.toLowerCase().includes(value) ||
        row.firstName.toLowerCase().includes(value) ||
        row.lastName.toLowerCase().includes(value) ||
        (row.dateOfBirth && row.dateOfBirth.toLowerCase().includes(value)) || // Check if dateOfBirth exists
        row.yearGroup.toLowerCase().includes(value) ||
        row.gender.toLowerCase().includes(value)
    );
    setSortedData(filteredData || []); // Use an empty array if filteredData is null
    
  };



  const handleDelete = async (id) => {

    if (window.confirm("Are You Sure You Want to Delete?")) {

    try {
      await axios.delete(`https://afterschoolclub.azurewebsites.net/students/delete/${id}`);
      

      fetchStudents();
    } catch (error) {
      console.error("Error deleting Student:", error.message);
    }
  }

  else{
    return;
  }
  };

  const [modalShow, setModalShow] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleEdit = (row) => {
    setSelectedRow(row);

    console.log(row);
    setModalShow(true);
  };

  const handleSaveChanges = (editedData) => {
    console.log("Edited data:", editedData);

    console.log(sortedData);

    console.log(editedData.id);

    const index = sortedData.findIndex((row) => row.id === editedData.id);
    if (index !== -1) {
      setSortedData((prevData) => {
        const newData = [...prevData];
        newData[index] = editedData;
        return newData;
      });
    }
  };

  return (
    <>
      <EditModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onSave={handleSaveChanges}
        formData={selectedRow}
        setFormData={setSelectedRow}
      />

      <NavbarTop />

      <Container className="maintop justify-content-center">
        <Row className="flex-wrap justify-content-center g-0">
          <Col xs={12} md={8} lg={4}>
            <div className="row g-0  justify-content-center flex-row flex-nowrap">
              <div className="col-3">
                <img src="Group 10.png" alt="" className="img-fluid" />
              </div>
              <div className="col-6 border-end">
                <span className="ms-2">Number Of Students</span>
                <h1>{countall&&countall}</h1>
                <p>
                  <span>
                    <i className="bi bi-arrow-up text-success"></i> 16%
                  </span>{" "}
                  this month
                </p>
              </div>
            </div>
          </Col>

          <Col xs={12} md={8} lg={4}>
            <div className="row justify-content-center g-0 flex-row flex-nowrap">
              <div className="col-3">
                <img src="Group 11.png" alt="" className="img-fluid" />
              </div>
              <div className="col-6 border-end">
                <span className="ms-2">Birthdays This Month</span>
                <h1>{birth}</h1>
                <p>
                  <span>
                    <i className="bi bi-arrow-up text-success"></i> 16%
                  </span>{" "}
                  this month
                </p>
              </div>
            </div>
          </Col>

          <Col xs={12} md={8} lg={4}>
            <div className="row justify-content-center g-0 flex-row flex-nowrap">
              <div className="col-3">
                <img src="Group 12.png" alt="" className="img-fluid" />
              </div>
              <div className="col-6 border-end">
                <span className="ms-2">Active Students</span>
                <h1>{countactive&&countactive}</h1>
                <p>
                  <span>
                    <i className="bi bi-arrow-up text-success"></i> 16%
                  </span>{" "}
                  this month
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* <div className="w-75 mx-auto"> */}

      <Row className="row w-75 topcontent align-items-center justify-content-between mt-3 mx-auto g-3">
        <Col>
          <p
            className="AllStudent"
            style={{
              fontSize: "22px",
              color: "black",
              fontWeight: "600",
              margin: 0,
            }}
          >
            All Students
          </p>
        </Col>
        <Col md="auto">
          <InputGroup className="rounded-3">
            <InputGroup.Text
              id="basic-addon1"
              className="bg-light border-end-0"
            >
              <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control
              className="border bg-light flex-grow-1 border-start-0"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon1"
              value={searchQuery}
              onChange={handleSearch}
            />
          </InputGroup>
        </Col>
        <Col md="auto">
          <Form.Select
            value={sortBy}
            onChange={handleSortChange}
            className="py-2 w-100 rounded-3"
            aria-label="Sort By"
          >
            <option value="Sort By Newest">Sort By Newest</option>
            <option value="Sort By Oldest">Sort By Oldest</option>
          </Form.Select>
        </Col>
        <Col md="auto">
          <div className="text-end">
            <Link to="/addstudent">
              <Button variant="primary" className="ms-auto">
                Add
              </Button>
            </Link>
          </div>
        </Col>
      </Row>

      <Table className="mt-4 w-75 mx-auto  " responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date Of Birth</th>
            <th>Year Group</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.slice(startIndex, endIndex).map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.firstName}</td>
              <td>{row.lastName}</td>

              <td>{row.dateOfBirth}</td>

              <td>{row.yearGroup}</td>

              <td>{row.gender}</td>

              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
                </Button>

                <Button
                  variant="primary"
                  className="ms-1"
                  size="sm"
                  onClick={() => handleEdit(row)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* </div> */}

      <div className="d-flex w-75 mobile justify-content-between mt-3  mx-auto align-items-center">
        <div>
          Showing data{" "}
          {Math.min((currentPage - 1) * itemsPerPage + 1, sortedData.length)}
          {" to "}
          {Math.min(currentPage * itemsPerPage, sortedData.length)}
          {" of "}
          {sortedData.length} entries
        </div>
        <Pagination className="mt-3">
          <Pagination.First onClick={() => handlePageChange(1)} />
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} />
        </Pagination>
      </div>
    </>
  );
};

export default AddStudentTable;
