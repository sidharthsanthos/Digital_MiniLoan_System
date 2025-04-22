import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="title">
        <Link to="/">DIGITAL MINILOAN</Link>
      </div>
      <ul className="nav-items">
        <li className="nav-item"><Link to="/">Home</Link></li>
        <li className="nav-item"><Link to="/about">About</Link></li>
        <li className="nav-item"><Link to="/contact">Contact</Link></li>
        <li className="nav-item"><Link to="/bhome">Bank</Link></li>
        <div className="login-button">
        <Link to="/login">
          <button className="btn-login">Login</button>
        </Link>
      </div>
      </ul>
    </nav>
  );
};

export default Navbar;
