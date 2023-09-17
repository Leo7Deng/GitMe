import './ResumeLink.css';

function resumeReview(){
    return(
        <div className="App">
            <body>
                <form className="form"> 
                    <label for="username" className="label">Username: </label>
                    <input type="text" id="fname" name="fname"></input>
                </form>
            </body>
        </div>
        
    );
}

export default resumeReview;
