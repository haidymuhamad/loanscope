function assessLoan(application) {
  const {
    age,
    monthlyIncome,
    loanAmount,
    employmentStatus,
    creditHistory
  } = application;

  if (
    !Number.isFinite(age) ||
    !Number.isFinite(monthlyIncome) ||
    !Number.isFinite(loanAmount)
  ) {
    return "Invalid Data";
  }

  if (age <= 0 || monthlyIncome <= 0 || loanAmount <= 0) {
    return "Invalid Data";
  }

  if (age < 21) {
    return "Not Eligible";
  }

  if (employmentStatus !== "Employed" && employmentStatus !== "employed") {
    return "Not Eligible";
  }

  if (creditHistory !== "Good" && creditHistory !== "good") {
    return "Not Eligible";
  }

  if (loanAmount > monthlyIncome * 10) {
    return "Not Eligible";
  }

  return "Eligible";
}

export default assessLoan;