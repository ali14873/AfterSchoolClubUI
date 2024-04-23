import React from "react";
import { BarChart } from "./BarChart";
import { LineChart } from "./LineChart";
import { PieChart } from "./PieChart";

const SubCard = ({ image, name, date }) => {
  return (
    <div className="sub-card">
      <img src={image} alt={name} className="sub-card-image" />
      <div className="sub-card-info">
        <h4 className="sub-card-name">{name}</h4>
        <p className="sub-card-date">{date}</p>
      </div>
    </div>
  );
};

const Card = () => {
  return (
    <div className="card cardd shadow">
      <h2 className="card-heading">My Planning</h2>
      <div className="sub-cards">
        <SubCard
          image="https://via.placeholder.com/150"
          name="Task 1"
          date="March 28, 2024"
        />
        <SubCard
          image="https://via.placeholder.com/150"
          name="Task 2"
          date="March 29, 2024"
        />
        <SubCard
          image="https://via.placeholder.com/150"
          name="Task 3"
          date="March 29, 2024"
        />{" "}
      </div>
    </div>
  );
};

const Progress = () => {
  return (
    <div className="progress-container">
      <div className="row">
        <div className="main col-sm-12 col-lg-8">
          <div className="chart-section">
            <div className="chart-item linechart item1 shadow">
              <h3>Line Chart</h3>
              <LineChart />
            </div>
          </div>
          <div className="chart-item chart-section item2">
            <div className="sub-chart chartsb1 shadow">
              <h3>Bar Chart</h3>
              <BarChart />
            </div>
            <div className="sub-chart chartsb1 pie shadow">
              <h3>Pie Chart</h3>
              <PieChart />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-12 col-lg-4">
          <Card />

          <div className="progresses shadow">
            <div className="d-flex justify-content-between">
              <span className="textcode">Java Code</span>
              <span>25/100</span>
            </div>
            <div
              className="progress"
              role="progressbar"
              aria-label="Basic example"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div className="progress-bar" style={{ width: "25%" }}></div>
            </div>
            <div className="d-flex justify-content-between">
              <span className="textcode">Java Code</span>
              <span>50/100</span>
            </div>
            <div
              className="progress"
              role="progressbar"
              aria-label="Basic example"
              aria-valuenow="50"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div className="progress-bar" style={{ width: "50%" }}></div>
            </div>
            <div className="d-flex justify-content-between">
              <span className="textcode">Java Code</span>
              <span>75/100</span>
            </div>
            <div
              className="progress"
              role="progressbar"
              aria-label="Basic example"
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div className="progress-bar" style={{ width: "75%" }}></div>
            </div>

            <div className="d-flex justify-content-between">
              <span className="textcode">Java Code</span>
              <span>100/100</span>
            </div>
            <div
              className="progress"
              role="progressbar"
              aria-label="Basic example"
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              
              <div className="progress-bar" style={{ width: "100%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
