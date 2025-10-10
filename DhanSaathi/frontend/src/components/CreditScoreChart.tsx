import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip);

interface Props {
  score: number;
}

const CreditScoreChart: React.FC<Props> = ({ score }) => {
  const data = {
    datasets: [
      {
        data: [score - 300, 900 - score], // score in 300–900 range
        backgroundColor: ["#14B8A6", "#E5E7EB"], // teal for score, gray for remainder
        borderWidth: 0,
      },
    ],
  };

  const options = {
    rotation: -90,
    circumference: 180,
    cutout: "70%",
    plugins: {
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="relative w-64 h-32 mx-auto">
  <Doughnut data={data} options={options} />
  {/* Adjust top to 50% of chart height */}
 <div className="absolute top-1/2 left-1/2 transform -translate-x-[240%] -translate-y-[10%] text-center font-bold text-xl">
  {score}
</div>
</div>

  );
};

export default CreditScoreChart;
