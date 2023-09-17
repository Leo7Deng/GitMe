import { Link } from 'react-router-dom';
import './ResumeLink.css';
//import {username} from './Link.js';
    
function ResumeLink({ data }) {
    if (!data || !data.text) {
      return <div>No data available</div>;
    }
  
    const htmlContent = data.generated_summary;
    return(
        <div className="App">
            <body>
                <h2>Here is a list of your repositories and a resume summary of each one</h2>
                <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
                <h4>Display improved resume shit here</h4>
            </body>
        </div>
        
    );
}


export default ResumeLink;
