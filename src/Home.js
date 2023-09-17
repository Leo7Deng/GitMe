//import logo from './logo.svg';
import './Home.css';
import React from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  
  return (
    <div className="App">
      <head className="App-header">
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet"/>
      </head>
      <body>
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
        <div id="first-block" class='blocks'>
          <div id='first-wrapper'>
            <p class='text'>Improve Your GitHub Profile</p>
            <p class='sub-text'>Upgrade the look of your Github Profile using our 
            trained AI Model to give you suggestions for what to add to your profile.</p>
          </div>
          <img src = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
          alt = 'GitHub Logo' id='ghLogo'/>
        </div>
        <div id="second-block" class='blocks'>
          <img src='https://cdn.iconscout.com/icon/free/png-512/free-readme-3521667-2945111.png?f=avif&w=512'
          alt='readme icon' id='rmIcon'/>
          <div class='rm-wrapper'>
            <p id='rm-title'>
              Improve Your README Documentation
            </p>
            <p class='sub-text-right'>Use our trained AI Model to write README Documentation
            for your projects. </p>
          </div>
        </div>
        <div id="third-block" class='blocks'>
          <div id='res-block'>
            <p class='text'>Improve Your Resume</p>
            <p class='sub-text'>Input your GitHub username and a selected repository
              from your profile and our trained AI Model will suggest a resume description
              for your project.
            </p>
          </div>
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



