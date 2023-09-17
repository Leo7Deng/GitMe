import { useLocation } from "react-router-dom";
import './ResumeLink.css';
//import {username} from './Link.js';

function ResumeReview(){
    const { state } = useLocation();

    return(
        <div className="App">
            <body>
                <h2>Here is a list of your repositories and a resume summary of each one</h2>
                {state.data.map((item, index) => (
                    <div key={index}>
                        <h4>{item.repository}</h4>
                        <p>{item.generated_summary}</p>
                    </div>
                ))}
            </body>
        </div>
        
    );
}

export default ResumeReview;
