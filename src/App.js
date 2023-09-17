//import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet"/>
        <div id="intro-block">
            <h1 class='head'><b>GitMe</b></h1>
            <h2 class='head'>An AI improvement application</h2>
        </div>
      </header>
      <body>
        <div id="first-block" class='blocks'>
          <p class='leftText'><b>Improve Your Profile</b></p>
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
      </body>
    </div>
  );
}

function sayHello() {
  alert('Insert Link Here When Ready');
}

export default App;
