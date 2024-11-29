import React from 'react';
import { useCart } from '../../context/CartContext';
import satsmendi from '../../data/Satsmendi';  // Assuming this file contains the data

const SectionFour2 = () => {
  const { addToCart } = useCart();  // Get the addToCart function from the cart context

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-[1300px] w-[90%] mt-12 bg-gray-100 rounded-[20px]">
        <div className="py-16">
          <h2 className="text-2xl font-bold pl-16 mb-8">სარეცხი საშუალებები</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-16">
            {satsmendi.map((item) => (
              <div
                key={item.id}
                className="relative bg-white rounded-[20px] shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between h-full"
              >
                <img
                  className="rounded-t-[20px] w-full h-[200px] object-cover"
                  src={item.image}
                  alt={item.title}
                />
                <p className="absolute top-2 left-1/2 -translate-x-1/2 text-white bg-black/70 px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap">
                  {item.title}
                </p>
                <div className="p-4 flex-grow">
                  <p className="text-gray-700 mt-2">{item.description}</p>
                  <p className="text-red-500 font-bold">{item.price}</p>
                  {item.salePrice && (
                    <p className="text-green-500 font-bold">{item.salePrice}</p>
                  )}
                  {item.discount && (
                    <p className="text-blue-500 text-sm">{item.discount}</p>
                  )}
                  <p className="text-gray-500 text-sm">{item.monthlyPayment}</p>
                </div>
                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(item)}  // Add item to cart when button is clicked
                  className="w-full py-2 mt-4 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 transition-colors duration-300"
                >
                  დამატება
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionFour2;
