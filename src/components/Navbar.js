import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header style={{ background: "white", marginTop: "0" }}>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "right",
          height: "150px",
          verticalAlign: "middle",
        }}
      >
        <Link className="link" to="/voting/admin">
          Home
        </Link>
        <Link className="link" to="/voting/admin/createElection">
          Create Election
        </Link>
        <Link className="link" to="/voting/admin/result">
          Result
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
