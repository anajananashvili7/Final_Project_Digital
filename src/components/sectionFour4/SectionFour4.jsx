import React from 'react';
import { useCart } from '../../context/CartContext'; // Importing the Cart context
import accessories from '../../data/accessories'; // Importing the accessories data

const SectionFour4 = () => {
  const { addToCart } = useCart(); // Using the addToCart function from the Cart context

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-[1300px] w-[90%] mt-12 bg-gray-100 rounded-[20px]">
        <div className="py-16">
          <h2 className="text-2xl font-bold pl-16 mb-8">საცურაო აქსესუარები</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-16">
            {accessories.map((item) => (
              <div
                key={item.id}
                className="relative border rounded-[20px] p-4 bg-white shadow-lg flex flex-col justify-between"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-[20px]"
                />
                <div className="mt-4 flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                  <div className="mt-4">
                    <p className="text-md font-bold text-gray-900">{item.price}</p>
                    {item.salePrice && (
                      <p className="text-sm text-red-500">Sale Price: {item.salePrice}</p>
                    )}
                    {item.discount && (
                      <p className="text-sm text-green-500">{item.discount}</p>
                    )}
                    <p className="text-sm text-gray-500">Monthly Payment: {item.monthlyPayment}</p>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(item)} // Add the item to cart when clicked
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

export default SectionFour4;
