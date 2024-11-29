import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, emptyCart, updateQuantity } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [errors, setErrors] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: ''
  });

  const parsePrice = (price) => {
    if (typeof price === 'string') {
      price = price.replace(',', '.');
      return parseFloat(price);
    }
    return price;
  };

  const totalPrice = cart.reduce((acc, product) => {
    const price = product.salePrice ? parsePrice(product.salePrice) : parsePrice(product.price);
    return acc + price * product.quantity;
  }, 0);

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleBuy = () => {
    setIsModalOpen(true);
  };

  const validateCardNumber = (cardNumber) => {
    if (cardNumber.length !== 11 || !/^\d{11}$/.test(cardNumber)) {
      return 'ბარათის ნომერი უნდა შედგებოდეს მხოლოდ 11 ციფრისგან';
    }
    return '';
  };

  const validateExpiryMonth = (month) => {
    if (month < 1 || month > 12 || !/^\d{2}$/.test(month)) {
      return 'გთხოვთ, სწორად შეიყვანოთ თვე';
    }
    return '';
  };

  const validateExpiryYear = (year) => {
    const currentYear = new Date().getFullYear();
    if (!/^\d{4}$/.test(year) || year < 2024 || year > 2034) {
      return 'გთხოვთ, სწორად შეიყვანოთ წელი';
    }
    return '';
  };

  const validateCVC = (cvc) => {
    if (cvc.length !== 3 || !/^\d{3}$/.test(cvc)) {
      return 'CVC უნდა შედგებოდეს მხოლოდ 3 ციფრისგან';
    }
    return '';
  };

  const handlePayment = (event) => {
    event.preventDefault();

    const cardNumber = event.target.cardNumber.value.trim();
    const expiryMonth = event.target.expiryMonth.value.trim();
    const expiryYear = event.target.expiryYear.value.trim();
    const cvc = event.target.cvc.value.trim();

    const cardNumberError = validateCardNumber(cardNumber);
    const expiryMonthError = validateExpiryMonth(expiryMonth);
    const expiryYearError = validateExpiryYear(expiryYear);
    const cvcError = validateCVC(cvc);

    setErrors({
      cardNumber: cardNumberError,
      expiryMonth: expiryMonthError,
      expiryYear: expiryYearError,
      cvc: cvcError
    });

    // Check if there are any errors
    if (!cardNumberError && !expiryMonthError && !expiryYearError && !cvcError) {
      setIsLoading(true); // Start loading
      setTimeout(() => {
        setIsLoading(false); // Stop loading after 3 seconds
        setPaymentSuccess(true); // Show success message
        emptyCart(); // Empty the cart
        setTimeout(() => {
          setPaymentSuccess(false); // Reset success message after a few seconds
          setIsModalOpen(false); // Close modal
        }, 3000);
      }, 3000);
    }
  };

  // Handle increasing/decreasing quantity
  const handleQuantityChange = (productId, operation) => {
    if (operation === 'increase') {
      updateQuantity(productId, 1); // Increase quantity by 1
    } else if (operation === 'decrease') {
      updateQuantity(productId, -1); // Decrease quantity by 1, ensuring quantity doesn't go below 1
    }
  };

  return (
    <div className="mx-auto max-w-[1300px] w-[90%] mt-12">
      <h2 className="text-2xl font-bold mb-4">კალათა</h2>

      <button
        onClick={emptyCart}
        className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded shadow-lg hover:scale-105 transition-transform duration-200"
      >
        კალათის გასუფთავება
      </button>

      {cart.length === 0 ? (
        <p>კალათა ცარიელია</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {cart.map((product) => (
              <div key={product.id} className="bg-white p-3 rounded-lg shadow relative">
                <img
                  className="w-25 h-25 rounded-lg"
                  src={product.image || '/placeholder.png'}
                  alt={product.title}
                />
                <h3 className="font-bold text-sm">{product.title}</h3>
                <p className="text-xs mb-2">{product.description}</p>
                <p className="text-sm font-semibold">
                  {product.salePrice ? (
                    <>
                      <span className="line-through text-gray-500 text-xs">{product.price}</span>{' '}
                      <span>{product.salePrice}</span>
                    </>
                  ) : (
                    <span>{product.price}</span>
                  )}
                </p>
                <p className="text-sm font-semibold">
                  რაოდენობა:
                  <button
                    onClick={() => handleQuantityChange(product.id, 'decrease')}
                    className="text-red-500 mx-2"
                  >
                    -
                  </button>
                  {product.quantity}
                  <button
                    onClick={() => handleQuantityChange(product.id, 'increase')}
                    className="text-green-500 mx-2"
                  >
                    +
                  </button>
                </p>

                <button
                  onClick={() => handleRemoveItem(product.id)}
                  className="absolute bottom-2 right-2 text-white p-2 bg-gradient-to-r from-purple-500 to-pink-500 font-semibold py-2 px-4 rounded shadow-lg hover:scale-105 transition-transform duration-200"
                >
                  წაშლა
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleBuy}
            className="mt-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-2 px-6 rounded shadow-lg hover:scale-105 transition-transform duration-200"
          >
            ყიდვა
          </button>
        </>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-5 w-[90%] max-w-3xl h-auto relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-white text-xl font-bold p-2 rounded-[8px] bg-gradient-to-r from-green-400 to-blue-500 hover:scale-110 transition-transform duration-200"
            >
              X
            </button>

            <div className="flex">
              <div className="w-1/2 pr-4">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">კალათაში დამატებული პროდუქცია</h4>
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {cart.map((product) => (
                    <div key={product.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm relative">
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.image || '/placeholder.png'}
                          alt={product.title}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="text-sm">
                          <h5 className="font-medium text-gray-800">{product.title}</h5>
                          <p className="text-gray-500">x{product.quantity}</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-800 font-semibold">
                        {product.salePrice ? (
                          <>
                            <span className="line-through text-gray-500 text-xs">{product.price}</span>{' '}
                            <span>{product.salePrice}</span>
                          </>
                        ) : (
                          <span>{product.price}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                 {/* Display the total amount to be paid here */}
                 <div className="mt-4 text-xl font-semibold">
                      სულ გადასახდელი: <span>{totalPrice.toFixed(2)} ლარი</span>
                    </div>
              </div>

              <div className="w-1/2 pl-4">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">გადახდა</h4>
                {paymentSuccess && (
                  <div className="text-green-500 mb-4">გადახდა წარმატებით დასრულდა!</div>
                )}

                <form onSubmit={handlePayment}>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-medium">ბარათის ნომერი</label>
                      <input
                        type="text"
                        name="cardNumber"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                      />
                      {errors.cardNumber && <span className="text-red-500">{errors.cardNumber}</span>}
                    </div>

                    <div className="flex space-x-4">
                      <div>
                        <label className="block font-medium">თვე</label>
                        <input
                          type="text"
                          name="expiryMonth"
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          placeholder="MM"
                        />
                        {errors.expiryMonth && <span className="text-red-500">{errors.expiryMonth}</span>}
                      </div>

                      <div>
                        <label className="block font-medium">წელი</label>
                        <input
                          type="text"
                          name="expiryYear"
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          placeholder="YYYY"
                        />
                        {errors.expiryYear && <span className="text-red-500">{errors.expiryYear}</span>}
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium">CVC</label>
                      <input
                        type="text"
                        name="cvc"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="CVC"
                      />
                      {errors.cvc && <span className="text-red-500">{errors.cvc}</span>}
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full p-3 text-white font-semibold rounded-lg bg-gradient-to-r from-green-400 to-blue-500 hover:scale-110 transition-transform duration-200  ${isLoading ? 'bg-gray-500' : 'bg-blue-500'} ${isLoading ? 'cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    >
                      {isLoading ? 'მიმდინარეობს გადახდა...' : 'გადახდა'}
                    </button>

                   
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
