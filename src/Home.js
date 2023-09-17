//import logo from './logo.svg';
import './Home.css';
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from './logo.png';

export default function App() {
  const navigate = useNavigate();
  
  return (
    <div className="App">
      <header>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet"/>
      </header>
      <body>
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
 comprehensive reviews of users' projects. Leveraging advanced machine learning algorithms,
  it provides valuable insights and actionable suggestions to help users enhance the quality and
   impact of their repositories. By analyzing code quality, documentation, and project statistics,
    the AI model empowers developers to make informed improvements, optimize their profiles, 
    and stand out in the open-source community. Elevate your GitHub presence and code portfolio with
     personalized guidance from this innovative AI assistant.</p>
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
            <p class='sub-text-right'>This AI model is a game-changer for GitHub users, not only by evaluating 
            their projects but also by automatically enhancing README.md documentation. By intelligently 
            analyzing project repositories, it generates comprehensive documentation, making it easier for 
            developers to showcase their work. From installation guides to usage instructions, this AI-powered 
            assistant streamlines the README.md creation process, allowing users to present their projects more
            effectively and professionally on GitHub. Elevate your open-source game with this AI ally that takes
            your documentation to the next level. </p>
          </div>
        </div>
        <div id="third-block" class='blocks'>
          <div id='res-block'>
            <p class='sec-title'>Improve Your Resume</p>
            <p class='sub-text'> Finally, our AI Model will elevate your resume effortlessly. By conducting in-depth 
            project reviews, it not only offers valuable suggestions for GitHub improvements but also streamlines
            the resume-building process. This AI automates the creation of compelling project descriptions, saving users 
            precious time and ensuring that their resume highlights their GitHub achievements effectively. Seamlessly 
            enhance your GitHub presence and craft impressive resumes with this all-in-one AI assistant.
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



