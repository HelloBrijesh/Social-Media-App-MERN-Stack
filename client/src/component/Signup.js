import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    let refresh_token = window.localStorage.getItem("refresh_token");
    let access_token = window.localStorage.getItem("access_token");
    if (refresh_token && access_token) {
      window.location.href = "/user";
    }
  });

  const handleSignUp = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:5000/api/register", {
      name,
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
      <form onSubmit={handleSignUp} className="flex flex-col items-center my-20 w-full">
        <input type="text" placeholder="Name" required className="border p-1" onChange={(e) => setName(e.target.value)}></input>
        <br />
        <input type="email" placeholder="Email" required className="border p-1" onChange={(e) => setEmail(e.target.value)}></input>
        <br />
        <input type="password" placeholder="Password" required className="border p-1" onChange={(e) => setPassword(e.target.value)}></input>
        <br />
        <button type="submit" className="content-center px-3 py-1 rounded bg-sky-500 hover:bg-sky-600 active:bg-sky-700">
          Sign Up
        </button>
      </form>

      <Link to="/signin">Sign In</Link>
    </div>
  );
}

export default Signup;
