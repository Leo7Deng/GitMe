//import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet"/>
        <h1 class='head'>GitMe</h1>
        <h2 class='head'>An AI improvement application</h2>
      </header>
      <body>
        <div id="first-block">
          <p class='leftText'>Improve Your Profile</p>
          <img src = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
          alt = 'GitHub Logo' id='ghLogo'/>
        </div>
        <div id="second-block">
          <img src='https://cdn.iconscout.com/icon/free/png-512/free-readme-3627908-3029134.png?f=avif&w=512'
          alt='readme icon' id='rmIcon'/>
          <p class='rightText'>Improve Your README Documentation</p>
        </div>
        <div id="third-block">
          <p class='leftText'>Improve Your Resume</p>
        </div>
      </body>
    </div>
  );
}

function sayHello() {
  alert('Insert Link Here When Ready');
}

export default App;
