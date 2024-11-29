import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  // Define suggestions with corresponding routes
  const suggestions = [
    { label: 'მაცივრები', route: '/refrigerators' },
    { label: 'სარეცხი მანქანები', route: '/washing-machine' },
    { label: 'ეზოს ავეჯი', route: '/furniture' },
    { label: 'ბავშვის კვება', route: '/baby-feeding' },
  ];

  // Calculate total number of items in the cart
  const totalItemsInCart = cart.reduce((acc, product) => acc + product.quantity, 0);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Update suggestions based on input
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Filter suggestions based on input
    if (query) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.label.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (route) => {
    setSearchQuery(''); // Clear the input
    setFilteredSuggestions([]); // Hide the dropdown
    navigate(route); // Navigate to the chosen route
  };

  return (
    <header className="w-full bg-gradient-to-r from-blue-400 via-pink-500 to-purple-600 sticky top-0 z-50 shadow-lg">
      <p className="text-center text-lg text-white font-bold py-2">
        ყოველთვის უკეთესი შეთავაზება
      </p>
      <div className="flex flex-col sm:flex-row justify-between items-center pb-4 pt-4 px-8 border-b border-gray-300 bg-white">
        <Link to="/">
          <img className="w-52 cursor-pointer" src='/logo.svg' alt="Logo" />
        </Link>

        {/* Search Bar with Dropdown Suggestions */}
        <div className="relative flex items-center flex-grow mx-2">
          <input
            type="text"
            className="h-10 w-full sm:w-96 text-blue-700 text-sm px-3 rounded-lg border-none bg-blue-100 focus:outline-none focus:ring-2 focus:ring-gray-300 pl-10"
            placeholder="ძიება ვენდუზე"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <img
            className="absolute left-3 w-5 h-5 cursor-pointer"
            src='/search-icon.png'
            alt="Search Icon"
            onClick={() => handleSuggestionClick(searchQuery)}
          />

          {/* Dropdown for suggestions */}
          {filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg z-10">
              {filteredSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                  onClick={() => handleSuggestionClick(suggestion.route)}
                >
                  {suggestion.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Auth or Cart with User Info */}
        <div className="flex items-center justify-end flex-shrink-0">
          {isAuthenticated && (
            <Link to="/cart" className="relative group">
              <div className="relative group">
                <img className="w-8 mr-4 cursor-pointer" src='/cart.png' alt="Cart" />
                {totalItemsInCart > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItemsInCart}
                  </span>
                )}
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-white bg-black text-sm py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  კალათა
                </span>
              </div>
            </Link>
          )}

          {isAuthenticated ? (
            <>
              <div className="relative group">
                <span
                  className="text-sm font-semibold mr-4 cursor-pointer"
                  onClick={() => navigate('/admin-panel')}
                >
                  {user.name}
                </span>
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-white bg-black text-sm py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  მომხმარებელი
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center bg-white border border-gray-300 rounded-lg py-2 px-3 hover:bg-gray-200 transition"
                aria-label="Logout"
              >
                <img className="w-6 mr-1" src='/people.png' alt="Logout" />
                <span className="text-sm">გამოსვლა</span>
              </button>
            </>
          ) : (
            <Link to="/join-community">
              <button className="flex items-center bg-white border border-gray-300 rounded-lg py-2 px-3 hover:bg-gray-200 transition">
                <img className="w-6 mr-1" src='/people.png' alt="Sign In" />
                <span className="text-sm">შესვლა</span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
