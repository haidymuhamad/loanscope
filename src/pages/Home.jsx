import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to LoanScope</h1>
        <p>Your intelligent, a platform for seamless loan risk assessment and data-driven financial decisions.</p>
        <Link to="/dashboard" className="cta-button">Go to Dashboard</Link>
      </div>
    </div>
  );
}

export default Home;