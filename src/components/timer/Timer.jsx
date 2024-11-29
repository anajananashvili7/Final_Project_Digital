import React, { useEffect, useState } from 'react';

const Timer = () => {
  const targetDate = new Date('2024-12-31T23:59:59');  
  const [timeLeft, setTimeLeft] = useState({});
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;

    let days = Math.floor(difference / (1000 * 60 * 60 * 24));
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    setTimeLeft({ days, hours, minutes, seconds });
  };

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 400);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

   
    calculateTimeLeft();
    window.addEventListener('resize', handleResize);
    handleResize(); 

    
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="pb-[70px]">
      <h2 className="text-[#003459] text-[30px] leading-[65px] font-bold px-[130px] pt-[50px]">ფასდაკლებების დასრულებამდე დარჩენილია:</h2>
      <div className={`grid gap-4 px-[130px] pt-[50px] ${isSmallScreen ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-4'}`}>
        <p className="bg-[#003459] text-[#FFFFFF] rounded-[22px] flex flex-col items-center justify-center p-4">
          <span className="font-[900] text-[64px] leading-[96px]">{timeLeft.days}</span> Days
        </p>
        {isSmallScreen && (
          <>
            <p className="bg-[#003459] text-[#FFFFFF] rounded-[22px] flex flex-col items-center justify-center p-4">
              <span className="font-[900] text-[64px] leading-[96px]">{timeLeft.hours}</span> Hours
            </p>
            <p className="bg-[#003459] text-[#FFFFFF] rounded-[22px] flex flex-col items-center justify-center p-4">
              <span className="font-[900] text-[64px] leading-[96px]">{timeLeft.minutes}</span> Minutes
            </p>
            <p className="bg-[#003459] text-[#FFFFFF] rounded-[22px] flex flex-col items-center justify-center p-4">
              <span className="font-[900] text-[64px] leading-[96px]">{timeLeft.seconds}</span> Seconds
            </p>
          </>
        )}
        {!isSmallScreen && (
          <>
            <p className="bg-[#003459] text-[#FFFFFF] rounded-[22px] flex flex-col items-center justify-center p-4">
              <span className="font-[900] text-[64px] leading-[96px]">{timeLeft.hours}</span> Hours
            </p>
            <p className="bg-[#003459] text-[#FFFFFF] rounded-[22px] flex flex-col items-center justify-center p-4">
              <span className="font-[900] text-[64px] leading-[96px]">{timeLeft.minutes}</span> Minutes
            </p>
            <p className="bg-[#003459] text-[#FFFFFF] rounded-[22px] flex flex-col items-center justify-center p-4">
              <span className="font-[900] text-[64px] leading-[96px]">{timeLeft.seconds}</span> Seconds
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Timer;


