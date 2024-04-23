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
import EditModalAllergy from "./EditModalAllergy";

import NavbarTop from "./Navbar";

const AddAllergyTable = () => {
  // const data = [
  //     { id: 1, studentId: 'A123', AllergyType: 'Pollen', severity: 'Mild', actionType: 'Antihistamine' },
  //     { id: 2, studentId: 'B456', AllergyType: 'Peanuts', severity: 'Severe', actionType: 'Epinephrine' },
  //     { id: 3, studentId: 'C789', AllergyType: 'Dust', severity: 'Moderate', actionType: 'Antihistamine' },
  //     { id: 4, studentId: 'D012', AllergyType: 'Mold', severity: 'Mild', actionType: 'Nasal spray' },
  //     { id: 5, studentId: 'E345', AllergyType: 'Eggs', severity: 'Moderate', actionType: 'Antihistamine' },
  //     { id: 6, studentId: 'F678', AllergyType: 'Shellfish', severity: 'Severe', actionType: 'Epinephrine' },
  //     { id: 7, studentId: 'G910', AllergyType: 'Cats', severity: 'Mild', actionType: 'Antihistamine' },
  //     { id: 8, studentId: 'H234', AllergyType: 'Dogs', severity: 'Moderate', actionType: 'Antihistamine' },
  //     { id: 9, studentId: 'I567', AllergyType: 'Pollen', severity: 'Mild', actionType: 'Antihistamine' },
  //     { id: 10, studentId: 'J890', AllergyType: 'Nuts', severity: 'Severe', actionType: 'Epinephrine' }
  // ];

  const [data, setdata] = useState([]);

  useEffect(() => {
    fetchCounts();

    fetchAllergy();
  }, []);


  const [count1, setCount1] = useState("");
  const [count2, setCount2] = useState("");
  const [count3, setCount3] = useState("");



  const fetchCounts = async () => {
    try {
      const response1 = await axios.get(
        "https://afterschoolclub.azurewebsites.net/allergies/countUniqueStudents"
      );
      const response2 = await axios.get(
        "https://afterschoolclub.azurewebsites.net/allergies/countHighSeverity"
      );
      const response3 = await axios.get(
        "https://afterschoolclub.azurewebsites.net/allergies/countMediumSeverity"
      );

      setCount1(response1.data);
      setCount2(response2.data);
      setCount3(response3.data);

    } catch (error) {
      console.error("Error fetching counts:", error.message);
    }
  };

  const fetchAllergy = async () => {
    try {
      const response = await axios.get("https://afterschoolclub.azurewebsites.net/allergies/getAll");
//       const response2 = await axios.get("https://afterschoolclub.azurewebsites.net/allergies/countUniqueStudents");
//       const response3 = await axios.get("https://afterschoolclub.azurewebsites.net/allergy/countHighSeverity");
//       const response4 = await axios.get("https://afterschoolclub.azurewebsites.net/allergy/countMediumSeverity");
// count1=response2.data;
// count2=response3.data;
// count3=response4.data;


// console.log(count1,count2,count3);


console.log(response.data);
      
      setdata(response.data);
      setSortedData(response.data)

      
    } catch (error) {
      console.error("Error fetching teachers:", error.message);
      toast.error("Failed to fetch teachers");
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
      row.id.toLowerCase().includes(value) ||

        row.studentId.toLowerCase().includes(value) ||
        row.allergyType.toLowerCase().includes(value) ||
        row.severity.toLowerCase().includes(value) ||
        row.actionType.toLowerCase().includes(value)||
        row.action.toLowerCase().includes(value)

        
    );
    setSortedData(filteredData);
  };

  // const handleDelete = (id) => {
  //   const updatedData = sortedData.filter((item) => item.id !== id);
  //   setSortedData(updatedData);
  // };


  const handleDelete = async (id) => {

    if (window.confirm("Are You Sure You Want to Delete?")) {

    try {
      await axios.delete(`https://afterschoolclub.azurewebsites.net/allergies/delete/${id}`);
      

      fetchAllergy();
    } catch (error) {
      console.error("Error deleting Student:", error.message);
    }
  }

  else{
    return
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
      <EditModalAllergy
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
                <span className="ms-2">countUniqueStudents</span>
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
                <span className="ms-2">countHighSeverity</span>
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
                <span className="ms-2">countMediumSeverity</span>
                <h1>{count3}</h1>
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
            All Allergys
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
              placeholder="Search by Username"
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
            <Link to="/addallergy">
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
            <th>AllergyType</th>
            <th>Severity</th>
            <th>Action Type</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.slice(startIndex, endIndex).map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.studentId}</td>
              <td>{row.AllergyType}</td>

              <td>{row.severity}</td>

              <td>{row.actionType}</td>

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

export default AddAllergyTable;
