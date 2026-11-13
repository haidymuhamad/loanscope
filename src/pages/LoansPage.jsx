import { useState } from 'react';
import LoansTable from '../components/LoansTable';
import './LoansPage.css';
import { INITIAL_ML_DATA } from '../data/loansData';


function LoansPage() {
  const [loans, setLoans] = useState(() => {
    const saved = localStorage.getItem('loanApplications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse loans:', e);
      }
    }
    return INITIAL_ML_DATA;
  });

  const handleDelete = (id) => {
    const updated = loans.filter((l) => l.id !== id);
    setLoans(updated);
    localStorage.setItem('loanApplications', JSON.stringify(updated));
  };

  const handleReset = () => {
    setLoans(INITIAL_ML_DATA);
    localStorage.setItem('loanApplications', JSON.stringify(INITIAL_ML_DATA));
  };

  return (
    <div className="loans-page-container">
      <div className="loans-page-header">
        <div>
          <h1>All Loan Applications</h1>
          <p className="loans-page-subtitle">
            Review, search, and manage all submitted loan records and ML dataset entries.
          </p>
        </div>
        {loans.length === 0 && (
          <button onClick={handleReset} className="reset-btn">
            Restore Sample Data
          </button>
        )}
      </div>

      <LoansTable loans={loans} onDelete={handleDelete} onReset={handleReset} />
    </div>
  );
}

export default LoansPage;