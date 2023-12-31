import './Link.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo from './logo.png';

function Link() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    
    const handleChange = (event) => {
        setUsername(event.target.value);
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        document.getElementById("form").innerHTML += "<br>Submitted, please wait...";
        fetch(
            'https://gitme-api.up.railway.app/?username=' + username,
            {
                method: 'GET',
            }
        ).then(response => {
            response.json().then(data => {
                console.log(data);
                navigate(
                    "/ResumeLink",
                    {
                        state: {
                            data: data,
                        }
                    }
                );
            });
        });
        // Simulate form submission by clearing input fields
        setUsername('');
    };


    return (
        <div>
            <img src={logo} alt="Logo" />
            <form id="form" action="/url" method="GET" className="Form" onSubmit={handleSubmit}>
          
                <h3 for="username" > Enter your username:</h3>
                <br></br>
                    <input type="text" className="Submit" id="username" name="username" minlength="1" maxlength="30" value={username}
                onChange={handleChange} required></input>
                
                
                {/* <button type="submit" className="Submit" >Submit</button>   */}
 
            </form>
        </div>
    );

    
    
}

//export {username};
export default Link;
