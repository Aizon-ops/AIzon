import React, { useState } from 'react';
import axios from 'axios';

const OpenAIComponent = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    const handleGenerate = async () => {
        try {
            const res = await axios.post('/api/openai', { prompt });
            setResponse(res.data.result);
        } catch (error) {
            console.error("Error calling OpenAI:", error);
            setResponse("An error occurred.");
        }
    };

    return (
        <div className="openai-component">
            <h2>AI Text Generator</h2>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
            />
            <button onClick={handleGenerate}>Generate</button>
            <div className="response">
                <h3>Response:</h3>
                <p>{response}</p>
            </div>
        </div>
    );
};

export default OpenAIComponent;
