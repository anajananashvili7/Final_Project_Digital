import React, { useState } from 'react';
import { useCart } from '../../context/CartContext'
import refrigerators from '../../../src/data/refrigerators';

const Refrigerators = () => {
    // States for filters
    const [priceRange, setPriceRange] = useState([]);
    const [freezerLocation, setFreezerLocation] = useState([]);
    const [fridgeType, setFridgeType] = useState([]);
    const [brands, setBrands] = useState([]);
    const [volume, setVolume] = useState([]);
    const [hasDiscount, setHasDiscount] = useState(false);  // New state for discount filter

    const { addToCart } = useCart();

    // Filter function for price range
    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPriceRange((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    // Filter function for freezer location
    const handleFreezerLocationChange = (event) => {
        const value = event.target.value;
        setFreezerLocation((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    // Filter function for fridge type
    const handleFridgeTypeChange = (event) => {
        const value = event.target.value;
        setFridgeType((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    // Filter function for brands
    const handleBrandChange = (event) => {
        const value = event.target.value;
        setBrands((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    // Filter function for volume
    const handleVolumeChange = (event) => {
        const value = event.target.value;
        setVolume((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    // Filter function for discount
    const handleDiscountChange = (event) => {
        setHasDiscount(event.target.checked);  // Toggle the discount filter
    };

    // Helper function to clean currency format and convert to number
    const parsePrice = (price) => {
        return parseFloat(price.replace(' ₾', '').replace(',', '')); // Remove the '₾' and convert to number
    };

    // Function to apply filters
    const applyFilters = (fridge) => {
        const price = parsePrice(fridge.price);
        let matchesPrice = true;
        let matchesFreezerLocation = true;
        let matchesFridgeType = true;
        let matchesBrand = true;
        let matchesVolume = true;
        let matchesDiscount = true;

        // Price filter
        if (priceRange.length > 0) {
            matchesPrice = priceRange.some((range) => {
                const [min, max] = range.split('-').map((val) => parseFloat(val.replace('₾', '').trim()));
                return price >= min && price <= max;
            });
        }

        // Freezer location filter
        if (freezerLocation.length > 0) {
            matchesFreezerLocation = freezerLocation.includes(fridge.freezerLocation);
        }

        // Fridge type filter
        if (fridgeType.length > 0) {
            matchesFridgeType = fridgeType.includes(fridge.type);
        }

        // Brand filter
        if (brands.length > 0) {
            matchesBrand = brands.includes(fridge.brand);
        }

        // Volume filter
        if (volume.length > 0) {
            matchesVolume = volume.includes(fridge.volume);
        }

        // Discount filter
        if (hasDiscount) {
            matchesDiscount = fridge.discount !== undefined && fridge.discount !== null;
        }

        return matchesPrice && matchesFreezerLocation && matchesFridgeType && matchesBrand && matchesVolume && matchesDiscount;
    };

    return (
        <div className="mx-auto max-w-[1300px] w-[90%] mt-12">
            <div className="flex flex-col md:flex-row">
                {/* Filter Sidebar */}
                <div className="filter w-full md:w-1/4 p-6 bg-gray-100 rounded-lg shadow-lg mb-6 md:mb-0">
                    <h3 className="text-lg font-semibold mb-4">Filter</h3>

                    {/* Discount Filter */}
                    <div className="mb-4">
                        <h4 className="font-medium mb-2">ფასდაკლება</h4>
                        <div className="space-y-2">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    onChange={handleDiscountChange}
                                    checked={hasDiscount}
                                    className="w-4 h-4 border-2 border-gray-300 rounded-sm checked:bg-blue-500"
                                />
                                <span className="ml-2">მხოლოდ ფასდაკლებული</span>
                            </label>
                        </div>
                    </div>

                    {/* Price Range Filter */}
                    <div className="mb-4">
                        <h4 className="font-medium mb-2">ფასი</h4>
                        <div className="space-y-2">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    value="100₾-1000₾"
                                    onChange={handlePriceChange}
                                    className="w-4 h-4 border-2 border-gray-300 rounded-sm checked:bg-blue-500"
                                />
                                <span className="ml-2">100₾ - 1000₾</span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    value="1000₾-2500₾"
                                    onChange={handlePriceChange}
                                    className="w-4 h-4 border-2 border-gray-300 rounded-sm checked:bg-blue-500"
                                />
                                <span className="ml-2">1000₾ - 2500₾</span>
                            </label>
                        </div>
                    </div>

                    {/* Freezer Location Filter */}
                    <div className="mb-4">
                        <h4 className="font-medium mb-2">საყინულე კამერის მდებარეობა</h4>
                        <div className="space-y-2">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    value="top"
                                    onChange={handleFreezerLocationChange}
                                    className="w-4 h-4 border-2 border-gray-300 rounded-sm checked:bg-blue-500"
                                />
                                <span className="ml-2">ზედა</span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    value="bottom"
                                    onChange={handleFreezerLocationChange}
                                    className="w-4 h-4 border-2 border-gray-300 rounded-sm checked:bg-blue-500"
                                />
                                <span className="ml-2">ქვედა</span>
                            </label>
                        </div>
                    </div>

                    {/* Fridge Type Filter */}
                    <div className="mb-4">
                        <h4 className="font-medium mb-2">მაცივრის ტიპი</h4>
                        <div className="space-y-2">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    value="two-compartment"
                                    onChange={handleFridgeTypeChange}
                                    className="w-4 h-4 border-2 border-gray-300 rounded-sm checked:bg-blue-500"
                                />
                                <span className="ml-2">ორკამერიანი</span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    value="single-compartment"
                                    onChange={handleFridgeTypeChange}
                                    className="w-4 h-4 border-2 border-gray-300 rounded-sm checked:bg-blue-500"
                                />
                                <span className="ml-2">ერთკამერიანი</span>
                            </label>
                        </div>
                    </div>

                    {/* Brand Filter */}
                    <div className="mb-4">
                        <h4 className="font-medium mb-2">ბრენდი</h4>
                        <div className="space-y-2">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    value="HYUNDAI"
                                    onChange={handleBrandChange}
                                    className="w-4 h-4 border-2 border-gray-300 rounded-sm checked:bg-blue-500"
                                />
                                <span className="ml-2">HYUNDAI</span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    value="VESTEL"
                                    onChange={handleBrandChange}
                                    className="w-4 h-4 border-2 border-gray-300 rounded-sm checked:bg-blue-500"
                                />
                                <span className="ml-2">VESTEL</span>
                            </label>
                        </div>
                    </div>

                    {/* Total Useful Volume Filter */}
                    <div className="mb-4">
                        <h4 className="font-medium mb-2">საერთო სასარგებლო მოცულობა</h4>
                        <div className="space-y-2">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    value="313L"
                                    onChange={handleVolumeChange}
                                    className="w-4 h-4 border-2 border-gray-300 rounded-sm checked:bg-blue-500"
                                />
                                <span className="ml-2">313 ლ</span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    value="261L"
                                    onChange={handleVolumeChange}
                                    className="w-4 h-4 border-2 border-gray-300 rounded-sm checked:bg-blue-500"
                                />
                                <span className="ml-2">261 ლ</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="flex-grow md:w-3/4 p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                        {refrigerators.filter(applyFilters).map((fridge) => (
                            <div key={fridge.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-full relative">
                                {/* Discount Badge */}
                                {fridge.discount && (
                                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                        {fridge.discount}
                                    </div>
                                )}

                                {/* Image */}
                                <img
                                    className="w-full h-36 object-cover rounded-lg mb-4"
                                    src={fridge.image}
                                    alt={fridge.title}
                                />

                                {/* Title */}
                                <h3 className="font-semibold text-lg mb-2">{fridge.title}</h3>

                                {/* Description */}
                                <p className="text-sm text-gray-600 mb-4 flex-grow">{fridge.description}</p>

                                {/* Price Section */}
                                <div className="flex items-center justify-between">
                                    {fridge.discount ? (
                                        // Show price with discount (strikethrough original price)
                                        <p className="text-sm font-semibold">
                                            <span className="line-through text-gray-500">{fridge.price}</span>
                                            <span className="ml-2 text-xl text-green-600">{fridge.salePrice}</span>
                                        </p>
                                    ) : (
                                        // Show normal price if no discount
                                        <p className="text-xl font-semibold text-gray-900">
                                            {fridge.price}
                                            
                                        </p>
                                        
                                        
                                    )}
                                    <span className="text-sm text-gray-400">{fridge.monthlyPayment}</span>
                                </div>
                                <button
  onClick={() => addToCart(fridge)}  // Function to add the fridge to the cart
  className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-full"

>
  დამატება
</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Refrigerators;
