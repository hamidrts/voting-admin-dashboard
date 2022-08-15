import React from "react";
import ElectionForm from "../components/electionForm";
import { useState, useEffect } from "react";
import CandidateForm from "../components/candidateForm";
import CandidateCard from "../components/candidateCart";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function CreateElection({
  updateDepartment,
  updateName,
  updateTerm,
  updateStartDate,
  updateFinishDate,
  updateStatus,
  updateCandidate,
  electionId,
  setDisplayUpdate,
}) {
  const [department, setDepartment] = useState(updateDepartment);
  const [name, setName] = useState(updateName);
  const [term, setTerm] = useState(updateTerm);
  const [startDate, setStartDate] = useState(updateStartDate);
  const [finishDate, setFinishDate] = useState(updateFinishDate);
  const [status, setStatus] = useState(updateStatus);

  const [departmentError, setDepartmentError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [termError, setTermError] = useState(false);
  const [startDateError, setStartDateError] = useState(false);
  const [finishDateError, setFinishDateError] = useState(false);
  const [statusError, setStatusError] = useState(false);

  const [candidNameError, setcandidNameError] = useState(false);
  const [familyError, setfamilyError] = useState(false);
  const [picError, setpicError] = useState(false);
  const [achivementError, setachivementError] = useState(false);

  const [candidName, setCandidName] = useState("");
  const [family, setFamily] = useState("");
  const [pic, setPic] = useState("");
  const [achivement, setAchivement] = useState("");

  const [candidatesArray, setCandidatesArray] = useState(updateCandidate);

  const [renderCandidateForm, setRenderCandidateForm] = useState(false);

  const [submitError, setSubmitError] = useState("");

  const saveCandidate = () => {
    let fillError = false;
    if (!candidName) {
      fillError = true;
      setcandidNameError(true);
    } else {
      setcandidNameError(false);
    }
    if (!family) {
      fillError = true;
      setfamilyError(true);
    } else {
      setfamilyError(false);
    }
    if (!pic) {
      fillError = true;
      setpicError(true);
    } else {
      setpicError(false);
    }
    if (!achivement) {
      fillError = true;
      setachivementError(true);
    } else {
      setachivementError(false);
    }
    if (!fillError) {
      let id = new Date().getTime();

      let candidate = {
        candidName: candidName,
        family: family,
        pic: pic,
        achivement: achivement,
        id: id,
      };
      setCandidatesArray((previous) => {
        return [...previous, candidate];
      });

      setCandidName("");
      setFamily("");
      setPic("");
      setAchivement("");
      setRenderCandidateForm(false);
    }
  };

  const cancelCandidate = () => {
    setRenderCandidateForm(false);
    setCandidName("");
    setFamily("");
    setPic("");
    setAchivement("");
    setcandidNameError(false);
    familyError(false);
    setpicError(false);
    setachivementError(false);
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
        setCandidName(item.candidName);
        setFamily(item.family);
        setPic(item.pic);
        setAchivement(item.achivement);
      }
    });
    let filterArray = candidatesArray.filter((item) => {
      return item.id != Number(e.target.id / 2);
    });

    setCandidatesArray(filterArray);
  };

  const handleSubmit = async () => {
    let fillError = false;
    if (!department) {
      setDepartmentError(true);
      fillError = true;
    } else {
      setDepartmentError(false);
    }
    if (!name) {
      setNameError(true);
      fillError = true;
    } else {
      setNameError(false);
    }
    if (!term) {
      setTermError(true);
      fillError = true;
    } else {
      setTermError(false);
    }
    if (!startDate) {
      setStartDateError(true);
      fillError = true;
    } else {
      setStartDateError(false);
    }
    if (!finishDate) {
      setFinishDateError(true);
      fillError = true;
    } else {
      setFinishDateError(false);
    }
    if (!status) {
      setStatusError(true);
      fillError = true;
    } else {
      setStatusError(false);
    }
    if (candidatesArray.length === 0) {
      setSubmitError("Please add candidate");
      fillError = true;
    } else {
      setSubmitError("");
    }
    if (fillError === false) {
      const election = {
        department: department,
        electionName: name,
        term: term,
        startDate: startDate,
        finishDate: finishDate,
        status: status,
        candidates: candidatesArray,
      };
      const response = await fetch("/voting/admin/createElection", {
        method: "POST",
        body: JSON.stringify(election),
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      if (!response.ok) {
        console.log(json.error);
        setSubmitError("Please fill all fields!");
      }
      if (response.ok) {
        setSubmitError("your Election succesfully created!");
        setDepartment("");
        setName("");
        setTerm("");
        setStartDate("");
        setFinishDate("");
        setStatus("");
        setCandidatesArray([]);
      }
    }
  };

  const handleCancelSubmit = () => {
    setDepartment("");
    setName("");
    setTerm("");
    setStartDate("");
    setFinishDate("");
    setStatus("");
    setCandidatesArray([]);
    setRenderCandidateForm(false);
    setCandidName("");
    setFamily("");
    setPic("");
    setAchivement("");
    setcandidNameError(false);
    familyError(false);
    setpicError(false);
    setachivementError(false);
    setDepartmentError(false);
    setNameError(false);
    setTermError(false);
    setStartDateError(false);
    setFinishDateError(false);
    setStatusError(false);
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
          department={department}
          setDepartment={setDepartment}
          name={name}
          setName={setName}
          term={term}
          setTerm={setTerm}
          startDate={startDate}
          setStartDate={setStartDate}
          finishDate={finishDate}
          setFinishDate={setFinishDate}
          setStatus={setStatus}
          status={status}
          setSubmitError={setSubmitError}
          departmentError={departmentError}
          nameError={nameError}
          termError={termError}
          startDateError={startDateError}
          finishDateError={finishDateError}
          statusError={statusError}
        />
        <div style={{ display: "flex" }}>
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
                candidName={candidName}
                setCandidName={setCandidName}
                family={family}
                setFamily={setFamily}
                pic={pic}
                setPic={setPic}
                achivement={achivement}
                setAchivement={setAchivement}
                saveCandidate={saveCandidate}
                cancelCandidate={cancelCandidate}
                candidNameError={candidNameError}
                familyError={familyError}
                picError={picError}
                achivementError={achivementError}
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

export default CreateElection;
