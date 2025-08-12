
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../src/pages/user/landing-page';
import LoginPage from './pages/user/login';
import OtpPage from './pages/user/otp';
import HomePage from './pages/user/home-page';
import SavouryMenuPage from './pages/user/savoury-menu';
import FoodCourtMenuPage from './pages/user/fc-menu';
import CartPage from './pages/user/cart-page';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/savoury-menu" element={<SavouryMenuPage />} />
        <Route path="/fc-menu" element={<FoodCourtMenuPage />} />
        <Route path="/view-cart" element={< CartPage />} />

      </Routes>
    </Router>
  );
};

export default App;
