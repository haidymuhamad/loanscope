==================================================
LoanScope: AI-Powered Loan Risk Assessment Dashboard
==================================================

LoanScope is a project I built to bridge the gap between heavy machine learning data pipelines and clean, user-friendly frontend interfaces. Instead of keeping cleaned prediction data locked away in CSV files, LoanScope brings it to life through a modern, interactive React dashboard that evaluates loan eligibility in real-time.

---

What Makes It Cool?
- Real ML Data Integration: Loads and manages pre-cleaned, encoded records straight from real-world loan datasets.
- Instant Risk Assessment: Evaluates new form submissions on the fly using custom logic that mimics predictive machine learning models.
- Live Statistics: Instantly calculates total applications, approved vs. rejected counts, and dynamic approval rates.
- Smart Filtering & Search: Easily search through records by applicant name or Loan ID, or filter by eligibility status.
- Persistent Storage: Uses browser localStorage so your data stays intact even if you refresh or close the tab.

---

Built With
- Frontend: React.js, Vite, Modern CSS
- State & Logic: React Hooks (useState, useEffect)
- Data Prep: Python (Pandas) for initial dataset cleaning and feature encoding

---

Getting Started Locally

Want to run it locally on your machine? It's super simple:

1. Clone the repository:
   git clone https://github.com/haidymuhamad/loanscope.git

2. Navigate into the project directory:
   cd loanscope

3. Install dependencies:
   npm install

4. Run the development server:
   npm run dev

---
Built with passion and lots of coffee sips by Haidy.