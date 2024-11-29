import React from 'react';
import { useCart } from '../../context/CartContext'; // Import cart context
import auzi from '../../data/auzi'; // Assuming your data is stored here

const SectionFour3 = () => {
  const { addToCart } = useCart(); // Get the addToCart function from the context

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-[1300px] w-[90%] mt-12 bg-gray-100 rounded-[20px]">
        <div className="py-16">
          <h2 className="text-2xl font-bold pl-16 mb-8">გასაბერი აუზები</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-16">
            {auzi.map((item) => (
              <div
                key={item.id}
                className="relative bg-white rounded-[20px] shadow-lg p-4 flex flex-col justify-between h-full"
              >
                <img
                  className="rounded-[20px] w-full h-40 object-cover"
                  src={item.image}
                  alt={item.title}
                />
                <div className="mt-4 flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
                  <div className="mt-3">
                    <p className="text-gray-800 font-medium">
                      ფასი: {item.price}
                    </p>
                    {item.salePrice && (
                      <p className="text-green-600 font-medium">
                        ფასდაკლებული ფასი: {item.salePrice}
                      </p>
                    )}
                    {item.discount && (
                      <p className="text-red-600 text-sm">{item.discount}</p>
                    )}
                    <p className="text-gray-500 text-sm mt-1">
                      {item.monthlyPayment}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(item)} // Add item to cart when clicked
                  className="mt-4 bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600 transition-all"
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

export default SectionFour3;
