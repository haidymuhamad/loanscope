import './LoansTable.css';

function LoansTable({ loans, onDelete }) {
  if (!loans || loans.length === 0) {
    return <p style={{ textAlign: 'center', padding: '2rem', color: '#718096' }}>No loan applications found.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="loans-table">
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>Gender</th>
            <th>Married</th>
            <th>Education</th>
            <th>Income</th>
            <th>Loan Amount</th>
            <th>Credit History</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => {
            // تحديد هل الحالة مقبولة (Eligible/Y) أو مرفوضة (Not Eligible/N)
            const isEligible = loan.Loan_Status === 'Y' || loan.Loan_Status === 'Eligible';
            
            return (
              <tr key={loan.Loan_ID || Math.random()}>
                <td>{loan.Loan_ID}</td>
                <td>{loan.Gender}</td>
                <td>{loan.Married}</td>
                <td>{loan.Education}</td>
                <td>${loan.ApplicantIncome}</td>
                <td>${loan.LoanAmount}</td>
                <td>{loan.Credit_History === '1' || loan.Credit_History === 'Good' ? 'Good' : 'Bad'}</td>
                <td>
                  <span className={`badge ${isEligible ? 'approved' : 'rejected'}`}>
                    {isEligible ? 'Eligible' : 'Not Eligible'}
                  </span>
                </td>
                <td>
                  <button onClick={() => onDelete(loan.Loan_ID)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default LoansTable;