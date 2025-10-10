import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Props {
  factors: {
    income: number;
    emi: number;
    bills: number;
    employment: number;
  };
}

const FactorBarChart: React.FC<Props> = ({ factors }) => {
  const data = {
    labels: ["Income", "EMI", "Bills", "Employment"],
    datasets: [
      {
        label: "Contribution",
        data: [factors.income, factors.emi, factors.bills, factors.employment],
        backgroundColor: ["#14B8A6", "#F87171", "#FBBF24", "#3B82F6"], // teal, red, yellow, blue
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    scales: {
      x: { min: -100, max: 150 }, // adjust to match positive/negative contributions
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return <Bar data={data} options={options} />;
};

export default FactorBarChart;
