import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); 
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    if (email) {
     
      console.log("Reset link sent to:", email);
      setMessage('A reset link has been sent to your email address.'); 
      setEmail('');
    } else {
      setMessage('Please enter your email address.'); 
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleReset} className="flex flex-col items-center space-y-4 p-6 w-96">
        <p className="text-[#003459] text-[14px] leading-[24px]">
          Please enter the email address associated with your account. We'll promptly send you a link to reset your password.
        </p>
        
        {message && <p className="text-green-500 text-center">{message}</p>} {/* Success message */}

        <div className="flex flex-col w-full">
          <label className="text-left mb-1 text-[14px] leading-[24px] text-[#003459] font-semibold">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <button type="submit" className="bg-[#003459] text-white py-2 text-[14px] leading-[24px] rounded w-full">
          Send Reset Link
        </button>

        <span 
          className="text-[#003459] text-[14px] leading-[24px] cursor-pointer" 
          onClick={() => navigate('/join-community')} 
        >
          Back to Login
        </span>
      </form>
    </div>
  );
};

export default ForgotPassword;
