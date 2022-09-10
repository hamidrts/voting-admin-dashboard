import React from "react";
import ElectionForm from "./ElectionMainFormComponent/electionForm";
import { useState, useEffect } from "react";
import CandidateForm from "./ElectionMainFormComponent/candidateForm";
import CandidateCard from "./ElectionMainFormComponent/candidateCart";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function ElectionMainForm({
  conectWithServer,
  additionalTask,
  initialElectionForm,
  initialCandidateArray,
  handleCancel,
}) {
  const [electionForm, setElectionForm] = useState(initialElectionForm);

  const [electionFormError, setElectionFormError] = useState({
    departmentError: false,
    electionNameError: false,
    termError: false,
    startDateError: false,
    finishDateError: false,
    statusError: false,
  });

  const [candidateForm, setCandidateForm] = useState({
    candidName: "",
    family: "",
    pic: "",
    achivement: "",
  });

  const [candidateFormError, setCandidateFormError] = useState({
    candidNameError: false,
    familyError: false,
    picError: false,
    achivementError: false,
  });

  const [candidatesArray, setCandidatesArray] = useState(initialCandidateArray);

  const [renderCandidateForm, setRenderCandidateForm] = useState(false);

  const [submitError, setSubmitError] = useState("");

  const saveCandidate = () => {
    let fillError = false;
    if (!candidateForm.candidName) {
      fillError = true;
      setCandidateFormError((previous) => {
        return { ...previous, candidNameError: true };
      });
    } else {
      setCandidateFormError((previous) => {
        return { ...previous, candidNameError: false };
      });
    }
    if (!candidateForm.family) {
      fillError = true;
      setCandidateFormError((previous) => {
        return { ...previous, familyError: true };
      });
    } else {
      setCandidateFormError((previous) => {
        return { ...previous, familyError: false };
      });
    }
    if (!candidateForm.pic) {
      fillError = true;
      setCandidateFormError((previous) => {
        return { ...previous, picError: true };
      });
    } else {
      setCandidateFormError((previous) => {
        return { ...previous, picError: false };
      });
    }
    if (!candidateForm.achivement) {
      fillError = true;
      setCandidateFormError((previous) => {
        return { ...previous, achivementError: true };
      });
    } else {
      setCandidateFormError((previous) => {
        return { ...previous, achivementError: false };
      });
    }
    if (!fillError) {
      let id = new Date().getTime();

      let candidate = { ...candidateForm, id: id };
      setCandidatesArray((previous) => {
        return [...previous, candidate];
      });
      setCandidateForm({
        candidName: "",
        family: "",
        pic: "",
        achivement: "",
      });

      setRenderCandidateForm(false);
    }
  };

  const cancelCandidate = () => {
    setRenderCandidateForm(false);
    setCandidateForm({
      candidName: "",
      family: "",
      pic: "",
      achivement: "",
    });

    setCandidateFormError({
      candidNameError: false,
      familyError: false,
      picError: false,
      achivementError: false,
    });
  };

  const handleDelete = (e) => {
    // console.log(candidatesArray);
    let filterArray = candidatesArray.filter((item) => {
      return item.id != Number(e.target.id);
    });
    setCandidatesArray(filterArray);
  };

  const handleUpdate = (e) => {
    setRenderCandidateForm(true);
    candidatesArray.map((item) => {
      if (item.id === Number(e.target.id / 2)) {
        setCandidateForm((previous) => {
          return {
            ...previous,
            candidName: item.candidName,
            family: item.family,
            pic: item.pic,
            achivement: item.achivement,
          };
        });
      }
    });
    let filterArray = candidatesArray.filter((item) => {
      return item.id != Number(e.target.id / 2);
    });

    setCandidatesArray(filterArray);
  };

  const handleSubmit = async () => {
    let fillError = false;
    if (!electionForm.department) {
      setElectionFormError((previous) => {
        return { ...previous, departmentError: true };
      });
      fillError = true;
    } else {
      setElectionFormError((previous) => {
        return { ...previous, departmentError: false };
      });
    }
    if (!electionForm.electionName) {
      setElectionFormError((previous) => {
        return { ...previous, electionNameError: true };
      });
      fillError = true;
    } else {
      setElectionFormError((previous) => {
        return { ...previous, electionNameError: false };
      });
    }
    if (!electionForm.term) {
      setElectionFormError((previous) => {
        return { ...previous, termError: true };
      });
      fillError = true;
    } else {
      setElectionFormError((previous) => {
        return { ...previous, termError: false };
      });
    }
    if (!electionForm.startDate) {
      setElectionFormError((previous) => {
        return { ...previous, startDateError: true };
      });
      fillError = true;
    } else {
      setElectionFormError((previous) => {
        return { ...previous, startDateError: false };
      });
    }
    if (!electionForm.finishDate) {
      setElectionFormError((previous) => {
        return { ...previous, finishDateError: true };
      });
      fillError = true;
    } else {
      setElectionFormError((previous) => {
        return { ...previous, finishDateError: false };
      });
    }
    if (!electionForm.status) {
      setElectionFormError((previous) => {
        return { ...previous, statusError: true };
      });
      fillError = true;
    } else {
      setElectionFormError((previous) => {
        return { ...previous, statusError: false };
      });
    }
    if (electionForm.startDate > electionForm.finishDate) {
      fillError = true;
    }

    if (candidatesArray.length === 0) {
      setSubmitError("Please add candidate");
      fillError = true;
    } else {
      setSubmitError("");
    }
    if (fillError === false) {
      const election = { ...electionForm, candidates: candidatesArray };

      const response = await conectWithServer(election);

      const json = await response.json();
      if (!response.ok) {
        console.log(json.error, ":hey");
        setSubmitError("Please fill all fields!");
      }
      if (response.ok) {
        console.log(json);
        setSubmitError("your Election succesfully created!");
        setElectionForm({
          department: "",
          electionName: "",
          term: "",
          startDate: "",
          finishDate: "",
          status: "",
        });
        setCandidatesArray([]);
        additionalTask();
      }
    }
  };

  const handleCancelSubmit = () => {
    setElectionForm({
      department: "",
      electionName: "",
      term: "",
      startDate: "",
      finishDate: "",
      status: "",
    });
    setCandidatesArray([]);
    setRenderCandidateForm(false);
    setCandidateForm({
      candidName: "",
      family: "",
      pic: "",
      achivement: "",
    });
    setCandidateFormError({
      candidNameError: false,
      familyError: false,
      picError: false,
      achivementError: false,
    });
    setElectionFormError({
      departmentError: false,
      electionNameError: false,
      termError: false,
      startDateError: false,
      finishDateError: false,
      statusError: false,
    });

    handleCancel();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",

          background: "white",
        }}
      >
        <h3 style={{ marginTop: "25px", marginBottom: "35px" }}>Election</h3>
        <ElectionForm
          electionForm={electionForm}
          setElectionForm={setElectionForm}
          setSubmitError={setSubmitError}
          setElectionFormError={setElectionFormError}
          electionFormError={electionFormError}
        />
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {candidatesArray.map((candid) => {
            return (
              <CandidateCard
                candidName={candid.candidName}
                family={candid.family}
                pic={candid.pic}
                achivement={candid.achivement}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                id={candid.id}
                key={candid.id}
              />
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "50px",
            borderBottom: "1px solid gray",
            paddingBottom: "5px",
            marginBottom: "20px",
          }}
        >
          <h4>Add candidate</h4>
          <div>
            <Button
              onClick={() => {
                setRenderCandidateForm(true);
                setSubmitError("");
              }}
              variant="contained"
            >
              <AddCircleOutlineIcon />
            </Button>
          </div>
        </div>
        <div>
          <div>
            {renderCandidateForm ? (
              <CandidateForm
                candidateForm={candidateForm}
                setCandidateForm={setCandidateForm}
                saveCandidate={saveCandidate}
                cancelCandidate={cancelCandidate}
                candidateFormError={candidateFormError}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
          <Button onClick={handleCancelSubmit} variant="contained">
            Cancel
          </Button>
        </div>
        <div>{submitError}</div>
      </div>
    </div>
  );
}

export default ElectionMainForm;
