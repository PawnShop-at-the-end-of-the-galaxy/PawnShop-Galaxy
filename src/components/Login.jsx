import React, { useState } from "react";
import { loginUser } from "../axios-services/users";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import styles from "../style/Login.module.css";
import "../style/App.css";
function Login() {
  const { setToken, setUser, token, user } = useAuth();
  // States for login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className={styles.login_box}>
      <h2>Log in</h2>
      {!token ? (
        <h2>Please log in or register</h2>
      ) : (
        <h2>Hello, {user ? user.username : "Guest!"}</h2>
      )}

      <form
        onSubmit={async (ev) => {
          ev.preventDefault();
          console.log("username password:", username, password);
          const result = await loginUser(username, password);

          localStorage.setItem("token", result.token);
          setToken(result.token);
          // console.log("token:", token);

          setUsername("");
          setPassword("");

          // navigate("/", { replace: true });
        }}
      >
        <div className={styles.user_box}>
          <input
            value={username}
            type="text"
            required
            min="6"
            onChange={(ev) => {
              setUsername(ev.target.value);
            }}
            
          />
          <label>Username</label>
        </div>
        <div className={styles.user_box}>
          <input
            value={password}
            type="password"
            min="8"
            required
            onChange={(ev) => {
              setPassword(ev.target.value);
            }}
          />
          <label>Password</label>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.submit} type="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Log in
          </button>
          <button
            className={styles.submit}
            onClick={() => {
              localStorage.removeItem("token");
              setToken(localStorage.getItem("token"));
              setUser({});
            }}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Logout
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
