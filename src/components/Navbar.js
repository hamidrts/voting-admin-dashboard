import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useLoginContext } from "../hooks/useLoginContext";

function Navbar() {
  const { user } = useLoginContext();
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };

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
        {user && (
          <div
            style={{
              display: "flex",
              justifyContent: "spaceBetween",
              height: "150px",
              verticalAlign: "middle",
            }}
          >
            <div>
              <Link className="link" to="/">
                Home
              </Link>
              <Link className="link" to="/createElection">
                Create Election
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "right",
                height: "150px",
                verticalAlign: "middle",
              }}
            >
              <div>{user.username}</div>
              <button onClick={handleLogout}>Log Out</button>
            </div>
          </div>
        )}
        {!user && (
          <Link className="link" to="/voting/admin/login">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
