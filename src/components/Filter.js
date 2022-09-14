import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

const departments = ["grocery", "meat", "paylue", "stock", "public", "none"];
const statuses = ["open", "close", "planned", "cancel", "draft", "none"];

function Filter({
  department,
  term,
  status,
  setDepartment,
  setTerm,
  setStatus,
  fetchFilteredData,
}) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "30ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div
        style={{
          display: "flex",

          marginTop: "50px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <TextField
              className={department ? "active" : "passive"}
              id="outlined-select-departmant"
              select
              label="Departmant"
              value={department}
              onChange={(event) => {
                setDepartment(() => {
                  if (event.target.value !== "none") {
                    return event.target.value;
                  }
                });
              }}
            >
              {departments.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <TextField
              className={term ? "active" : "passive"}
              id="outlined-number"
              label="Term"
              type="number"
              value={term}
              onChange={(event) => {
                setTerm(event.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <TextField
              className={status ? "active" : "passive"}
              id="outlined-select-status"
              select
              label="Status"
              value={status}
              onChange={(event) => {
                setStatus(() => {
                  if (event.target.value !== "none") {
                    return event.target.value;
                  }
                });
              }}
            >
              {statuses.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <Button onClick={fetchFilteredData} variant="contained">
              <SearchIcon />
            </Button>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default Filter;
