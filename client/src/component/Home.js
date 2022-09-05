import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  useEffect(() => {
    let refresh_token = window.localStorage.getItem("refresh_token");
    let access_token = window.localStorage.getItem("access_token");
    if (refresh_token && access_token) {
      window.location.href = "/user";
    }
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="my-5">
        <Link to="/signin">
          <button className="rounded bg-sky-500 hover:bg-sky-600 active:bg-sky-700 px-2 py-1">Sign In</button>
        </Link>
      </div>
      <div>
        <Link to="/signup">
          <button className="rounded bg-sky-500 hover:bg-sky-600 active:bg-sky-700 px-2 py-1">Sign Up</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
