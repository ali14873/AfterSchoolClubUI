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
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditModalHealth from "./EditModalHealth";
import NavbarTop from "./Navbar";

const AddHealthTable = ({ none,idss }) => {
  // const data = [
  //     { id: 1, studentID: 'A123', condition: 'Allergy', details: 'Seasonal allergy', medication: 'Antihistamine' },
  //     { id: 2, studentID: 'B456', condition: 'Asthma', details: 'Exercise-induced asthma', medication: 'Inhaler' },
  //     { id: 3, studentID: 'C789', condition: 'Diabetes', details: 'Type 1 diabetes', medication: 'Insulin' },
  //     { id: 4, studentID: 'D012', condition: 'ADHD', details: 'Attention deficit hyperactivity disorder', medication: 'Stimulant' },
  //     { id: 5, studentID: 'E345', condition: 'Anxiety', details: 'Social anxiety disorder', medication: 'SSRI' },
  //     { id: 6, studentID: 'F678', condition: 'Allergy', details: 'Peanut allergy', medication: 'EpiPen' },
  //     { id: 7, studentID: 'G901', condition: 'Epilepsy', details: 'Generalized seizures', medication: 'Anticonvulsant' },
  //     { id: 8, studentID: 'H234', condition: 'Depression', details: 'Major depressive disorder', medication: 'SSRI' },
  //     { id: 9, studentID: 'I567', condition: 'Migraine', details: 'Chronic migraine', medication: 'Triptan' },
  //     { id: 10, studentID: 'J890', condition: 'Allergy', details: 'Dust allergy', medication: 'Antihistamine' }
  //   ];

  const [data, setdata] = useState([]);
  const [count1, setCount1] = useState("");
  const [count2, setCount2] = useState("");
  useEffect(() => {

    if(idss)
    {

      console.log('fetching by id')
      fetchhealthsbyid();
    }
    else{
      console.log('fetching without')

      fetchhealths();

    }
    fetchCounts();
  }, [idss]);

  const fetchCounts = async () => {
    try {
      const response1 = await axios.get(
        "https://afterschoolclub.azurewebsites.net/healthRecord/countOfHealthRecords"
      );
      const response2 = await axios.get(
        "https://afterschoolclub.azurewebsites.net/healthRecord/countOfIncompleteHealthRecords"
      );

      setCount1(response1.data);
      setCount2(response2.data);
    } catch (error) {
      console.error("Error fetching counts:", error.message);
    }
  };
  const fetchhealths = async () => {
    try {
      const response = await axios.get(
        "https://afterschoolclub.azurewebsites.net/healthRecord/getAll"
      );

      console.log("Thecounts", count1.data, count2.data);

      setdata(response.data);
      setSortedData(response.data);
    } catch (error) {
      console.error("Error fetching Healths:", error.message);
      toast.error("Failed to fetch Healths");
    }
  };


  const fetchhealthsbyid = async () => {

    console.log("idsss",idss);
    try {
      const response = await axios.get(
        `https://afterschoolclub.azurewebsites.net/healthRecord/getByStudentId/${idss}`
      );


      setdata(response.data);
      setSortedData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching Healths:", error.message);
      toast.error("Failed to fetch Healths");
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

  const [sortBy, setSortBy] = useState("Sort By Oldest");
  const [sortedData, setSortedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
    const filteredData = data.filter(
      (row) =>
        row.studentID.toLowerCase().includes(value) ||
        row.condition.toLowerCase().includes(value) ||
        row.details.toLowerCase().includes(value) ||
        row.medication.toLowerCase().includes(value)
    );
    setSortedData(filteredData);
  };

  // const handleDelete = (id) => {
  //     const updatedData = sortedData.filter(item => item.id !== id);
  //     setSortedData(updatedData);
  // };

  const handleDelete = async (id) => {
    if (window.confirm("Are You Sure You Want to Delete?")) {

    try {
      await axios.delete(
        `https://afterschoolclub.azurewebsites.net/healthRecord/delete/${id}`
      );

      fetchhealths();
    } catch (error) {
      console.error("Error deleting Health:", error.message);
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
      <EditModalHealth
        show={modalShow}
        onHide={() => setModalShow(false)}
        onSave={handleSaveChanges}
        formData={selectedRow}
        setFormData={setSelectedRow}
      />

      <NavbarTop />

      <Container className={none ? "d-none" : "maintop justify-content-center"}>
        <Row className="flex-wrap justify-content-center g-0">
          <Col xs={12} md={8} lg={4}>
            <div className="row g-0  justify-content-center flex-row flex-nowrap">
              <div className="col-3">
                <img src="Group 10.png" alt="" className="img-fluid" />
              </div>
              <div className="col-6 border-end">
                <span className="ms-2">number of students</span>
                <h1>{count1}</h1>
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
                <span className="ms-2">enrolled a club</span>
                <h1>{count2}</h1>
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
                <span className="ms-2">active Now</span>
                <h1>600</h1>
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
            All Health
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
        <Col className={none ? "d-none" : ""} md="auto">
          <div className="text-end">
            <Link to="/addhealth">
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
            <th>Student ID</th>
            <th>Condition</th>
            <th>Details</th>
            <th>Medication</th>

            <th className={none ? "d-none" : ""}>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.slice(startIndex, endIndex).map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.studentID}</td>
              <td>{row.condition}</td>

              <td>{row.details}</td>

              <td>{row.medication}</td>

              <td className={none ? "d-none" : ""}>
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

export default AddHealthTable;
