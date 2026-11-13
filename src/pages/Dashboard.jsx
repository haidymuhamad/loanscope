import { INITIAL_ML_DATA } from '../data/loansData';
import { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import LoanForm from '../components/LoanForm';
import LoansTable from '../components/LoansTable';
import assessLoan from '../utils/loanAssessment';

import './Dashboard.css';

function Dashboard() {
  const [loans, setLoans] = useState(() => {
    const savedLoans = localStorage.getItem('loanApplications');

    if (savedLoans) {
      try {
        return JSON.parse(savedLoans);
      } catch (error) {
        console.error('Failed to parse loans from localStorage:', error);
      }
    }

    return INITIAL_ML_DATA;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Save loans to localStorage
  useEffect(() => {
    localStorage.setItem('loanApplications', JSON.stringify(loans));
  }, [loans]);

  // Add new loan application
  const handleAddApplication = (formData) => {
    const assessmentResult = assessLoan(formData);

    const newLoan = {
      Loan_ID: `LP${Date.now()}`,
      ...formData,
      Loan_Status:
        assessmentResult === 'Eligible' ? 'Y' : 'N',
    };

    setLoans((prevLoans) => [newLoan, ...prevLoans]);
  };

  // Delete loan application
  const handleDelete = (loanId) => {
    setLoans((prevLoans) =>
      prevLoans.filter((loan) => loan.Loan_ID !== loanId)
    );
  };

  // Search and Filter
  const filteredLoans = loans.filter((loan) => {
    const loanId = loan.Loan_ID
      ? loan.Loan_ID.toString()
      : '';

    const term = searchTerm || '';

    const matchesSearch = loanId
      .toLowerCase()
      .includes(term.toLowerCase());

    const isEligible =
      loan.Loan_Status === 'Y' ||
      loan.Loan_Status === 'Eligible';

    const statusStr = isEligible
      ? 'Eligible'
      : 'Not Eligible';

    const matchesStatus =
      statusFilter === 'All' ||
      statusStr === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Statistics
  const totalApps = loans.length;

  const eligibleCount = loans.filter(
    (loan) =>
      loan.Loan_Status === 'Y' ||
      loan.Loan_Status === 'Eligible'
  ).length;

  const notEligibleCount = totalApps - eligibleCount;

  const approvalRate =
    totalApps > 0
      ? ((eligibleCount / totalApps) * 100).toFixed(1) + '%'
      : '0%';

  return (
    <div>
      <div className="dashboard-container">
        <h1>Dashboard Overview</h1>
        <h2>Loan Risk Assessment Dashboard</h2>

        {/* Statistics */}
        <div className="stats-grid">
          <StatCard
            title="Total Applications"
            value={totalApps}
            icon="📄"
          />

          <StatCard
            title="Eligible Loans"
            value={eligibleCount}
            icon="✅"
          />

          <StatCard
            title="Not Eligible"
            value={notEligibleCount}
            icon="❌"
          />

          <StatCard
            title="Approval Rate"
            value={approvalRate}
            icon="📊"
          />
        </div>

        {/* Add Loan Application */}
        <LoanForm onAddApplication={handleAddApplication} />

        {/* Search and Filters */}
        <div className="loan-filters">
          <input
            type="text"
            placeholder="Search by Loan ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Eligible">Eligible</option>
            <option value="Not Eligible">Not Eligible</option>
          </select>
        </div>

        {/* Loans Table */}
        <LoansTable
          loans={filteredLoans}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default Dashboard;
