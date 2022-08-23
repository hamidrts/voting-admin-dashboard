import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";

const departments = ["grocery", "meat", "paylue", "stock", "public"];
const statuses = ["open", "close", "planned", "cancel", "draft"];

export default function ElectionForm({
  electionForm,
  setElectionForm,
  setSubmitError,
  electionFormError,
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
          error={electionFormError.departmentError}
          className={electionForm.department ? "active" : "passive"}
          required
          id="outlined-select-departmant"
          select
          label="Departmant"
          value={electionForm.department}
          onChange={(event) => {
            setElectionForm((previous) => {
              return { ...previous, department: event.target.value };
            });
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
          error={electionFormError.electionNameError}
          className={electionForm.electionName ? "active" : "passive"}
          required
          id="outlined-election-name"
          label="Election Name"
          value={electionForm.electionName}
          onChange={(event) => {
            setElectionForm((previous) => {
              return { ...previous, electionName: event.target.value };
            });
            setSubmitError("");
          }}
        />
        <TextField
          error={electionFormError.termError}
          className={electionForm.term ? "active" : "passive"}
          id="outlined-number"
          label="Term"
          type="number"
          value={electionForm.term}
          onChange={(event) => {
            setElectionForm((previous) => {
              return { ...previous, term: event.target.value };
            });
            setSubmitError("");
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          error={electionFormError.startDateError}
          className={electionForm.startDate ? "active" : "passive"}
          id="outlined-number"
          label="Start Date"
          type="date"
          value={electionForm.startDate}
          onChange={(event) => {
            setElectionForm((previous) => {
              return { ...previous, startDate: event.target.value };
            });
            setSubmitError("");
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          error={electionFormError.finishDateError}
          className={electionForm.finishDate ? "active" : "passive"}
          id="outlined-number"
          label="Finish Date"
          type="date"
          value={electionForm.finishDate}
          onChange={(event) => {
            setElectionForm((previous) => {
              return { ...previous, finishDate: event.target.value };
            });
            setSubmitError("");
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          error={electionFormError.statusError}
          className={electionForm.status ? "active" : "passive"}
          required
          id="outlined-select-status"
          select
          label="Status"
          value={electionForm.status}
          onChange={(event) => {
            setElectionForm((previous) => {
              return { ...previous, status: event.target.value };
            });
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
