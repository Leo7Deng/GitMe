import './Link.css';
import { useState } from 'react';

function Link() {
    const [username, setUsername] = useState('');
    
    const handleChange = (event) => {
        setUsername(event.target.value);
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username)
        fetch(
            'https://gitme.up.railway.app/?username=' + username,
            {
                method: 'GET',
            }
        ).then(response => {
            console.log(response);
        });
        // Simulate form submission by clearing input fields
        setUsername('');
    };


    return (
        <div>
            <form action="/url" method="GET" className="Form" onSubmit={handleSubmit}>
          
                <h3 for="username" > Enter your username:</h3>
                <br></br>
                    <input type="text" className="Submit" id="username" name="username" minlength="1" maxlength="30" value={username}
                onChange={handleChange} required></input>
                
                
                {/* <button type="submit" className="Submit" >Submit</button>   */}
 
            </form>
        </div>
    );

    
    
}

export {username};
export default Link;
