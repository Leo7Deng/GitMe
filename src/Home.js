//import logo from './logo.svg';
import './Home.css';
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from './logo.png';

export default function App() {
  const navigate = useNavigate();
  
  return (
    <div className="App">
        <div id="intro-block">
            <img src={logo} alt="Logo" className='logo'/>
            <h2 class='head'>An AI profile improvement application</h2>
            <button className = "LinkButton"
            onClick={() => {
            navigate("/Link");
            }}>
            Get Started
            </button>
        </div>
        <div id="first-block" className='blocks'>
          <div id='first-wrapper'>
            <p class='sec-title'>Improve Your GitHub Profile</p>
            <p class='sub-text'>Want to show off your GitHub? Our AI model is a cutting-edge solution designed to enhance GitHub profiles by conducting
 comprehensive reviews of your profiles and projects. By analyzing your readmes and skills, we will provide personalized
  feedback on how to improve your profile.</p>
          </div>
          <img src = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
          alt = 'GitHub Logo' id='ghLogo'/>
        </div>
        <div id="second-block" class='blocks'>
          <img src='https://cdn.iconscout.com/icon/free/png-512/free-readme-3521667-2945111.png?f=avif&w=512'
          alt='readme icon' id='rmIcon'/>
          <div class='sec-wrapper right'>
            <p class='sec-title'>
              Improve Your README Documentation
            </p>
            <p class='sub-text'>Our product is a game-changer for the professional environment. By automatically improving upon README documentation, we make it easier for developers to explain their projects.
            </p>
          </div>
        </div>
        <div id="third-block" class='blocks'>
          <div id='res-block'>
            <p class='sec-title'>Improve Your Resume</p>
            <p class='sub-text'> We will summarize GitHub repositories into a bullet pointed resume
             description. By conducting in-depth project reviews, we offer valuable suggestions and critiques for what can be included on your
              resume.
            </p>
          </div>
          <img src='https://cdn.iconscout.com/icon/free/png-512/free-resume-39-529571.png?f=avif&w=512'
          alt='resume icon' id='resIcon'/>
        </div>
        <div id="fourth-block" className="blocks">
            <span id="ready">Ready to enhance your professional profile?</span>
            <button className = "LinkButton"
            onClick={() => {
            navigate("/Link");
            }}>
            Get Started
            </button>
        </div>
    </div>
  );
}



