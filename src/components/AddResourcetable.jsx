import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Pagination from 'react-bootstrap/Pagination';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import './css/addstudent.css'
import NavbarTop from './Navbar';
import EditAddresourceModal from './EditAddresourceModal';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddResourcetable = () => {

    // const data = [
    //     { resourceId: 1, resourceName: 'resourceName1', description: 'Description1' },
    //     { resourceId: 2, resourceName: 'resourceName2', description: 'Description2'},
    //     { resourceId: 3, resourceName: 'resourceName3', description: 'Description3'},
    //     { resourceId: 4, resourceName: 'resourceName4', description: 'Description4'},
    //     { resourceId: 5, resourceName: 'resourceName5', description: 'Description5'},
    //     { resourceId: 6, resourceName: 'resourceName6', description: 'Description6'},
    //     { resourceId: 7, resourceName: 'resourceName7', description: 'Description7'},
    //     { resourceId: 8, resourceName: 'resourceName8', description: 'Description8'},
    //     { resourceId: 9, resourceName: 'resourceName9', description: 'Description9'},
    //     { resourceId: 10, resourceName: 'resourceName10', description: 'Description10' }
    // ];


    const [data, setdata] = useState([]);

    useEffect(() => {
      fetchResource();
    }, []);
  
    const fetchResource = async () => {
      try {
        const response = await axios.get("https://afterschoolclub.azurewebsites.net/resources/getAll");
        setdata(response.data);
        setSortedData(response.data);
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


  const [sortBy, setSortBy] = useState('Sort By Oldest');
  const [sortedData, setSortedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortBy(value);
    if (value === 'Sort By Newest') {
      setSortedData(data.slice().sort((a, b) => b.resourceId - a.resourceId)); // Sort descending by resourceId
    } else if (value === 'Sort By Oldest') {
      setSortedData(data.slice().sort((a, b) => a.resourceId - b.resourceId)); // Sort ascending by resourceId
    }
  };


  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchQuery(value);
    const filteredData = data.filter(row =>
      row.resourceName.toLowerCase().includes(value) ||
      row.description.toLowerCase().includes(value)
   
    );
    setSortedData(filteredData);
  };

  // const handleDelete = (resourceId) => {
  //   const updatedData = sortedData.filter(item => item.resourceId !== resourceId);
  //   setSortedData(updatedData);
  // };


  const handleDelete = async (resourceId) => {
    if (window.confirm("Are You Sure You Want to Delete?")) {

    try {
      await axios.delete(
        `https://afterschoolclub.azurewebsites.net/resources/delete/${resourceId}`
      );
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



    console.log(sortedData)

    console.log( editedData.resourceId)
    
    const index = sortedData.findIndex(row => row.resourceId === editedData.resourceId);
    if (index !== -1) {
      setSortedData(prevData => {
        const newData = [...prevData];
        newData[index] = editedData;
        return newData;
      });
    }
  };

  const [count1, setCount1] = useState("");
  const [count2, setCount2] = useState("");
  const [count3, setCount3] = useState("");

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const response1 = await axios.get(
        "https://afterschoolclub.azurewebsites.net/resource-summary/total-quantity-available"
      );
      const response2 = await axios.get(
        "https://afterschoolclub.azurewebsites.net/resource-summary/total-resources"
      );
      const response3 = await axios.get(
        "https://afterschoolclub.azurewebsites.net/resource-summary/quantity-used-last-month"
      );

      setCount1(response1.data);
      setCount2(response2.data);
      setCount3(response3.data);

    } catch (error) {
      console.error("Error fetching counts:", error.message);
    }
  };





  return (
    <>

<EditAddresourceModal
        show={modalShow}
        onHresourceIde={() => setModalShow(false)}
        onSave={handleSaveChanges}
        formData={selectedRow}
        setFormData={setSelectedRow} 
      />

      <NavbarTop/>

      <Container className='maintop justify-content-center'>
        <Row className='flex-wrap justify-content-center g-0'>
          <Col xs={12} md={8} lg={4}>
            <div className="row g-0  justify-content-center flex-row flex-nowrap">
              <div className='col-3'>
                <img src="Group 10.png" alt="" className="img-fluid" />
              </div>
              <div className='col-6 border-end'>
                <span className='ms-2'>Total Quantity Available</span>
                <h1>{count1}</h1>
                <p><span><i className="bi bi-arrow-up text-success"></i> 16%</span> this month</p>
              </div>
            </div>
          </Col>

          <Col xs={12} md={8} lg={4}>
            <div className="row justify-content-center g-0 flex-row flex-nowrap">
              <div className='col-3'>
                <img src="Group 11.png" alt="" className="img-fluid" />
              </div>
              <div className='col-6 border-end'>
                <span className='ms-2'>Total-Resources</span>
                <h1>{count2}</h1>
                <p><span><i className="bi bi-arrow-up text-success"></i> 16%</span> this month</p>
              </div>
            </div>
          </Col>

          <Col xs={12} md={8} lg={4}>
            <div className="row justify-content-center g-0 flex-row flex-nowrap">
              <div className='col-3'>
                <img src="Group 12.png" alt="" className="img-fluid" />
              </div>
              <div className='col-6 border-end'>
                <span className='ms-2'>Quantity Used Last Month</span>
                <h1>{count3}</h1>
                <p><span><i className="bi bi-arrow-up text-success"></i> 16%</span> this month</p>
              </div>
            </div>
          </Col>
        </Row>




      </Container>

      {/* <div className="w-75 mx-auto"> */}


      <Row className="row w-75 topcontent align-items-center justify-content-between mt-3 mx-auto g-3">
                <Col>
                    <p className='AllStudent' style={{ fontSize: '22px', color: 'black', fontWeight: '600', margin: 0 }}>All Resources</p>
                </Col>
                <Col md="auto">
                    <InputGroup className="rounded-3">
                        <InputGroup.Text resourceId="basic-addon1" className='bg-light border-end-0'>
                            <i className="bi bi-search"></i>
                        </InputGroup.Text>
                        <Form.Control
                            className='border bg-light flex-grow-1 border-start-0'
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="basic-addon1"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </InputGroup>
                </Col>
                <Col md="auto">
                    <Form.Select value={sortBy} onChange={handleSortChange} className='py-2 w-100 rounded-3' aria-label="Sort By">
                        <option value="Sort By Newest">Sort By Newest</option>
                        <option value="Sort By Oldest">Sort By Oldest</option>
                    </Form.Select>
                </Col>
                <Col md="auto">
                    <div className="text-end">
                        <Link to='/addresource'>
                            <Button variant="primary" className='ms-auto'>Add</Button>
                        </Link>
                    </div>
                </Col>
            </Row>

      <Table className='mt-4 w-75 mx-auto  ' responsive >





        <thead>
          <tr>
            <th>resourceId</th>
            <th>Resource Name</th>
            <th>Description</th>
            
            <th>Action</th>



          </tr>
        </thead>
        <tbody>
          {sortedData.slice(startIndex, endIndex).map((row) => (
            <tr key={row.resourceId}>
              <td>{row.resourceId}</td>
              <td>{row.resourceName}</td>
              <td>{row.description}</td>


             

              <td>
              <Button variant="danger" size="sm" onClick={() => handleDelete(row.resourceId)}>Delete</Button>

              <Button variant="primary" className='ms-1' size="sm" onClick={() => handleEdit(row)}>Edit</Button>

              </td>





            </tr>
          ))}
        </tbody>


      </Table>

      {/* </div> */}


      <div className="d-flex w-75 mobile justify-content-between mt-3  mx-auto align-items-center">
        <div>
          Showing data {Math.min((currentPage - 1) * itemsPerPage + 1, sortedData.length)}
          {' to '}
          {Math.min(currentPage * itemsPerPage, sortedData.length)}
          {' of '}
          {sortedData.length} entries
        </div>
        <Pagination className='mt-3'>
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
  )
}

export default AddResourcetable
