import React, { useState, useEffect } from 'react';
import swiper from '../../data/swiper2';

const SectionNine = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3); 
  const [isSmallScreen, setIsSmallScreen] = useState(false); 

 
  const updateCardsPerPage = () => {
    if (window.innerWidth < 400) {
      setIsSmallScreen(true); 
      setCardsPerPage(1); 
    } else if (window.innerWidth < 640) {
      setIsSmallScreen(false);
      setCardsPerPage(1); 
    } else if (window.innerWidth < 1040) {
      setIsSmallScreen(false);
      setCardsPerPage(1); 
    } else if (window.innerWidth < 1440) {
      setIsSmallScreen(false);
      setCardsPerPage(2); 
    } else {
      setIsSmallScreen(false);
      setCardsPerPage(3); 
    }
  };

  useEffect(() => {
    updateCardsPerPage(); 
    window.addEventListener('resize', updateCardsPerPage); 

    return () => {
      window.removeEventListener('resize', updateCardsPerPage); 
    };
  }, []);

  const handleNext = () => {
    if (currentIndex < swiper.length - cardsPerPage) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="swiper-container pt-[100px] pb-[70px] px-[110px] flex flex-col items-center font-sf-pro">
      <div className="flex justify-between items-center w-full">
        <div>
          <p className="text-[16px] leading-[24px]">გაქვთ სახლი მოსაწყობი?</p>
          <h5 className="text-[24px] leading-[36px] text-[#003459] pt-[2px]">
            გადახედე ჩვენს ფასდაკლებებს
          </h5>
        </div>
      </div>

      
      {isSmallScreen ? (
        <div className="flex space-x-4 mt-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="border-[#003459] border-[1.5px] rounded-[57px] text-[#003459] bg-transparent w-[66px] h-[44px] disabled:opacity-50 flex items-center justify-center"
          >
            <img src="/back.png" alt="Back" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= swiper.length - cardsPerPage}
            className="border-[#003459] border-[1.5px] rounded-[57px] text-[#003459] bg-transparent w-[66px] h-[44px] disabled:opacity-50 flex items-center justify-center"
          >
            <img src="/front.png" alt="Next" />
          </button>
        </div>
      ) : (
        <div className="flex space-x-4 mt-4 justify-between w-full">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="border-[#003459] border-[1.5px] rounded-[57px] text-[#003459] bg-transparent w-[66px] h-[44px] disabled:opacity-50 flex items-center justify-center"
          >
            <img src="/back.png" alt="Back" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= swiper.length - cardsPerPage}
            className="border-[#003459] border-[1.5px] rounded-[57px] text-[#003459] bg-transparent w-[66px] h-[44px] disabled:opacity-50 flex items-center justify-center"
          >
            <img src="/front.png" alt="Next" />
          </button>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-[20px] mt-4">
        {swiper.slice(currentIndex, currentIndex + cardsPerPage).map((item, index) => (
          <div
            key={index}
            className="relative w-[380px] h-[500px] p-[8px] rounded-[12px_0_0_0] shadow-[0px_4px_28px_-2px_rgba(0,0,0,0.08)]"
          >
            <div className="bg-white h-full rounded-lg flex flex-col">
              <img src={item.img} alt={item.title} className="w-full h-[300px] object-cover rounded-[12px] pb-[20px]" />
              <div className="bg-[#00A7E7] text-[#FDFDFD] text-[14px] text-center rounded-[28px] h-[25px] w-[70%] py-[2px] mx-[8px]">მცენარეების მოყვარულთათვის</div>
              <h3 className="text-[16px] leading-[24px] text-[#00171F] font-bold pt-[10px] pb-[6px] px-[8px]">{item.title}</h3>
              <p className="text-[#242B33] text-[14px] leading-[20px] px-[8px]">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionNine;
