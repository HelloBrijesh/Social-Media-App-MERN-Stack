import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    let refresh_token = window.localStorage.getItem("refresh_token");
    let access_token = window.localStorage.getItem("access_token");
    if (refresh_token && access_token) {
      window.location.href = "/user";
    }
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:5000/api/login", {
      email,
      password,
    });

    if (response.data.status === "success") {
      window.localStorage.setItem("access_token", response.data.access_token);
      window.localStorage.setItem("refresh_token", response.data.refresh_token);
      window.location.href = "/user";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="flex flex-col items-center my-20 w-full">
        <input type="text" placeholder="Email" required className="border p-1" onChange={(e) => setEmail(e.target.value)} />
        <br />
        <input type="password" placeholder="Password" required className="border p-1" onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit" className="content-center px-3 py-1 rounded bg-sky-500 hover:bg-sky-600 active:bg-sky-700">
          Sign In
        </button>
      </form>

      <Link to="/signup">Sign Up</Link>
    </div>
  );
};

export default Signin;
