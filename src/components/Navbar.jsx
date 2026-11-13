import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">LoanScope 📊</h1>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#dashboard">Dashboard</a></li>
        <li><a href="#loans">Loans</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;