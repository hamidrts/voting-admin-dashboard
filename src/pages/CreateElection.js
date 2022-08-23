import React from "react";
import ElectionMainForm from "../components/ElectionMainForm";
import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useLoginContext } from "../hooks/useLoginContext";

function CreateElection() {
  const { user } = useLoginContext();

  const initialElectionForm = {
    department: "",
    electionName: "",
    term: "",
    startDate: "",
    finishDate: "",
    status: "",
  };

  const initialCandidateArray = [];

  const postElection = async (election) => {
    const response = await fetch("/voting/admin/createElection", {
      method: "POST",
      body: JSON.stringify(election),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    return response;
  };

  const additionalTask = () => {};

  const handleCancel = () => {};

  return (
    <div>
      <ElectionMainForm
        conectWithServer={postElection}
        additionalTask={additionalTask}
        initialElectionForm={initialElectionForm}
        initialCandidateArray={initialCandidateArray}
        handleCancel={handleCancel}
      />
    </div>
  );
}

export default CreateElection;
