import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [code, setCode] = useState('');
    const [debugOutput, setDebugOutput] = useState('');

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };

    const handleSubmit = async () => {
      setDebugOutput('Running...');
      try {
          // const response = await axios.post('http://localhost:5000/debug', { code });
          const response = await axios.post('https://principle-of-programming-language-code.onrender.com/debug', { code });
          setDebugOutput(response.data.result);
      } catch (error) {
          console.error('Error debugging code:', error);
          setDebugOutput('Error: Failed to connect to backend.');
      }
    };
  
    return (
        <div className="App">
            <h1>Code Debugger</h1>
            <textarea
                value={code}
                onChange={handleCodeChange}
                placeholder="Enter your code here"
                rows="10"
                cols="50"
            />
            <button onClick={handleSubmit}>Debug</button>
            <div>
                <h2>Output</h2>
                <pre>{debugOutput}</pre>
            </div>
        </div>
    );
}

export default App;
