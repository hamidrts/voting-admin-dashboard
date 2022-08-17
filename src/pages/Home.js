import React from "react";
import { useEffect, useState } from "react";
import ElectionCart from "../components/ElectionCart";
import Filter from "../components/Filter";
import UpdateElection from "../components/UpdateElection";

const test = 1;

function Home() {
  const [department, setDepartment] = useState("");
  const [term, setTerm] = useState("");
  const [status, setStatus] = useState("");
  const [displayArray, setDisplayArray] = useState([]);

  const [displayUpdate, setDisplayUpdate] = useState(false);

  const [updateDepartment, setUpdateDepartment] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateTerm, setUpdateTerm] = useState("");
  const [updateStartDate, setUpdateStartDate] = useState("");
  const [updateFinishDate, setUpdateFinishDate] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateCandidate, setUpdateCandidate] = useState("");
  const [electionId, setElectionId] = useState("");

  const [updateFilter, setUpdateFilter] = useState(false);
  const [update3Election, setUpdate3Election] = useState(true);

  useEffect(() => {
    const fetchLast3Election = async () => {
      const responce = await fetch("/voting/admin/");
      if (!responce.ok) {
        // console.log(responce);
        // console.log(responce.status, responce.statusText);
      } else {
        let last3Election = await responce.json();
        console.log(last3Election);
        setDisplayArray(last3Election);
      }
    };
    fetchLast3Election();
    setUpdateFilter(false);
  }, [update3Election]);

  const fetchFilteredData = async () => {
    let searchItem = {};
    if (department) {
      searchItem.department = department;
    }
    if (term) {
      searchItem.term = term;
    }
    if (status) {
      searchItem.status = status;
    }

    let response = await fetch(
      "/voting/admin/createElection/getelection?department=" +
        department +
        "&term=" +
        term +
        "&status=" +
        status
    );
    console.log(response);

    if (!response.ok) {
      console.log(response);
      console.log(response.status, response.statusText);
    } else {
      let filterResult = await response.json();
      setDisplayArray(filterResult);
    }
    setUpdateFilter(true);
  };

  const selectElection = (e) => {
    let choosedElection;

    displayArray.forEach((election) => {
      if (election._id == e.target.id) {
        choosedElection = election;
      }
    });
    setUpdateDepartment(choosedElection.department);
    setUpdateName(choosedElection.electionName);
    setUpdateTerm(choosedElection.term);
    setUpdateStartDate(choosedElection.startDate);
    setUpdateFinishDate(choosedElection.finishDate);
    setUpdateStatus(choosedElection.status);
    setUpdateCandidate(choosedElection.candidates);
    setElectionId(choosedElection._id);
    setDisplayUpdate(true);
  };

  const handleCancel = () => {
    setDisplayUpdate(false);
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
        <Filter
          department={department}
          term={term}
          status={status}
          setTerm={setTerm}
          setDepartment={setDepartment}
          setStatus={setStatus}
          fetchFilteredData={fetchFilteredData}
        />
        {displayArray.map((election) => {
          return (
            <ElectionCart
              key={election._id}
              department={election.department}
              electionName={election.electionName}
              term={election.term}
              status={election.status}
              startDate={election.startDate}
              finishDate={election.finishDate}
              id={election._id}
              selectElection={selectElection}
            />
          );
        })}
        {displayUpdate ? (
          <UpdateElection
            updateDepartment={updateDepartment}
            updateName={updateName}
            updateTerm={updateTerm}
            updateStartDate={updateStartDate}
            updateFinishDate={updateFinishDate}
            updateStatus={updateStatus}
            updateCandidate={updateCandidate}
            electionId={electionId}
            setDisplayUpdate={setDisplayUpdate}
            handleCancel={handleCancel}
            updateFilter={updateFilter}
            update3Election={update3Election}
            fetchFilteredData={fetchFilteredData}
            setUpdate3Election={setUpdate3Election}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Home;
