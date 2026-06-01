import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // We'll look at the styles next

const Navbar = () => {
  // State to handle mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">Hello Bonjour</div>
      
      {/* Hamburger menu for mobile screens */}
      <div className="nav-toggle" onClick={toggleMenu}>
        <span className={`bar ${isOpen ? 'open' : ''}`}></span>
        <span className={`bar ${isOpen ? 'open' : ''}`}></span>
        <span className={`bar ${isOpen ? 'open' : ''}`}></span>
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        <li>
          {/* Changed from "/Homepage" to "/" */}
          <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
        </li>
        <li>
          {/* Changed from "/Questions" to "/questions", and text to "Questions" */}
          <NavLink to="/questions" onClick={() => setIsOpen(false)}>Questions</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;