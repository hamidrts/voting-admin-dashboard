import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";

const departments = ["grocery", "meat", "paylue", "stock", "public"];
const statuses = ["open", "close", "planned", "cancel", "draft"];

export default function ElectionForm({
  department,
  setDepartment,
  name,
  setName,
  term,
  setTerm,
  startDate,
  setStartDate,
  finishDate,
  setFinishDate,
  status,
  setStatus,
  setSubmitError,
  departmentError,
  nameError,
  termError,
  startDateError,
  finishDateError,
  statusError,
}) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          error={departmentError}
          className={department ? "active" : "passive"}
          required
          id="outlined-select-departmant"
          select
          label="Departmant"
          value={department}
          onChange={(event) => {
            setDepartment(event.target.value);
            setSubmitError("");
          }}
          helperText="Please select your departmant"
        >
          {departments.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          error={nameError}
          className={name ? "active" : "passive"}
          required
          id="outlined-election-name"
          label="Election Name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setSubmitError("");
          }}
        />
        <TextField
          error={termError}
          className={term ? "active" : "passive"}
          id="outlined-number"
          label="Term"
          type="number"
          value={term}
          onChange={(event) => {
            setTerm(event.target.value);
            setSubmitError("");
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          error={startDateError}
          className={startDate ? "active" : "passive"}
          id="outlined-number"
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(event) => {
            setStartDate(event.target.value);
            setSubmitError("");
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          error={finishDateError}
          className={finishDate ? "active" : "passive"}
          id="outlined-number"
          label="Finish Date"
          type="date"
          value={finishDate}
          onChange={(event) => {
            setFinishDate(event.target.value);
            setSubmitError("");
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          error={statusError}
          className={status ? "active" : "passive"}
          required
          id="outlined-select-status"
          select
          label="Status"
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setSubmitError("");
          }}
          helperText="Please select current status"
        >
          {statuses.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
}
