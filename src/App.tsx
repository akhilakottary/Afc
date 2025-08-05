
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../src/pages/user/landing-page';
import LoginPage from './pages/user/login';
import OtpPage from './pages/user/otp';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp" element={<OtpPage />} />

      </Routes>
    </Router>
  );
};

export default App;
