import React from 'react';
import { Link } from 'react-router-dom';

function Questions() {
  return (
    <div className="app-container">
      <div className="card">
        <h1>Practice Questions</h1>

        <p>Questions generated from your vocabulary will appear here.</p>

        <Link to="/">
          <button>Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default Questions;