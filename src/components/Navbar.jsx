import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>LoanScope</h2>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/loans">Loans</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}

export default Navbar;