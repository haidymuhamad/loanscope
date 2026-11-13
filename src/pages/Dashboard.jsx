import { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import Navbar from '../components/Navbar';
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
    return [
      {
        id: 1,
        applicantName: 'Ahmed Mohamed',
        age: 25,
        monthlyIncome: 20000,
        loanAmount: 100000,
        employmentStatus: 'Employed',
        creditHistory: 'Good',
        status: 'Eligible'
      }
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

  const handleDeleteApplication = (id) => {
    setLoans(loans.filter(loan => loan.id !== id));
  };


  const totalApps = loans.length;
  const eligibleCount = loans.filter(l => l.status === 'Eligible').length;
  const notEligibleCount = loans.filter(l => l.status === 'Not Eligible').length;
  const approvalRate = totalApps > 0 ? ((eligibleCount / totalApps) * 100).toFixed(1) + '%' : '0%';

  return (
    <div>
      <Navbar />
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

        <LoansTable loans={loans} onDelete={handleDeleteApplication} />
      </div>
    </div>
  );
}

export default Dashboard;