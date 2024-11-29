import React, { useState, useEffect } from 'react';

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    { src: '/slider1.png' },
    { src: '/slider2.png' },
    { src: '/slider3.png' },
    { src: '/slider4.png' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [slideIndex]);

  const handleNextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full sm:w-[90%] md:w-[80%] mx-auto h-[60vh] overflow-hidden mb-8 mt-[-170px] md:mt-0"> {/* Adjust width here */}
      {slides.map((slide, index) => (
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${index === slideIndex ? 'opacity-100' : 'opacity-0'}`}
          key={index}
        >
          <img
            className="block mx-auto rounded-2xl h-full w-full object-cover" // Ensure it covers full size
            src={slide.src}
            alt={`Slide ${index + 1}`}
          />
        </div>
      ))}
    
      {/* Previous Button */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-4 bg-white rounded-full shadow-lg hover:bg-gray-200 transition"
        onClick={handlePrevSlide}
      >
        <img src='/back.png' alt="Previous slide" className="w-6 h-6" />
      </button>
    
      {/* Next Button */}
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-4 bg-white rounded-full shadow-lg hover:bg-gray-200 transition"
        onClick={handleNextSlide}
      >
        <img src='/front.png' alt="Next slide" className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Slider;
