import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import Home from "./component/Home";
import User from "./component/User";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/user" element={<User />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
