import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minWidth: "300px",
          minHeight: "300px",
          alignItems: "center",
          position: "fixed",
          top: "50%",
          left: "50%",
          background: "white",
          borderRadius: "5px",
          marginLeft: "-150px",
          marginTop: "-150px",
        }}
      >
        <TextField
          style={{ marginTop: "25px" }}
          id="outlined-password-input"
          label="Username"
          type="username"
          autoComplete="current-password"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
        />
        <TextField
          style={{ marginTop: "25px" }}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />

        <Button onClick={handleSubmit} disabled={isLoading} variant="contained">
          Log in
        </Button>
        {error && <div style={{ marginTop: "25px" }}>{error}</div>}
      </div>
    </Box>
  );
}

export default Login;
