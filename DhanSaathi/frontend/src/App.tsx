import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthModals from "./pages/AuthModals";
import Dashboard from "./pages/Dashboard";
import LoanEligibility from "./pages/LoanEligibility";
import SchemeChecker from "./pages/SchemeChecker";
import FormHelper from "./pages/FormHelper";
import HomePage from "./pages/HomePage";
import { Toaster } from "sonner";


function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthModals />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/eligibility" element={<LoanEligibility />} />
          <Route path="/scheme-checker" element={<SchemeChecker />} />
          <Route path="/form-helper" element={<FormHelper />} />
        


        </Routes>
      </Router>
    </>
  );
}

export default App;
