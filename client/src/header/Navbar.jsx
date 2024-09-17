// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS for the navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Medical Tracking System
        </Link>
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/prescriptions">Prescription Parser</Link></li>
          <li><Link to="/profile">Patient Profile</Link></li>
          <li><Link to="/feedback">Feedback</Link></li>
          <li><Link to="/adherence-form">Add Records</Link></li>
          <li><Link to="/prescriptions-list">Prescriptions List</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
