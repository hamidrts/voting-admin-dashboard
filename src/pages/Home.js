import React from "react";
import { useEffect, useState, useContext } from "react";
import ElectionCard from "../components/ElectionCard";
import ElectionMainForm from "../components/ElectionMainForm";
import Filter from "../components/Filter";
import { useLoginContext } from "../hooks/useLoginContext";
import Chart from "../components/Chart";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

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
  const [ifElectionSelect, setIfElectionSelect] = useState(false);

  const [result, setResult] = useState("");
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
    socket.on("receive_message", (data) => {
      console.log(data.message);
    });
  }, [socket]);

  useEffect(() => {
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

    setInitialCandidateArray(choosedElection.candidates);
    setElectionId(choosedElection._id);
    setDisplayUpdate(true);
    setIfElectionSelect(true);
  };

  const handleCancel = () => {
    setDisplayUpdate(false);
    setIfElectionSelect(false);
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

  const handleSeeResult = (evt) => {
    let choosedElection;

    displayArray.forEach((election) => {
      if (election._id == evt.target.id) {
        choosedElection = election;
      }
    });

    let labelOfChart = [];

    let dataOfChart = [];

    choosedElection.candidates.forEach((candid) => {
      choosedElection.result.votes.forEach((result) => {
        if (candid._id === result.candid) {
          dataOfChart.push(result.votes);
          labelOfChart.push(candid.candidName + " " + result.votes);
        }
      });
    });

    const data = {
      labels: labelOfChart,
      datasets: [
        {
          label: "# of Votes",
          data: dataOfChart,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    setResult(data);
    console.log(result);
  };

  const handleCloseElection = async (e) => {
    let choosedElection;

    displayArray.forEach((election) => {
      if (election._id == e.target.id) {
        choosedElection = election;
      }
    });
    let rout = "/voting/admin/close/" + choosedElection._id;
    const response = await fetch(rout, {
      method: "PATCH",
      body: JSON.stringify(choosedElection),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (!response.ok) {
      console.log(response);
    } else {
      let election = await response.json();
      console.log("closet Election:", election);
      election.status = "close";
      console.log("displayArray", displayArray);
      let newArray = displayArray.map((item) => {
        if (item._id === election._id) {
          return election;
        } else {
          return item;
        }
      });
      console.log("newArray", newArray);

      setDisplayArray(newArray);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
          paddingBottom: "25px",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            paddingBottom: "25px",
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
          {displayArray.map((election, key) => {
            return (
              <ElectionCard
                key={key}
                ifElectionSelect={ifElectionSelect}
                election={election}
                handleSelectElection={selectElection}
                handleSeeResult={handleSeeResult}
                handleCloseElection={handleCloseElection}
              />
            );
          })}
          {displayUpdate && (
            <ElectionMainForm
              conectWithServer={updateElection}
              additionalTask={additionalTask}
              initialElectionForm={initialElectionForm}
              initialCandidateArray={initialCandidateArray}
              handleCancel={handleCancel}
            />
          )}
        </div>
      </div>
      <div>{result && <Chart result={result} setResult={setResult} />}</div>
    </div>
  );
}

export default Home;
