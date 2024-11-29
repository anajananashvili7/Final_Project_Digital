import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    
    if (name && email && password) {
      setError(''); 

      
      const user = { name, email, password };
      localStorage.setItem('user', JSON.stringify(user));

      console.log("User registered:", user);
      navigate('/join-community'); 
    } else {
      setError('Please enter valid name, email, and password.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSignUp} className="flex flex-col items-center space-y-4 p-6 w-96">
        {/* Google Sign-In Button */}
        <button className="flex items-center space-x-2 border border-gray-300 rounded p-2 w-full justify-center">
          <img src="/Google.png" alt="Google Icon" className="h-4 w-4" />
          <span>Continue with Google</span>
        </button>
        {error && <p className="text-red-500">{error}</p>}

        <div className="flex flex-col w-full">
          <label className="text-left mb-1 text-[14px] leading-[24px] text-[#003459] font-semibold">Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>

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

        <div className="flex flex-col w-full">
          <label className="text-left mb-1 text-[14px] leading-[24px] text-[#003459] font-semibold">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <p className="text-[#003459] text-[12px] leading-[24px]">
          By creating an account you agree with our <span className="font-semibold">Terms of Service</span> and <span className="font-semibold">Privacy Policy</span>.
        </p>

        <button type="submit" className="bg-[#003459] text-white py-2 rounded w-full">
          Create Account
        </button>
        <span 
          className="text-[#003459] text-[14px] leading-[24px] cursor-pointer" 
          onClick={() => navigate('/join-community')}
        >
          Already have an account? Log in
        </span>
      </form>
    </div>
  );
};

export default SignUp;
