//import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 class='head'>GitMe</h1>
        <h2 class='head'>An AI improvement application</h2>
      </header>
      <body>
        <div id="first-block">
          <p class='text'>Improve Your Profile</p>
          <img src = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
          alt = 'GitHub Logo' id='gHLogo'></img>
        </div>
      </body>
    </div>
  );
}

function sayHello() {
  alert('Insert Link Here When Ready');
}

export default App;
