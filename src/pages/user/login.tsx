import './login.css';
import Button from '../../common-components/button';
import Input from '../../common-components/input';
import IconButton from '../../common-components/back-button';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');

  const handleContinue = () => {
    const isValid = /^[0-9]{10}$/.test(phone);
    if (isValid) {
      navigate('/otp');
    } else {
      alert('Please enter a valid 10-digit phone number');
      setPhone(''); // Clear input
    }
  };

  return (
    <div className="login-page">
      <IconButton
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        className="back-button"
      />

      <div className="login-wrapper">
        <div className="login-top">
          <h1 className="login-title">Login</h1>
          <p className="login-subtitle">Enter your phone number to continue</p>

          <div className="phone-input-wrapper">
            <div className="phone-code">+91</div>
            <Input
              type="tel"
              placeholder="000 000 0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="login-bottom">
          <Button text="Continue" onClick={handleContinue} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;