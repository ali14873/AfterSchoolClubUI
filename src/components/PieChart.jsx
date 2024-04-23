import React, { Fragment, useState } from "react";
import { createRoot } from "react-dom/client";
import { AgChartsReact } from "ag-charts-react";

export const PieChart = () => {

    const getData = () => {
        return [
          { asset: "Teachers", amount: 40 },
          { asset: "Students", amount: 30 },
        ];
      };
  const [options, setOptions] = useState({
    data: getData(),
    title: {
      text: "ATTENDANCE",
    },
    series: [
      {
        type: "donut",
        calloutLabelKey: "asset",
        angleKey: "amount",
        innerRadiusRatio: 0.7,
      },
    ],
  });

  return <AgChartsReact options={options} />;
};