import React, { useState } from 'react';
import { useCart } from '../../context/CartContext'
import washingmachines from '../../data/washingmachines';

const WashingMachines = () => {
  // States for filters
  const [priceRange, setPriceRange] = useState([]);
  const [brands, setBrands] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [maxLoad, setMaxLoad] = useState([]);
  const [maxSpinSpeed, setMaxSpinSpeed] = useState([]);
  const [programCount, setProgramCount] = useState([]);
  const [spinClass, setSpinClass] = useState([]);
  const [hasDiscount, setHasDiscount] = useState(false);

  const { addToCart } = useCart();

  // Handle changes for each filter
  const handleFilterChange = (filter, setter) => (event) => {
    const value = event.target.value;
    setter((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Parse price to number for comparison
  const parsePrice = (price) => parseFloat(price.replace(' ₾', '').replace(',', ''));

  // Apply filters
  const applyFilters = (machine) => {
    const price = parsePrice(machine.price);
    const salePrice = parsePrice(machine.salePrice);
    let matchesPrice = true;
    let matchesBrand = true;
    let matchesMerchant = true;
    let matchesMaxLoad = true;
    let matchesMaxSpinSpeed = true;
    let matchesProgramCount = true;
    let matchesSpinClass = true;
    let matchesDiscount = true;

    // Price Filter
    if (priceRange.length > 0) {
      matchesPrice = priceRange.some((range) => {
        const [min, max] = range.split('-').map((val) => parseFloat(val.replace('₾', '').trim()));
        return salePrice >= min && salePrice <= max;
      });
    }

    // Brand Filter
    if (brands.length > 0) {
      matchesBrand = brands.some((brand) => machine.brand.toLowerCase().includes(brand.toLowerCase()));
    }

    // Merchant Filter
    if (merchants.length > 0) {
      matchesMerchant = merchants.some((merchant) => machine.merchant.toLowerCase().includes(merchant.toLowerCase()));
    }

    // Max Load Filter
    if (maxLoad.length > 0) {
      matchesMaxLoad = maxLoad.some((load) => machine.maxLoad.toString() === load);
    }

    // Max Spin Speed Filter
    if (maxSpinSpeed.length > 0) {
      matchesMaxSpinSpeed = maxSpinSpeed.some((speed) => machine.maxSpinSpeed.toString() === speed);
    }

    // Program Count Filter
    if (programCount.length > 0) {
      matchesProgramCount = programCount.includes(machine.programCount.toString());
    }

    // Spin Class Filter
    if (spinClass.length > 0) {
      matchesSpinClass = spinClass.includes(machine.spinClass);
    }

    // Discount Filter
    if (hasDiscount) {
      matchesDiscount = machine.discount !== undefined && machine.discount !== null;
    }

    return (
      matchesPrice &&
      matchesBrand &&
      matchesMerchant &&
      matchesMaxLoad &&
      matchesMaxSpinSpeed &&
      matchesProgramCount &&
      matchesSpinClass &&
      matchesDiscount
    );
  };

  return (
    <div className="mx-auto max-w-[1300px] w-[90%] mt-12">
      <div className="flex flex-col md:flex-row justify-between">
        {/* Filters Sidebar */}
        <div className="filter md:w-1/4 p-6 bg-gray-100 rounded-lg shadow-lg mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-6 text-gray-800">Filter</h3>

          {/* Price Range */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800">ფასი</h4>
            {['100₾ - 1000₾', '1000₾ - 2500₾', '2500₾ - 5000₾'].map((range) => (
              <label key={range} className="block">
                <input
                  type="checkbox"
                  value={range}
                  onChange={handleFilterChange('priceRange', setPriceRange)}
                  className="mr-2 form-checkbox text-blue-500"
                />
                {range}
              </label>
            ))}
          </div>

          {/* Brand */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800">ბრენდი</h4>
            {['MIDEA', 'SAMSUNG', 'Muller'].map((brand) => (
              <label key={brand} className="block">
                <input
                  type="checkbox"
                  value={brand}
                  onChange={handleFilterChange('brands', setBrands)}
                  className="mr-2 form-checkbox text-blue-500"
                />
                {brand}
              </label>
            ))}
          </div>

          {/* Merchant */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800">მერჩანტი</h4>
            {['Megatechnica', 'Techno Boom', 'Mtechnics'].map((merchant) => (
              <label key={merchant} className="block">
                <input
                  type="checkbox"
                  value={merchant}
                  onChange={handleFilterChange('merchants', setMerchants)}
                  className="mr-2 form-checkbox text-blue-500"
                />
                {merchant}
              </label>
            ))}
          </div>

          {/* Max Load */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800">მაქსიმალური ჩატვირთვა</h4>
            {[6, 7, 12].map((load) => (
              <label key={load} className="block">
                <input
                  type="checkbox"
                  value={load}
                  onChange={handleFilterChange('maxLoad', setMaxLoad)}
                  className="mr-2 form-checkbox text-blue-500"
                />
                {load} კგ
              </label>
            ))}
          </div>

          {/* Max Spin Speed */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800">ბრუნვის მაქსიმალური სიჩქარე</h4>
            {[1000, 1200, 1400].map((speed) => (
              <label key={speed} className="block">
                <input
                  type="checkbox"
                  value={speed}
                  onChange={handleFilterChange('maxSpinSpeed', setMaxSpinSpeed)}
                  className="mr-2 form-checkbox text-blue-500"
                />
                {speed} ბრ/წთ
              </label>
            ))}
          </div>

          {/* Program Count */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800">პროგრამების რაოდენობა</h4>
            {['15', '16'].map((count) => (
              <label key={count} className="block">
                <input
                  type="checkbox"
                  value={count}
                  onChange={handleFilterChange('programCount', setProgramCount)}
                  className="mr-2 form-checkbox text-blue-500"
                />
                {count}
              </label>
            ))}
          </div>

          {/* Spin Class */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800">გაწურვის კლასი</h4>
            {['A', 'C'].map((spinClassOption) => (
              <label key={spinClassOption} className="block">
                <input
                  type="checkbox"
                  value={spinClassOption}
                  onChange={handleFilterChange('spinClass', setSpinClass)}
                  className="mr-2 form-checkbox text-blue-500"
                />
                {spinClassOption}
              </label>
            ))}
          </div>
        </div>

        {/* Product Display */}
        <div className="md:w-3/4 flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {washingmachines.filter(applyFilters).map((machine) => (
              <div key={machine.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between h-full">
                <img
                  className="w-full h-36 object-cover rounded-lg mb-4"
                  src={machine.image}
                  alt={machine.title}
                />
                <h3 className="font-bold text-md text-gray-800">{machine.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{machine.description}</p>
                <p className="text-sm font-semibold">
                  <span className="line-through text-gray-500">{machine.price}</span>
                  <span className="text-xl text-red-500">{machine.salePrice}</span>
                </p>
                <div className="mt-auto">
                  <button
                  className="mt-4 bg-purple-500 text-white py-2 px-4 rounded-lg w-full"
                  onClick={() => addToCart(machine)}>
                    
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

export default WashingMachines;
