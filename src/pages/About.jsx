
import './About.css';
function About() {
  return (
    <div className="about-container">
      <h1>About LoanScope</h1>
      <p >
        LoanScope is a production-ready frontend portfolio project designed by Haidy. It integrates real-world pre-cleaned machine learning datasets with an interactive React interface to evaluate loan risk, simulate eligibility predictions, and manage applications with persistent local storage.
      </p>
      <h3>Core Technologies</h3>
      <ul>
        <li>React 18 & Vite</li>
        <li>React Router for seamless navigation</li>
        <li>Browser LocalStorage for data persistence</li>
        <li>Python & Pandas for ML dataset feature preparation</li>
      </ul>
    </div>
  );
}

export default About;