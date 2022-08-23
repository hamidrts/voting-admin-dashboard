import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";

const departments = ["grocery", "meat", "paylue", "stock", "public"];

export default function CandidateForm({
  candidateForm,
  setCandidateForm,
  saveCandidate,
  cancelCandidate,
  candidateFormError,
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
          error={candidateFormError.candidNameError}
          className={candidateForm.candidName ? "active" : "passive"}
          required
          id="outlined-candid-name"
          label="Candidate Name"
          value={candidateForm.candidName}
          onChange={(event) =>
            setCandidateForm((previous) => {
              return { ...previous, candidName: event.target.value };
            })
          }
        />
        <TextField
          error={candidateFormError.familyError}
          className={candidateForm.family ? "active" : "passive"}
          required
          id="outlined-candid-family"
          label="Candidate family"
          value={candidateForm.family}
          onChange={(event) =>
            setCandidateForm((previous) => {
              return { ...previous, family: event.target.value };
            })
          }
        />
        <TextField
          error={candidateFormError.picError}
          className={candidateForm.pic ? "active" : "passive"}
          required
          id="outlined-candid-pic"
          label="Candidate picture"
          value={candidateForm.pic}
          onChange={(event) =>
            setCandidateForm((previous) => {
              return { ...previous, pic: event.target.value };
            })
          }
        />
        <TextField
          error={candidateFormError.achivementError}
          className={candidateForm.achivement ? "active" : "passive"}
          id="outlined-candid-achivement"
          label="Candidate Achivements"
          value={candidateForm.achivement}
          multiline
          rows={4}
          onChange={(event) =>
            setCandidateForm((previous) => {
              return { ...previous, achivement: event.target.value };
            })
          }
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
