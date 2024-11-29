import React, { useState } from 'react';
import { useCart } from '../../context/CartContext'
import furnitureData from '../../data/furniture'; // Adjust the path as necessary

const Furniture = () => {
  // States for filters
  const [priceRange, setPriceRange] = useState([]);
  const [brands, setBrands] = useState([]);
  const [hasDiscount, setHasDiscount] = useState(false);

  const { addToCart } = useCart();

  // Helper function to clean currency format and convert to number
  const parsePrice = (price) => {
    return parseFloat(price.replace('₾', '').replace(',', '')); // Remove the '₾' and convert to number
  };

  // Filter function for price range
  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPriceRange((prev) =>
      prev.includes(value) ? prev.filter((furniture) => furniture !== value) : [...prev, value]
    );
  };

  // Filter function for brands
  const handleBrandChange = (event) => {
    const value = event.target.value;
    setBrands((prev) =>
      prev.includes(value) ? prev.filter((furniture) => furniture !== value) : [...prev, value]
    );
  };

  // Filter function for discount
  const handleDiscountChange = (event) => {
    setHasDiscount(event.target.checked);  // Toggle the discount filter
  };

  // Function to apply filters
  const applyFilters = (furniture) => {
    const price = parsePrice(furniture.price);
    let matchesPrice = true;
    let matchesBrand = true;
    let matchesDiscount = true;

    // Price filter
    if (priceRange.length > 0) {
      matchesPrice = priceRange.some((range) => {
        const [min, max] = range.split('-').map((val) => parseFloat(val.replace('₾', '').trim()));
        return price >= min && price <= max;
      });
    }

    // Brand filter
    if (brands.length > 0) {
      matchesBrand = brands.includes(furniture.brand);
    }

    // Discount filter
    if (hasDiscount) {
      matchesDiscount = furniture.discount > 0;
    }

    return matchesPrice && matchesBrand && matchesDiscount;
  };

  return (
    <div className="mx-auto max-w-[1300px] w-[90%] mt-12">
      <div className="flex flex-col md:flex-row">
        {/* Filter Sidebar */}
        <div className="filter w-full md:w-1/4 p-6 bg-gray-100 rounded-lg shadow-lg mb-6 md:mb-0">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Filters</h3>

          {/* Discount Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-2">Discount</h4>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                onChange={handleDiscountChange}
                checked={hasDiscount}
                className="w-4 h-4 border-2 border-gray-300 rounded-sm checked:bg-blue-500"
              />
              <span className="ml-2 text-sm">
                მხოლოდ ფასდაკლებული
              </span>
            </label>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-2">Price</h4>
            {['0₾-100₾', '100₾-1000₾', '1000₾-2500₾'].map((range) => (
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
            {['COMFORT', 'Other', 'OHOHO'].map((brand) => (
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
            {furnitureData.filter(applyFilters).map((furniture) => (
              <div key={furniture.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col h-full">
                <img
                  className="w-full h-36 object-cover rounded-lg mb-4"
                  src={furniture.image}
                  alt={furniture.title}
                />
                <h3 className="font-bold text-md">{furniture.title}</h3>
                <p className="text-sm">{furniture.description}</p>
                <div className="flex items-center justify-between mt-4">
                  {/* Price and Discount */}
                  <p className="text-sm font-semibold flex items-center space-x-2">
                    {/* Display the price with line-through for discounted items */}
                    {furniture.discount > 0 ? (
                      <>
                        <span className="line-through text-gray-500">{furniture.price}</span>
                        <span className="ml-2">{furniture.salePrice}</span>
                        <span className="text-red-500 ml-2">{furniture.discount}% off</span>
                      </>
                    ) : (
                      <span>{furniture.price}</span>  // Always show the price even if there's no discount
                    )}
                  </p>
                
                  {/* Monthly Payment */}
                  {furniture.monthlyPayment && <p className="text-sm">{furniture.monthlyPayment}</p>}
                </div>
              
                {/* Add to Cart button */}
                <div className="mt-auto">
                  <button
                    onClick={() => addToCart(furniture)} // Pass the correct furniture item to handle the cart logic
                    className="px-4 py-2 bg-purple-600 text-white rounded-full w-full"
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

export default Furniture;
