import React, { useEffect, useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarTop from "./Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
function AddSession() {
  let { clubid } = useParams();
  console.log("this is the club id addsess", clubid);

  const [recurrenceData, setRecurrenceData] = useState({
    repeat: "",
    recurringWeeks: [],

    month: "",

    day: "",
    interval: 1,
    start: "",
    end: "",
    startTime:"",
    endTime:""

  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    clubID: clubid,
    isRecurring: false,
    recurring: recurrenceData    
  }); 
  
  console.log(formData);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setRecurrenceData({ ...recurrenceData, [name]: value });

    console.log("This is recurrenceData Modifying",recurrenceData)
  };

  const handleSubmit = async () => {
    console.log("This is the FormDaa",formData);

    
    try {
      const response = await axios.post(
        "https://afterschoolclub.azurewebsites.net/sessions/create",
        formData
      );
      console.log("Response:", response.data);
      toast.success("Club added successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to add club");
    }
  };
  const handleMonthSelect = (e) => {
    const { value } = e.target;
    let updatedMonths = [...recurrenceData.recurringMonths];
    if (updatedMonths.includes(value)) {
      updatedMonths = updatedMonths.filter((month) => month !== value);
    } else {
      updatedMonths.push(value);
    }
    setRecurrenceData({ ...recurrenceData, recurringMonths: updatedMonths });
  };
  const handleWeekSelect = (e) => {
    const { value } = e.target;
    let updatedWeeks = [...recurrenceData.recurringWeeks];
    if (updatedWeeks.includes(value)) {
      updatedWeeks = updatedWeeks.filter((week) => week !== value);
    } else {
      updatedWeeks.push(value);
    }
    const weekDays = updatedWeeks.sort().join(",");
    setRecurrenceData({ ...recurrenceData, recurringWeeks: updatedWeeks, weekDays });
  };
  
  const handleDaySelect = (e) => {
    const { value } = e.target;
    let updatedDays = [...recurrenceData.recurringDays];
    if (updatedDays.includes(value)) {
      updatedDays = updatedDays.filter((day) => day !== value);
    } else {
      updatedDays.push(value);
    }
    setRecurrenceData({ ...recurrenceData, recurringDays: updatedDays });
  };


  useEffect(() => {
    console.log("Updated recurrenceData:", recurrenceData);
  }, [recurrenceData]);
  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      recurring: recurrenceData
    }));
  }, [recurrenceData]);

  return (
    <>
      <NavbarTop />
      <Form
        className="px-4 py-4 formchild formlogin mx-auto"
        style={{ width: "40%" }}
      >
        <div className="text-top mb-1 fs-2">Add Session</div>
        <FloatingLabel controlId="title" label="Title" className="mb-3 label">
          <Form.Control
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter sessionName"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="description"
          label="Description"
          className="mb-3 label"
        >
          <Form.Control
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Description"
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="location"
          label="Location"
          className="mb-3 label"
        >
          <Form.Control
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter Location"
          />
        </FloatingLabel>

        <Form.Group className="mb-3" controlId="Date">
          <Form.Label> Date</Form.Label>
          <Form.Control
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="End Date"
          />
        </Form.Group>

        <div>
          <Form.Group controlId="isRecurring">
            <Form.Label>IsRecurring </Form.Label>
            <Form.Select
              name="isRecurring"
              value={formData.isRecurring}
              className="m-0 p-3"
              onChange={handleChange}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </Form.Select>
          </Form.Group>
          {formData.isRecurring === "true" && (
            <div>
              <Form.Group className="mb-3" controlId="startDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  name="start"
                  type="date"
                  value={recurrenceData.start}
                  onChange={handleChange1}
                  placeholder="Start Time"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  name="end"
                  type="date"
                  value={recurrenceData.end}
                  onChange={handleChange1}
                  placeholder="End Time"
                />
              </Form.Group>



              <Form.Group className="mb-3" controlId="startDate">
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                  name="startTime"
                  type="text"
                  value={recurrenceData.startTime}
                  onChange={handleChange1}
                  placeholder="Start Time"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="endTime">
                <Form.Label>End Time</Form.Label>
                <Form.Control
                  name="endTime"
                  type="text"
                  value={recurrenceData.endTime}
                  onChange={handleChange1}
                  placeholder="End Time"
                />
              </Form.Group>
              <Form.Group className="mt-2" controlId="repeat">
                <Form.Label>Select Recurrence Type:</Form.Label>
                <Form.Select
                  name="repeat"
                  value={recurrenceData.repeat}
                  className="m-0 p-3"
                  onChange={handleChange1}
                >
                  <option value="">Select</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </Form.Select>
              </Form.Group>
              {recurrenceData.repeat === "daily" && (
                <Form.Group className="mt-2" controlId="interval">
                  <Form.Label>Repeat Every</Form.Label>
                  <Form.Control
                    name="interval"
                    type="number"
                    value={recurrenceData.interval}
                    onChange={handleChange1}
                  />
                </Form.Group>
              )}
              {recurrenceData.repeat === "monthly" && (
                <Form.Group className="mt-2" controlId="recurringMonths">
                  <Form.Label>Select Day:</Form.Label>

                  <Form.Control
                    name="day"
                    type="number"
                    value={recurrenceData.day}
                    onChange={handleChange1}
                    className="m-0 p-3"
                  />

                  <Form.Group className="mt-2" controlId="interval">
                    <Form.Label>Repeat Every</Form.Label>
                    <Form.Control
                      name="interval"
                      type="number"
                      value={recurrenceData.interval}
                      onChange={handleChange1}
                      className="m-0 p-3"
                    />
                  </Form.Group>
                </Form.Group>
              )}
              {recurrenceData.repeat === "weekly" && (

                <>
                <Form.Group className="mt-2" controlId="recurringWeeks">
                  <Form.Label>Select Recurring Weeks:</Form.Label>

                  <div className="d-flex justify-content-between flex-wrap">
                    {["SU", "MO", "TU", "WE", "TH", "FR", "SA"].map((day) => (
                      <Form.Check
                        key={day}
                        type="checkbox"
                        id={`week-${day}`}
                        label={`${day}`}
                        value={day}
                        checked={recurrenceData.recurringWeeks.includes(day)}
                        onChange={handleWeekSelect}
                      />
                    ))}

                  </div>
                </Form.Group>


                 <Form.Group className="mt-2" controlId="interval">
                    <Form.Label>Repeat Every</Form.Label>
                    <Form.Control
                      name="interval"
                      type="number"
                      value={recurrenceData.interval}
                      onChange={handleChange1}
                      className="m-0 p-3"
                    />
                  </Form.Group>
                  </>
              )}
              {recurrenceData.repeat === "yearly" && (
                <div>
                  <Form.Group className="mt-2" controlId="recurringYearlyMonth">
                    <Form.Label>Select month for Yearly Recurrence:</Form.Label>
                    <Form.Select
  name="month"
  value={recurrenceData.month}
  onChange={handleChange1}
  className="m-0 p-3"
>
  <option value="">Select</option>
  {[
    { name: "January", value: 1 },
    { name: "February", value: 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "November", value: 11 },
    { name: "December", value: 12 }
  ].map((month) => (
    <option key={month.name} value={month.value}>
      {month.name}
    </option>
  ))}
</Form.Select>

                  </Form.Group>
                  <Form.Group className="mt-2" controlId="recurringYearlyDay">
                    <Form.Label>Select Day For Yearly Recurrence:</Form.Label>
                    <Form.Select
                      className="m-0 p-3"
                      name="day"
                      value={recurrenceData.day}
                      onChange={handleChange1}
                    >
                      <option value="">Select</option>
                      {[
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                        17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                        31,
                      ].map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mt-2" controlId="interval">
                    <Form.Label>Repeats Every:</Form.Label>
                    <Form.Control
                      name="interval"
                      type="number"
                      value={recurrenceData.interval}
                      onChange={handleChange1}
                    />
                  </Form.Group>
                </div>
              )}
            </div>
          )}
        </div>

        <FloatingLabel
          controlId="clubId"
          label="Club ID"
          className="mb-3 label mt-3"
        >
          <Form.Control
            name="clubId"
            type="text"
            value={formData.clubID}
            onChange={handleChange}
            placeholder="Enter Club ID"
            readOnly
          />
        </FloatingLabel>
        <Link to="/upload">
          <Button className="w-100 rounded-0 btn-white">Upload</Button>
        </Link>
        <Button
          className="w-100 rounded-0 mt-3 btn-success"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form>
    </>
  );
}

export default AddSession;
