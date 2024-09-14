import React, { forwardRef } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./../../styles/PieChart.css";

// Register necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = forwardRef(
  ({ labels, values, backgroundColors, hoverBackgroundColors }, ref) => {
    const pieData = {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: backgroundColors,
          hoverBackgroundColor: hoverBackgroundColors,
        },
      ],
    };

    const pieOptions = {
      plugins: {
        legend: {
          display: true,
          position: "bottom",
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    };

    return (
      <div className="pie-chart-container">
        <Pie ref={ref} data={pieData} options={pieOptions} />
      </div>
    );
  }
);

export default PieChart;
