import './AssessmentResult.css';

function AssessmentResult({ result }) {
  if (!result) {
    return null;
  }

  const resultClass = result.toLowerCase().replace(' ', '-');

  return (
    <div className={`assessment-result ${resultClass}`}>
      <h3>Assessment Result</h3>
      <p className="result-badge">{result}</p>
      <span className="result-note">Illustrative result based on demo rules, not a real lending decision.</span>
    </div>
  );
}

export default AssessmentResult;