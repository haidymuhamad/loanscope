
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

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Delete Loan
  const handleDelete = (id) => {
    const updated = loans.filter(
      (loan) => loan.Loan_ID !== id
    );

    setLoans(updated);

    localStorage.setItem(
      'loanApplications',
      JSON.stringify(updated)
    );
  };

  // Restore Initial Data
  const handleReset = () => {
    setLoans(INITIAL_ML_DATA);

    localStorage.setItem(
      'loanApplications',
      JSON.stringify(INITIAL_ML_DATA)
    );

    setSearchTerm('');
    setStatusFilter('all');
  };

  // Search and Filter
  const filteredLoans = loans.filter((loan) => {
    // Search by Loan ID
    const loanId = String(loan.Loan_ID ?? '').toLowerCase();

    const matchesSearch = loanId.includes(
      searchTerm.trim().toLowerCase()
    );

    // Get Loan Status
    const loanStatus = String(
      loan.Loan_Status ?? ''
    ).trim().toUpperCase();

    // Filter by Eligibility
    const matchesFilter =
      statusFilter === 'all' ||
      (statusFilter === 'eligible' && loanStatus === 'Y') ||
      (statusFilter === 'not eligible' && loanStatus === 'N');

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="loans-page-container">

      {/* Page Header */}
      <div className="loans-page-header">
        <div>
          <h1>All Loan Applications</h1>

          <p className="loans-page-subtitle">
            Review, search, and manage all submitted loan
            records and ML dataset entries.
          </p>
        </div>

        {loans.length === 0 && (
          <button
            onClick={handleReset}
            className="reset-btn"
          >
            Restore Sample Data
          </button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="loans-toolbar">

        <div className="loans-search-container">
          <input
            type="text"
            placeholder="Search by Loan ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="loans-search-input"
          />
        </div>

        <div className="loans-filter-container">
          <select
            className="loans-filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Applications</option>
            <option value="eligible">Eligible</option>
            <option value="not eligible">Not Eligible</option>
          </select>
        </div>

      </div>

      {/* Results Count */}
      <p className="loans-results-count">
        Showing {filteredLoans.length} of {loans.length} applications
      </p>

      {/* Loans Table */}
      <LoansTable
        loans={filteredLoans}
        onDelete={handleDelete}
        onReset={handleReset}
      />

    </div>
  );
}

export default LoansPage;
