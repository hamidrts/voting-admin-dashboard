import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Button from "@mui/material/Button";

ChartJS.register(ArcElement, Tooltip, Legend);

/* export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
 */
export default function Chart({ result, setResult }) {
  return (
    <div className="chart-holder">
      <div className="chart">
        <Pie data={result} width={20} height={20} />
      </div>

      <div className="select-button-holder">
        <Button
          onClick={() => {
            setResult("");
          }}
          className="select-button"
          variant="contained"
        >
          Close
        </Button>
      </div>
    </div>
  );
}
