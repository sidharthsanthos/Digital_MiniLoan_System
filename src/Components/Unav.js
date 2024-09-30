import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar2 = () => {
  return (
    <nav className="navbar">
      <div className="title">
        <Link to="/">DIGITAL MINILOAN</Link>
      </div>
      <ul className="nav-items">
        <li className="nav-item"><a href='#'>Home</a></li>
        <li className='nav-item'><Link to="/link_bank">Link Account</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar2;
