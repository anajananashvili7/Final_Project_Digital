import React from 'react';
import { useCart } from '../../context/CartContext';
import leibebi from '../../data/Leibebi';

const SectionFour1 = () => {
  const { addToCart } = useCart(); // Destructure addToCart from the cart context

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-[1300px] w-[90%] mt-12 bg-gray-100 rounded-[20px]">
        <div className="py-16">
          <h2 className="text-2xl font-bold pl-16 mb-8">ლეიბები</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-16">
            {leibebi.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[20px] shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between h-full"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[150px] object-cover"
                />
                <div className="p-4 flex-grow">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-700 mb-2">{item.description}</p>
                  <p className="text-red-500 font-bold mb-1">Price: {item.price}</p>
                  {item.salePrice && (
                    <p className="text-green-500 font-bold mb-1">Sale Price: {item.salePrice} ₾</p>
                  )}
                  {item.discount && (
                    <p className="text-blue-500 text-sm mb-1">Discount: {item.discount}</p>
                  )}
                  <p className="text-gray-500 text-sm mb-4">{item.monthlyPayment}</p>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(item)}
                  className="w-full py-2 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 transition-colors duration-300"
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

export default SectionFour1;
