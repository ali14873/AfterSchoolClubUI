import React, { Fragment, useState } from "react";
import { createRoot } from "react-dom/client";
import { AgChartsReact } from "ag-charts-react";
const getData = () => {
  // Define your data here
  return [
    { quarter: "Q1", students: 10000, teachers: 5000 },
    { quarter: "Q2", students: 12000, teachers: 6000 },
    { quarter: "Q3", students: 15000, teachers: 7000 },
    { quarter: "Q4", students: 18000, teachers: 8000 },
  ];
};
export const LineChart = () => {
  const [options, setOptions] = useState({
    title: {
      text: "ALL CLUBS",
    },
    data: getData(),
    series: [
      {
        type: "line",
        xKey: "quarter",
        yKey: "students",
        yName: "Students",
      },
      {
        type: "line",
        xKey: "quarter",
        yKey: "teachers",
        yName: "Teachers",
      },
    ],
  });

  return <AgChartsReact options={options} />;
};

