import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Pagination from "react-bootstrap/Pagination";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./css/addstudent.css";
import EditModalCalendar from "./EditModalCalendar";
import { Dropdown, DropdownButton } from "react-bootstrap";
import CompleteSessionModal from "./CompleteSessionModal";
import EditModalAssignResources from "./EditModalAssignResources";
import EditModalAddTeacherSession from "./EditModalAddTeacherSession";

import ResourcesUsageModal from "./ResourcesUsageModal.";
import axios from "axios";
import { toast } from "react-toastify";
import EditModalBookSession from "./EditModalBookSession";

import {
  
  useParams,
} from "react-router-dom";

const CalenderTable = ({setIDS}) => {
 

  const [data,setdata]=useState([]);
  let { clubid } = useParams();


  console.log("This is ClubId",clubid);


  const fetchStudents = async () => {
    try {
      console.log("This is ClubId",clubid)

      const response = await axios.get(`https://afterschoolclub.azurewebsites.net/sessions/byClub/${clubid}`);
      setdata(response.data);
setSortedData(response.data)
      console.log(response);

      setIDS(response.data.map((ids) => ids.id));

      
    } catch (error) {
      console.error("Error fetching session:", error.message);
      toast.error("Failed to fetch session");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);




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
        (row.title && row.title.toLowerCase().includes(value)) ||
        (row.start && row.start.toLowerCase().includes(value)) ||
        (row.end && row.end.toLowerCase().includes(value)) ||
        (row.description && row.description.toLowerCase().includes(value)) ||
        (row.location && row.location.toLowerCase().includes(value)) ||
        (row.clubID && row.clubID.toLowerCase().includes(value)) ||
        (row.isRecurring && row.isRecurring.toString().toLowerCase().includes(value)) ||
        (row.recurrenceRule && row.recurrenceRule.toLowerCase().includes(value))
    );
    
    setSortedData(filteredData);
    
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

  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectAll = () => {
    const selectAllCheckbox = !selectAll;
    setSelectAll(selectAllCheckbox);
    const updatedSelectedRows = selectAllCheckbox
      ? sortedData.map((row) => row.id)
      : [];
    setSelectedRows(updatedSelectedRows);
  };

  const handleRowCheckboxChange = (rowId) => {
    let updatedSelectedRows;
    if (selectedRows.includes(rowId)) {
      updatedSelectedRows = selectedRows.filter((id) => id !== rowId);
    } else {
      updatedSelectedRows = [...selectedRows, rowId];
    }
    setSelectedRows(updatedSelectedRows);
    setSelectAll(sortedData.length === updatedSelectedRows.length);
  };

  const [len, setlen] = useState();

  useEffect(() => {
    if (sortedData.length > 0) {
      const firstRowData = sortedData[0];

      setlen(firstRowData);
    }
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [showModalResource, setShowModalResource] = useState(false);
  const [showModalTeacherSession, setShowModalTeacherSession] = useState(false);
  const [showModalChildrenSession, setShowModalChildrenSession] =
    useState(false);

    const [showModalResourceUsage, setShowModalResourceUsage] = useState(false);



  const handleOpenModal = (id) => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);

    handleOpenModalResourceUsage();
  };

  const handleOpenModalResourceUsage = (id) => {
    setShowModalResourceUsage(true);
  };

  const handleCloseModalResourceUsage = () => {
    setShowModalResourceUsage(false);
  };


  const handleOpenModalResource = (id) => {
    setShowModalResource(true);
  };

  const handleCloseModalResource = () => {
    setShowModalResource(false);
  };

  const handleOpenModalTeacherSession = (id) => {
    setShowModalTeacherSession(true);
  };

  const handleCloseModalTeacherSession = () => {
    setShowModalTeacherSession(false);
  };

  const handleOpenModalChildrenSession = (row) => {
    setSelectedRow(row)

    
    setShowModalChildrenSession(true);
  };

  const handleCloseModalChildrenSession = () => {
    setShowModalChildrenSession(false);
  };

  const handleSaveStatus = (id, status) => {
    console.log(`Status for person with ID ${id}: ${status}`);
    setShowModal(false);
  };

  const logined =localStorage.getItem("roleType");

  const [namesData, setNamesData] = useState([
    { id: "1", name: "John Doe", status: "attended" },
    { id: "2", name: "Alice Smith", status: "attended" },
    { id: "3", name: "Bob Johnson", status: "attended" },
    { id: "4", name: "Emily Brown", status: "attended" },
    { id: "5", name: "Michael Wilson", status: "attended" },
    { id: "6", name: "Sophia Davis", status: "attended" },
  ]);

  const dummyTeachers = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Michael Johnson" },
  ];

  const dummyChildrens = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Michael Johnson" },
  ];

  const handleBooking = async (sessionid) => {
    try {
      const data = {
        userID: "2fad7160-3081-4c68-939c-44981fa35196",
        bookingType: "idk",
        sessionID: sessionid,
        status: null,
      };

      await axios.post("http://localhost:8080/sessionBookings/create", data);
      console.log("Booking successful");

      toast.success("Booking Is Successfull");
    } catch (error) {
      console.error("Error booking session:", error.message);
      toast.error("Error in Booking");
    }
  };

  // DropDown Component
  const AdminActionsDropdown = ({
    handleOpenModal,
    handleOpenModalResource,
    handleOpenModalTeacherSession,
    dataa,setSelectedRow
    
  }) => {
    console.log("This is the datatata",dataa)
    // 

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
      setSelectedRow(dataa);
    };

  
    return (
      <Dropdown show={isOpen} onToggle={toggleDropdown}>
        <Dropdown.Toggle variant="primary" size="sm">
          Admin Actions
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleOpenModal}>
            Complete Session
          </Dropdown.Item>
          <Dropdown.Item onClick={handleOpenModalResource}>
            Assign Resource
          </Dropdown.Item>
          <Dropdown.Item onClick={handleOpenModalTeacherSession}>
            Add Teacher
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  // DropDown Component
  return (
    <>
      {showModal && (
        <CompleteSessionModal
          data={namesData}
          setdata={setNamesData}

          selectedRow={selectedRow}
          onClose={handleCloseModal}
          onSave={handleSaveStatus}
        />
      )}

      {showModalResource && (
        <EditModalAssignResources
          

        formData1={selectedRow}
          onClose={handleCloseModalResource}
          onSave={handleSaveStatus}
        />
      )}

      {showModalTeacherSession && (
        <EditModalAddTeacherSession
          teachers={dummyTeachers}
          onClose={handleCloseModalTeacherSession}
          onSave={handleSaveStatus}
        />
      )}

      {showModalChildrenSession && (
        <EditModalBookSession
          childrens={dummyChildrens}
          selectedRow={selectedRow.id}
          onClose={handleCloseModalChildrenSession}
          onSave={handleSaveStatus}
        />
      )}

      {showModalResourceUsage && (
        <ResourcesUsageModal
        
          onClose={handleCloseModalResourceUsage}
          onSave={handleSaveStatus}
          formData={selectedRow}


        />
      )}

      <EditModalCalendar
        show={modalShow}
        onHide={() => setModalShow(false)}
        onSave={handleSaveChanges}
        formData={selectedRow}
        setFormData={setSelectedRow}
      />
      <Row className="row w-100 topcontent align-items-center justify-content-between mt-3 mx-auto g-3">
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
            All Sessions
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
            <DropdownButton title="Add" variant="primary" className="ms-auto">
              <Dropdown.Item as={Link} to={`/addsession/${clubid}`}
>
                Add Session
              </Dropdown.Item>
              <Dropdown.Item>Add Using AI</Dropdown.Item>
            </DropdownButton>
          </div>
        </Col>
      </Row>

      <Table className="mt-4 w-100 mx-auto  " responsive>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectAll}
              />{" "}
            </th>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>

            <th>Location</th>

            <th>IsRecurring</th>
            {/* <th>Recurrence Rule</th> */}
            <th>Club ID</th>

            {(logined === "Parent" && selectedRows && selectedRows.length <= 1) ||
            logined === "Admin" ? (
              <th>Action</th>
            ) : (
              ""
            )}
          </tr>
        </thead>
        <tbody>
          {sortedData.slice(startIndex, endIndex).map((row) => (
            <tr key={row.id}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleRowCheckboxChange(row.id)}
                  checked={selectedRows.includes(row.id)}
                />
              </td>
              <td>{row.id}</td>
              <td>{row.title}</td>
              <td>{row.description}</td>
              <td>{row.date}</td>

              <td>{row&&row.recurring&&row.recurring.startTime?row.recurring.startTime:''}</td>
              <td>{row&&row.recurring&&row.recurring.endTime?row.recurring.endTime:''}</td>

              <td>{row.location}</td>
              <td>{row.isRecurring===true?'Yes':'No'}</td>
              {/* <td>{row.recurrenceRule}</td> */}
              <td>{row.clubID}</td>

              <td>
                {logined &&
                logined === "Parent" &&
                selectedRows &&
                selectedRows.length <= 1 ? (
                  <Button
                    onClick={()=>{
                      handleOpenModalChildrenSession(row)
                    }}
                    variant="primary"
                    size="sm"
                    className="ms-1"
                  >
                    Book
                  </Button>
                ) : (
                  ""
                )}

                {/* {logined && logined === "admin" ? (
                  <>
                    <Button
                      variant="primary"
                      className="ms-1"
                      size="sm"
                      onClick={() => handleEdit(row)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="primary"
                      className="ms-1"
                      size="sm"
                      onClick={() => handleOpenModal()}
                    >
                      Complete Session
                    </Button>

                    <Button
                      variant="primary"
                      className="ms-1"
                      size="sm"
                      onClick={() => handleOpenModalResource()}
                    >
                      Assign Resource 
                    </Button>

                    <Button
                      variant="primary"
                      className="ms-1"
                      size="sm"
                      onClick={() => handleOpenModalTeacherSession()}
                    >
                      Add Teacher
                    </Button>
                  </>
                ) : null} */}

                {logined && logined === "Admin" ? (
                  <>
                    <Row className="flex-nowrap">
                      <Button
                        variant="primary"
                        className="ms-1 w-25"
                        size="sm"
                        onClick={() => handleEdit(row)}
                      >
                        Edit
                      </Button>
                      <AdminActionsDropdown
                        handleEdit={handleEdit}
                        handleOpenModal={handleOpenModal}
                        handleOpenModalResource={handleOpenModalResource}
                        dataa={row}
                        setSelectedRow={setSelectedRow}
                        handleOpenModalTeacherSession={
                          handleOpenModalTeacherSession
                        }
                      />
                    </Row>
                  </>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {logined &&
      logined === "Parent" &&
      selectedRows &&
      selectedRows.length > 1 ? (
        <div className="text-center mt-1">
          <Button
            onClick={handleOpenModalChildrenSession}
            variant="primary"
            size="md"
            className="ms-1"
          >
            Book
          </Button>
        </div>
      ) : (
        ""
      )}


      <div className="d-flex w-100 mobile justify-content-between mt-3  mx-auto align-items-center">
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
export default CalenderTable;
