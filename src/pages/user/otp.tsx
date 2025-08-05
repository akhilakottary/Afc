import './otp.css';
import Button from '../../common-components/button';
import IconButton from '../../common-components/back-button';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OtpPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [showError, setShowError] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    setShowError(false);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (otp[index]) {
        const updatedOtp = [...otp];
        updatedOtp[index] = '';
        setOtp(updatedOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleResend = () => {
    setOtp(['', '', '', '']);
    setTimer(30);
    setShowError(false);
    inputRefs.current[0]?.focus();
  };

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp === '1234') {
      navigate('/home-page');
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="otp-page">
      <IconButton
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate('/login')}
        className="back-button"
      />

      <div className="otp-wrapper">
        <div className="otp-top">
          <p className="otp-instruction">
            Please enter the verification code sent to <br />
            <span className="otp-number">+916416239517</span>
          </p>

          <p className={`otp-timer ${showError ? 'error' : ''}`}>
            {showError
              ? 'Incorrect code. Please try again.'
              : `00:${timer.toString().padStart(2, '0')}`}
          </p>

          <div className="otp-inputs">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                inputMode="numeric"
                className="otp-box"
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
              />
            ))}
          </div>

          <p className="resend-text">
            Didn’t receive a code?{' '}
            <span className="resend-link" onClick={handleResend}>
              Resend SMS
            </span>
          </p>
        </div>

        <div className="login-bottom">
          <Button text="Verify" onClick={handleVerify} />
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
//