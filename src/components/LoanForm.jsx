import { useState } from 'react';
import assessLoan from '../utils/loanAssessment';
import AssessmentResult from '../components/AssessmentResult';
import './LoanForm.css';

function LoanForm({ onAddApplication }) {
  const [formData, setFormData] = useState({
    applicantName: '',
    age: '',
    monthlyIncome: '',
    loanAmount: '',
    employmentStatus: 'Employed',
    creditHistory: 'Good',
  });

  const [assessmentResult, setAssessmentResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const applicationData = {
      ...formData,
      age: Number(formData.age),
      monthlyIncome: Number(formData.monthlyIncome),
      loanAmount: Number(formData.loanAmount),
    };


    const result = assessLoan(applicationData);
    setAssessmentResult(result);

    if (onAddApplication) {
      onAddApplication({
        ...applicationData,
        status: result === 'Eligible' ? 'Approved' : 'Rejected',
      });
    }
  };

  return (
    <div className="form-container">
      <h2>New Loan Application</h2>
      <form onSubmit={handleSubmit} className="loan-form">
        <div className="form-group">
          <label htmlFor="applicantName">Applicant Name</label>
          <input
            type="text"
            id="applicantName"
            name="applicantName"
            value={formData.applicantName}
            onChange={handleChange}
            placeholder="e.g. Ahmed Hassan"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              min="1"
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g. 30"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="monthlyIncome">Monthly Income ($)</label>
            <input
              type="number"
              id="monthlyIncome"
              name="monthlyIncome"
              min="0"
              value={formData.monthlyIncome}
              onChange={handleChange}
              placeholder="e.g. 5000"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="loanAmount">Loan Amount ($)</label>
            <input
              type="number"
              id="loanAmount"
              name="loanAmount"
              min="1"
              value={formData.loanAmount}
              onChange={handleChange}
              placeholder="e.g. 15000"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="employmentStatus">Employment Status</label>
            <select
              id="employmentStatus"
              name="employmentStatus"
              value={formData.employmentStatus}
              onChange={handleChange}
            >
              <option value="Employed">Employed</option>
              <option value="Self-Employed">Self-Employed</option>
              <option value="Unemployed">Unemployed</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="creditHistory">Credit History</label>
          <select
            id="creditHistory"
            name="creditHistory"
            value={formData.creditHistory}
            onChange={handleChange}
          >
            <option value="Good">Good (No defaults)</option>
            <option value="Average">Average (Minor delays)</option>
            <option value="Poor">Poor (Previous defaults)</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Assess & Submit Application
        </button>
      </form>

      <AssessmentResult result={assessmentResult} />
    </div>
  );
}

export default LoanForm;