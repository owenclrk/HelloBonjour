import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Questions from './Questions';
import './App.css';
import Navbar from './Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/questions" element={<Questions />} />
      </Routes>
      </>
  );
}

export default App;