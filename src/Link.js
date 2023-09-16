import logo from './logo.svg';
import './Link.css';
import { useState } from 'react'

export default function Link() {
    const [username, setUsername] = useState('');
    return (
        <>
        <label>
            GitHub Username:
            <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            />
        </label>
        {username !== '' &&
            <p>Your username is {username}.</p>
        }
        </>
  );
}
