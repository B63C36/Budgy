"use client";

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import "../styling/tracker.css";
import Sidebar from '../tools/sidebar';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const data = {
  labels: ['January', 'February', 'March', 'April'],
  datasets: [
    {
      label: 'Income',
      data: [3000, 3200, 2800, 3500],
      borderColor: 'green',
      fill: false,
    },
    {
      label: 'Spending',
      data: [2500, 2700, 2600, 3000],
      borderColor: 'red',
      fill: false,
    },
  ],
};

export default function Tracker() {
  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-content">
        <h1>📊 Monthly Expense Tracker</h1>
        <div className="chart-container">
          <Line data={data} />
        </div>
      </div>
    </div>
  );
}
