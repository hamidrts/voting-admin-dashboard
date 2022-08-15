import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function ElectionCart({
  department,
  electionName,
  term,
  status,
  startDate,
  finishDate,
  id,
  selectElection,
}) {
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          marginRigh: "25px",
          marginLeft: "25px",
          marginTop: "25px",
          border: "solid 1px gray",
        }}
      >
        <div
          style={{
            display: "grid",
            justifyContent: "space-between",
            gridTemplateColumns: "1fr 1fr 1fr",
          }}
        >
          <div>
            <h4 style={{ display: "inline" }}>Departmant:</h4>
            {department}
          </div>
          <div>
            <h4 style={{ display: "inline" }}>ElectionName:</h4>
            {electionName}
          </div>
          <div>
            <h4 style={{ display: "inline" }}>Term:</h4>
            {term}
          </div>
        </div>
        <div
          style={{
            display: "grid",
            justifyContent: "space-between",
            gridTemplateColumns: "1fr 1fr 1fr",
          }}
        >
          <div>
            <h4 style={{ display: "inline" }}>StartDate:</h4>
            {startDate}
          </div>
          <div>
            <h4 style={{ display: "inline" }}>FinishDate:</h4>
            {finishDate}
          </div>
          <div>
            <h4 style={{ display: "inline" }}>Status:</h4>
            {status}
          </div>
        </div>
      </div>
      <div>
        <Button
          onClick={selectElection}
          id={id}
          variant="contained"
          style={{ marginTop: "25px" }}
        >
          Update
        </Button>
      </div>
    </div>
  );
}

export default ElectionCart;
