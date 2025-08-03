import './landing-page.css';
import Button from '../../common-components/button';
import { useNavigate } from 'react-router-dom';
import clglogo from '../../assets/clg-logo.png';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page" >
      <div className="overlay" />
      <div className="main-layout">
        <img src={clglogo} alt="AIMIT Logo" className="aimit-logo" />
        <Button text="Order Now" onClick={() => navigate('/login')} />
      </div>
    </div>
  );
};

export default LandingPage;
