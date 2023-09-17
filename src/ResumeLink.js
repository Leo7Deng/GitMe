import { useLocation } from "react-router-dom";
import './ResumeLink.css';
//import {username} from './Link.js';

function ResumeReview(){
    const { state } = useLocation();

    return(
        <div className="App">
            <div className="App-main">
                <h2>Here is a list of your repositories and a resume summary of each one</h2>
                {state.data.map((item, index) => (
                    <div key={index}>
                        <h3>{item.repository}</h3>
                        <p>{item.generated_summary}</p>
                    </div>
                ))}
            </div>
        </div>
        
    );
}

export default ResumeReview;
