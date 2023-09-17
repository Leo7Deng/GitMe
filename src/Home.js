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
            <h2 class='head'>An AI improvement application</h2>
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
            <p class='sub-text'> The AI model is a cutting-edge solution designed to enhance GitHub profiles by conducting
 comprehensive reviews of users' profiles and projects. By analyzing profile read me's, and skills listed, we will provide personalized
  feedback on how to improve your profile.</p>
          </div>
          <img src = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
          alt = 'GitHub Logo' id='ghLogo'/>
        </div>
        <div id="second-block" class='blocks'>
          <img src='https://cdn.iconscout.com/icon/free/png-512/free-readme-3521667-2945111.png?f=avif&w=512'
          alt='readme icon' id='rmIcon'/>
          <div class='sec-wrapper'>
            <p class='sec-title'>
              Improve Your README Documentation
            </p>
            <p class='sub-text-right'>This AI model is a game-changer for GitHub users by automatically enhancing README documentation. 
            Often times overseen and having not much thought put into the README's, we will automatically analyze project documentation
             and make it easier for developers to better explain their projects. </p>
          </div>
        </div>
        <div id="third-block" class='blocks'>
          <div id='res-block'>
            <p class='sec-title'>Improve Your Resume</p>
            <p class='sub-text'> Our AI will be able to summarize GitHub repositories and print out a bullet pointed resume
             description. By conducting in-depth project reviews, it offers valuable suggestion for what can be included on your
              resume, as well as realizing the flaws in your current resume. By saving time in ensuring that your resume
               may catch recruiter's eyes, you can focus on more things like coding!
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
    </div>
  );
}



