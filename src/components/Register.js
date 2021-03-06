import "./Components.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../App";

const Register = (props) => {
  const token = props.token;
  const setToken = props.setToken;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      return setErrorMessage("Passwords do not match");
    }
    const response = await fetch(`${baseUrl}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const info = await response.json();

    if (info.error) {
      return setErrorMessage(info.error);
    }

    localStorage.setItem("token", info.token);
    setToken(info.token);
  };

  return (
    <>
      <h1 className="page_title">Register</h1>
      <div className="register">
        <form onSubmit={handleSubmit}>
          <input
            className="login_input"
            placeholder="Enter username"
            minLength={6}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          ></input>
          <input
            className="login_input"
            type="password"
            min={8}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <input
            className="login_input"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></input>
          <button className="login_button">Register</button>
          <p className="errorMessage">{errorMessage}</p>
        </form>
        <Link to="/login">Already have an account? Click here to log in.</Link>
      </div>
    </>
  );
};

export default Register;
