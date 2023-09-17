//import logo from './logo.svg';
import './Home.css';
import React from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  
  return (
    <div className="App">
      <header className="App-header">
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet"/>
        <div id="intro-block">
            <h1 class='head'>GitMe</h1>
            <h2 class='head'>An AI improvement application</h2>
            <button className = "LinkButton"
            onClick={() => {
            navigate("/Link");
            }}>
            Get Started
            </button>
        </div>
      </header>
      <body>
        <div id="first-block" class='blocks'>
          <p class='leftText'>Improve Your Profile</p>
          <img src = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
          alt = 'GitHub Logo' id='ghLogo'/>
        </div>
        <div id="second-block" class='blocks'>
          <img src='https://cdn.iconscout.com/icon/free/png-512/free-readme-3521667-2945111.png?f=avif&w=512'
          alt='readme icon' id='rmIcon'/>
          <p class='rightText'>Improve Your README Documentation</p>
        </div>
        <div id="third-block" class='blocks'>
          <p class='leftText'>Improve Your Resume</p>
          <img src='https://cdn.iconscout.com/icon/free/png-512/free-resume-39-529571.png?f=avif&w=512'
          alt='resume icon' id='resIcon'/>
        </div>
        <div id="fourth-block" className="blocks">
            <button className = "LinkButton"
            onClick={() => {
            navigate("/Link");
            }}>
            Get Started
            </button>
        </div>
      </body>
    </div>
  );
}



