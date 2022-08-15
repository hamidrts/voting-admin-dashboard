import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";

const departments = ["grocery", "meat", "paylue", "stock", "public"];

export default function CandidateForm({
  candidName,
  setCandidName,
  family,
  setFamily,
  pic,
  setPic,
  achivement,
  setAchivement,
  saveCandidate,
  cancelCandidate,
  candidNameError,
  familyError,
  picError,
  achivementError,
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
      <div>
        <TextField
          error={candidNameError}
          className={candidName ? "active" : "passive"}
          required
          id="outlined-candid-name"
          label="Candidate Name"
          value={candidName}
          onChange={(event) => setCandidName(event.target.value)}
        />
        <TextField
          error={familyError}
          className={family ? "active" : "passive"}
          required
          id="outlined-candid-family"
          label="Candidate family"
          value={family}
          onChange={(event) => setFamily(event.target.value)}
        />
        <TextField
          error={picError}
          className={pic ? "active" : "passive"}
          required
          id="outlined-candid-pic"
          label="Candidate picture"
          value={pic}
          onChange={(event) => setPic(event.target.value)}
        />
        <TextField
          error={achivementError}
          className={achivement ? "active" : "passive"}
          id="outlined-candid-achivement"
          label="Candidate Achivements"
          value={achivement}
          multiline
          rows={4}
          onChange={(event) => setAchivement(event.target.value)}
        />
      </div>
      <Button onClick={saveCandidate} variant="contained">
        Save
      </Button>
      <Button onClick={cancelCandidate} variant="contained">
        Cancel
      </Button>
    </Box>
  );
}
