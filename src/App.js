//import logo from './logo.svg';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home"
import Link from "./Link"
import ResumeLink from "./ResumeLink"


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Link" element={<Link />} />
          <Route path="/ResumeLink" element={<ResumeLink />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;



