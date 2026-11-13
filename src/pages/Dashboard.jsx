import { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';

import LoanForm from '../components/LoanForm';

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
    
    return [
      { id: "LP001430", applicantName: "Applicant LP001430", age: 30, monthlyIncome: 4166, loanAmount: 44, employmentStatus: "No", creditHistory: "Good", status: "Eligible" },
      { id: "LP002347", applicantName: "Applicant LP002347", age: 32, monthlyIncome: 3246, loanAmount: 138, employmentStatus: "No", creditHistory: "Good", status: "Eligible" },
      { id: "LP001528", applicantName: "Applicant LP001528", age: 29, monthlyIncome: 6277, loanAmount: 118, employmentStatus: "No", creditHistory: "Bad", status: "Not Eligible" },
      { id: "LP002974", applicantName: "Applicant LP002974", age: 35, monthlyIncome: 3232, loanAmount: 108, employmentStatus: "No", creditHistory: "Good", status: "Eligible" },
      { id: "LP002368", applicantName: "Applicant LP002368", age: 28, monthlyIncome: 5935, loanAmount: 133, employmentStatus: "No", creditHistory: "Good", status: "Eligible" }
    ];
  });

  useEffect(() => {
    localStorage.setItem('loanApplications', JSON.stringify(loans));
  }, [loans]);

  const handleAddApplication = (formData) => {
    const assessmentResult = assessLoan(formData);

    const newLoan = {
      id: Date.now(),
      ...formData,
      status: assessmentResult
    };

    setLoans([newLoan, ...loans]);
  };


  const totalApps = loans.length;
  const eligibleCount = loans.filter(l => l.status === 'Eligible').length;
  const notEligibleCount = loans.filter(l => l.status === 'Not Eligible').length;
  const approvalRate = totalApps > 0 ? ((eligibleCount / totalApps) * 100).toFixed(1) + '%' : '0%';

  return (
    <div>
      <div className="dashboard-container">
        <h1>Dashboard Overview</h1>
        <h2>Loan Risk Assessment Dashboard</h2>

        <div className="stats-grid">
          <StatCard title="Total Applications" value={totalApps} icon="📄" />
          <StatCard title="Eligible Loans" value={eligibleCount} icon="✅" />
          <StatCard title="Not Eligible" value={notEligibleCount} icon="❌" />
          <StatCard title="Approval Rate" value={approvalRate} icon="📊" />
        </div>

        <LoanForm onAddApplication={handleAddApplication} />

       
      </div>
    </div>
  );
}

export default Dashboard;