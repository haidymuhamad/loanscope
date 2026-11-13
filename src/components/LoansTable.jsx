import { useState } from 'react';
import './LoansTable.css';

function LoansTable({ loans, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

const filteredLoans = loans.filter((loan) => {
    const name = loan.applicantName || "";
    const idStr = loan.id ? loan.id.toString() : "";
    const term = searchTerm || "";

    const matchesSearch = 
      name.toLowerCase().includes(term.toLowerCase()) ||
      idStr.toLowerCase().includes(term.toLowerCase());
      
    const matchesStatus = statusFilter === 'All' || loan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!loans || loans.length === 0) {
    return (
      <div className="table-container">
        <h3>Loan Applications Management</h3>
        <p className="no-data">No loan applications submitted yet.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table-header-flex">
        <h3>Loan Applications Management</h3>
      
        <div className="table-controls">
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Status</option>
            <option value="Eligible">Eligible</option>
            <option value="Not Eligible">Not Eligible</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="loans-table">
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Applicant Name</th>
              <th>Age</th>
              <th>Monthly Income</th>
              <th>Loan Amount</th>
              <th>Employment</th>
              <th>Credit History</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.length > 0 ? (
              filteredLoans.map((loan) => (
                <tr key={loan.id}>
                  <td>{loan.id}</td>
                  <td>{loan.applicantName}</td>
                  <td>{loan.age}</td>
                  <td>${loan.monthlyIncome?.toLocaleString()}</td>
                  <td>${loan.loanAmount?.toLocaleString()}</td>
                  <td>{loan.employmentStatus}</td>
                  <td>{loan.creditHistory}</td>
                  <td>
                    <span className={`status-badge ${loan.status === 'Eligible' || loan.status === 'Approved' ? 'eligible' : 'not-eligible'}`}>
                      {loan.status}
                    </span>
                  </td>
                  <td>
                    {onDelete && (
                      <button 
                        className="delete-btn" 
                        onClick={() => onDelete(loan.id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no-data" style={{ textAlign: 'center' }}>
                  No matching loan applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LoansTable;