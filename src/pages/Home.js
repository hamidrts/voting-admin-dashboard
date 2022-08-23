import React from "react";
import { useEffect, useState, useContext } from "react";

import ElectionCart from "../components/ElectionCart";
import ElectionMainForm from "../components/ElectionMainForm";
import Filter from "../components/Filter";
import { useLoginContext } from "../hooks/useLoginContext";

function Home() {
  const { user } = useLoginContext();
  const [initialElectionForm, setInitialElectionForm] = useState({
    department: "",
    electionName: "",
    term: "",
    startDate: "",
    finishDate: "",
    status: "",
  });

  const [department, setDepartment] = useState("");
  const [term, setTerm] = useState("");
  const [status, setStatus] = useState("");
  const [displayArray, setDisplayArray] = useState([]);

  const [displayUpdate, setDisplayUpdate] = useState(false);

  const [initialCandidateArray, setInitialCandidateArray] = useState("");
  const [electionId, setElectionId] = useState("");

  const [updateFilter, setUpdateFilter] = useState(false);
  const [update3Election, setUpdate3Election] = useState(true);

  useEffect(() => {
    console.log("hey", user);
    const fetchLast3Election = async () => {
      const responce = await fetch("/voting/admin/", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!responce.ok) {
        console.log(responce.error);
        // console.log(responce.status, responce.statusText);
      } else {
        let last3Election = await responce.json();
        console.log(last3Election);
        setDisplayArray(last3Election);
      }
    };

    if (user) {
      fetchLast3Election();
    }

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
        status,
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    console.log(response);

    if (!response.ok) {
      console.log(response);
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
    setInitialElectionForm({
      ...initialElectionForm,
      department: choosedElection.department,
      electionName: choosedElection.electionName,
      term: choosedElection.term,
      startDate: choosedElection.startDate,
      finishDate: choosedElection.finishDate,
      status: choosedElection.status,
    });
    console.log(choosedElection);
    setInitialCandidateArray(choosedElection.candidates);
    setElectionId(choosedElection._id);
    setDisplayUpdate(true);
  };

  const handleCancel = () => {
    setDisplayUpdate(false);
  };

  const updateElection = async (election) => {
    let rout = "/voting/admin/" + electionId;
    const response = await fetch(rout, {
      method: "PATCH",
      body: JSON.stringify(election),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    return response;
  };

  const additionalTask = () => {
    if (updateFilter) {
      fetchFilteredData();
    } else {
      if (update3Election) {
        setUpdate3Election(false);
      } else {
        setUpdate3Election(true);
      }
    }
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
              startDate={election.startDate.slice(0, 10)}
              finishDate={election.finishDate.slice(0, 10)}
              id={election._id}
              selectElection={selectElection}
            />
          );
        })}
        {displayUpdate ? (
          <ElectionMainForm
            conectWithServer={updateElection}
            additionalTask={additionalTask}
            initialElectionForm={initialElectionForm}
            initialCandidateArray={initialCandidateArray}
            handleCancel={handleCancel}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Home;
