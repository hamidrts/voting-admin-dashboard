import React from "react";
import CandidatesCard from "./CandidatesCard";
import Button from "@mui/material/Button";
import { useLoginContext } from "../hooks/useLoginContext";

function ElectionCard({
  election,
  handleSelectElection,
  ifElectionSelect,
  handleSeeResult,
  handleCloseElection,
}) {
  const { user } = useLoginContext();

  return (
    <div className={ifElectionSelect ? "inactive" : "election"}>
      <div className="election-card">
        <div className="election-specification">
          <div>
            <h4 className="inline-block">Department:</h4>
            {election.department}
          </div>
          <div>
            <h4 className="inline-block">Election Name:</h4>
            {election.electionName}
          </div>
          <div>
            <h4 className="inline-block">Term:</h4>
            {election.term}
          </div>
          <div>
            <h4 className="inline-block">Startdate:</h4>
            {election.startDate.slice(0, 10)}
          </div>
          <div>
            <h4 className="inline-block">Finishdate:</h4>
            {election.finishDate.slice(0, 10)}
          </div>
        </div>
        <div className="candidate-previwe">
          {election.candidates.map((item) => {
            return (
              <div style={{ marginLeft: "25px" }} key={item._id}>
                <CandidatesCard candidate={item} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="select-button-holder">
        <Button
          id={election._id}
          onClick={handleSelectElection}
          disabled={!user || ifElectionSelect || election.status === "close"}
          className="select-button"
          variant="contained"
        >
          Update Election
        </Button>

        <Button
          id={election._id}
          onClick={handleSeeResult}
          disabled={!user || ifElectionSelect || election.status !== "close"}
          className="select-button"
          variant="contained"
        >
          See Result
        </Button>
        <Button
          id={election._id}
          onClick={handleCloseElection}
          disabled={!user || ifElectionSelect || election.status !== "open"}
          className="select-button"
          variant="contained"
        >
          Close Election
        </Button>
      </div>
    </div>
  );
}

export default ElectionCard;
