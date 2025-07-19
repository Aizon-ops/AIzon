// File: /client/src/pages/Dashboard.js
import React from 'react';
import OpenAIComponent from '../components/OpenAIComponent';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>Welcome to AIzon</h1>
            <OpenAIComponent />
            {/* Add other AI products below */}
        </div>
    );
};

export default Dashboard;
