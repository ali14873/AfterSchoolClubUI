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

import EditModalStudentParent from "./EditModalStudentParent";

import NavbarTop from "./Navbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddStudentParentRelationTable = () => {
  // const data = [
  //     { id: 1, studentID: 1, parentID: 1, relationshipType: 'Mother', attachStudentToCaregiver: 'Yes', attachChildToParent: 'Yes' },
  //     { id: 2, studentID: 1, parentID: 2, relationshipType: 'Father', attachStudentToCaregiver: 'Yes', attachChildToParent: 'Yes' },
  //     { id: 3, studentID: 2, parentID: 2, relationshipType: 'Mother', attachStudentToCaregiver: 'Yes', attachChildToParent: 'Yes' },
  //     { id: 4, studentID: 3, parentID: 3, relationshipType: 'Guardian', attachStudentToCaregiver: 'Yes', attachChildToParent: 'Yes' },
  //     { id: 5, studentID: 4, parentID: 4, relationshipType: 'Mother', attachStudentToCaregiver: 'Yes', attachChildToParent: 'Yes' },
  //     { id: 6, studentID: 4, parentID: 5, relationshipType: 'Father', attachStudentToCaregiver: 'Yes', attachChildToParent: 'Yes' },
  //     { id: 7, studentID: 5, parentID: 6, relationshipType: 'Mother', attachStudentToCaregiver: 'Yes', attachChildToParent: 'Yes' },
  //     { id: 8, studentID: 6, parentID: 7, relationshipType: 'Guardian', attachStudentToCaregiver: 'Yes', attachChildToParent: 'Yes' },
  //     { id: 9, studentID: 7, parentID: 8, relationshipType: 'Father', attachStudentToCaregiver: 'Yes', attachChildToParent: 'Yes' },
  //     { id: 10, studentID: 8, parentID: 9, relationshipType: 'Mother', attachStudentToCaregiver: 'Yes', attachChildToParent: 'Yes' }
  // ];

  const [data, setdata] = useState([]);

  useEffect(() => {
    fetchstudentparentrelation();
  }, []);

  const fetchstudentparentrelation = async () => {
    try {
      const response = await axios.get(
        "https://afterschoolclub.azurewebsites.net/studentParent/getAll"
      );
      setdata(response.data);
      setSortedData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching resource:", error.message);
      toast.error("Failed to fetch resource");
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
  const [sortedData, setSortedData] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortBy(value);
    if (value === "Sort By Newest") {
      setSortedData(data.slice().sort((a, b) => b.id - a.id));
    } else if (value === "Sort By Oldest") {
      setSortedData(data.slice().sort((a, b) => a.id - b.id));
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchQuery(value);
    const filteredData = data.filter(
      (row) =>
        (row.id && row.id.toString().toLowerCase().includes(value)) ||
        (row.studentID && row.studentID.toString().toLowerCase().includes(value)) ||
        (row.parentID && row.parentID.toString().toLowerCase().includes(value)) ||
        (row.relationshipType && row.relationshipType.toLowerCase().includes(value))
    );
    
    setSortedData(filteredData);
    
  };

 
  const handleDelete = async (id) => {
    if (window.confirm("Are You Sure You Want to Delete?")) {

    try 
    {
      await axios.delete(`https://afterschoolclub.azurewebsites.net/studentParent/delete/${id}`);

      fetchstudentparentrelation();
    } catch (error) {
        console.error('Error deleting teacher:', error.message);
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
      <EditModalStudentParent
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
                <span className="ms-2">number of students</span>
                <h1>5,423</h1>
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
                <h1>1,893</h1>
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
            All Relations
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
              aria-label="Search by Username"
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
            <Link to="/addstudentparentrelation">
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
            <th>Parent ID</th>
            <th>Relation Type</th>
          

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.slice(startIndex, endIndex).map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.studentID}</td>
              <td>{row.parentID}</td>

              <td>{row.relationshipType}</td>

             

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

export default AddStudentParentRelationTable;
