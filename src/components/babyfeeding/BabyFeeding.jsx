import React, { useState } from 'react';
import { useCart } from '../../context/CartContext'; // Import the custom hook for cart
import feeding from '../../data/feeding'; // Adjust the path as necessary

const BabyFeeding = () => {
  // States for filters
  const [priceRange, setPriceRange] = useState([]);
  const [brands, setBrands] = useState([]);

  const { addToCart } = useCart(); // Access the addToCart function from Cart context

  // Helper function to clean currency format and convert to number
  const parsePrice = (price) => {
    return parseFloat(price.replace('₾', '').replace(',', '')); // Remove the '₾' and convert to number
  };

  // Filter function for price range
  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPriceRange((prev) =>
      prev.includes(value) ? prev.filter((feeding) => feeding !== value) : [...prev, value]
    );
  };

  // Filter function for brands
  const handleBrandChange = (event) => {
    const value = event.target.value;
    setBrands((prev) =>
      prev.includes(value) ? prev.filter((feeding) => feeding !== value) : [...prev, value]
    );
  };

  // Function to apply filters
  const applyFilters = (feeding) => {
    const price = parsePrice(feeding.price);
    let matchesPrice = true;
    let matchesBrand = true;

    // Price filter
    if (priceRange.length > 0) {
      matchesPrice = priceRange.some((range) => {
        const [min, max] = range.split('-').map((val) => parseFloat(val.replace('₾', '').trim()));
        return price >= min && price <= max;
      });
    }

    // Brand filter
    if (brands.length > 0) {
      matchesBrand = brands.includes(feeding.brand);
    }

    return matchesPrice && matchesBrand;
  };

  return (
    <div className="mx-auto max-w-[1300px] w-[90%] mt-12">
      <div className="flex flex-col md:flex-row">
        {/* Filter Sidebar */}
        <div className="filter w-full md:w-1/4 p-6 bg-gray-100 rounded-lg shadow-lg mb-6 md:mb-0">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Filters</h3>

          {/* Price Range Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-2">Price</h4>
            {['0₾-100₾', '100₾-1000₾'].map((range) => (
              <label key={range} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value={range}
                  onChange={handlePriceChange}
                  className="w-4 h-4 border-2 border-gray-300 rounded-sm checked:bg-blue-500"
                />
                <span className="ml-2 text-sm">{range}</span>
              </label>
            ))}
          </div>

          {/* Brand Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-2">Brand</h4>
            {['Hipp', 'Humana', 'Nestle', 'Miniland', 'Avanchy', 'BambooBamboo', 'Canapol Babies'].map((brand) => (
              <label key={brand} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value={brand}
                  onChange={handleBrandChange}
                  className="w-4 h-4 border-2 border-gray-300 rounded-sm checked:bg-blue-500"
                />
                <span className="ml-2 text-sm">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-grow md:w-3/4 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {feeding.filter(applyFilters).map((feeding) => (
              <div key={feeding.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col h-full">
                <img
                  className="w-full h-36 object-cover rounded-lg mb-4"
                  src={feeding.image}
                  alt={feeding.title}
                />
                <h3 className="font-bold text-md">{feeding.title}</h3>
                <p className="text-sm">{feeding.description}</p>
                <div className="flex items-center justify-between mt-4">
                  {/* Price and Discount */}
                  <p className="text-sm font-semibold flex items-center space-x-2">
                    {feeding.discount ? (
                      <>
                        <span className="line-through text-gray-500">{feeding.price}</span>
                        <span className="ml-2">{feeding.salePrice}</span>
                        <span className="text-red-500 ml-2">{feeding.discount}</span>
                      </>
                    ) : (
                      <span>{feeding.price}</span>
                    )}
                  </p>
                </div>
                {/* Add Button at the Bottom */}
                <div className="mt-auto">
                  <button
                    className="w-full py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={() => addToCart(feeding)} // Add product to the cart
                  >
                    დამატება
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BabyFeeding;
