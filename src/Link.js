import './Link.css';


function Link() {
    return (
        <div>
            <form action="/url" method="GET" className="Form">
                <fieldset>
                <label for="username" className="Label"> Enter your username:</label>
                <br></br>
                    <input type="text" clasName="Submit"id="username" name="username" minlength="1" maxlength="30" required></input>
                
                {/* <button type="submit" className="Submit" >Submit</button>   */}
                </fieldset>
            </form>
        </div>
    );
}

export default Link;
