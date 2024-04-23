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
import EditModalAddParents from "./EditModalAddParents";
import NavbarTop from "./Navbar";

const AddTeacherTable = () => {
  // const data = [
  //   {
  //     id: 1,
  //     firstName: "John",
  //     lastName: "Doe",
  //     email: "john.doe@example.com",
  //     phone: "123-456-7890",
  //   },
  //   {
  //     id: 2,
  //     firstName: "Jane",
  //     lastName: "Doe",
  //     email: "jane.doe@example.com",
  //     phone: "987-654-3210",
  //   },
  //   {
  //     id: 3,
  //     firstName: "Alice",
  //     lastName: "Smith",
  //     email: "alice.smith@example.com",
  //     phone: "555-555-5555",
  //   },
  //   {
  //     id: 4,
  //     firstName: "Bob",
  //     lastName: "Johnson",
  //     email: "bob.johnson@example.com",
  //     phone: "999-888-7777",
  //   },
  //   {
  //     id: 5,
  //     firstName: "Emily",
  //     lastName: "Williams",
  //     email: "emily.williams@example.com",
  //     phone: "111-222-3333",
  //   },
  // ];

  const [data,setdata]=useState([])


  useEffect(() => {
    fetchTeachers();
}, []);

const fetchTeachers = async () => {
    try {
        const response = await axios.get('https://afterschoolclub.azurewebsites.net/parent/getAll');
        setdata(response.data);
        setSortedData(response.data)
    } catch (error) {
        console.error('Error fetching teachers:', error.message);
        toast.error('Failed to fetch teachers');
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
        row.firstName.toLowerCase().includes(value) ||
        row.lastName.toLowerCase().includes(value) ||
        row.email.toLowerCase().includes(value) ||
        row.phone.toLowerCase().includes(value)
    );
    setSortedData(filteredData);
  };

  // const handleDelete = (id) => {
  //   const updatedData = sortedData.filter((item) => item.id !== id);
  //   setSortedData(updatedData);
  // };


  const handleDelete = async (id) => {
    if (window.confirm("Are You Sure You Want to Delete?")) {

    try 
    {
      await axios.delete(`https://afterschoolclub.azurewebsites.net/parent/delete/${id}`);


      fetchTeachers();
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
      <EditModalAddParents
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
            All Parents
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
            <Link to="/addteacher">
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
            <th>Email</th>
            <th>Phone</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.slice(startIndex, endIndex).map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.firstName}</td>
              <td>{row.lastName}</td>

              <td>{row.email}</td>

              <td>{row.phone}</td>

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

export default AddTeacherTable;
