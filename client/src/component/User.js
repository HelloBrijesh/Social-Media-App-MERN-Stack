import React, { useEffect, useState } from "react";
import axios from "axios";
function User() {
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("refresh_token");
    if (!token) {
      window.location.href = "/login";
    }

    const checkToken = async () => {
      const access_token = localStorage.getItem("access_token");
      const refresh_token = localStorage.getItem("refresh_token");
      const response = await axios.post("http://localhost:5000/api/user", {
        access_token: access_token,
        refresh_token: refresh_token,
      });

      setName(response.data.name);
      localStorage.setItem("access_token", response.data.access_token);
    };
    checkToken();
  }, []);

  const handleLogout = async () => {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    const response = await axios.post("http://localhost:5000/api/logout", {
      refresh_token,
      access_token,
    });
    if (response.data.acknowledged === true) {
      window.localStorage.removeItem("access_token");
      window.localStorage.removeItem("refresh_token");
      window.location.href = "/";
    }
  };

  return (
    <div>
      <h1>Welcome {name}</h1>
      <button onClick={handleLogout} className="content-center px-3 py-1 rounded bg-sky-500 hover:bg-sky-600 active:bg-sky-700">
        Log out
      </button>
    </div>
  );
}

export default User;
