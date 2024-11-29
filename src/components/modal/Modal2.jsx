import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';  // Assuming you're using a cart context to handle cart actions

const Modal2 = ({ product, onClose }) => {
    const [mainImage, setMainImage] = useState(product.image);
    const { addToCart } = useCart();  // Get addToCart function from context

    if (!product) return null;

    const handleAddToCart = () => {
        addToCart(product);  // Add the product to the cart
        onClose();  // Close the modal after adding to the cart
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-5 w-[90%] max-w-3xl h-auto relative">
                {/* Close Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 text-gray-500 bg-transparent text-[30px] font-bold rounded-full p-2 transition-all duration-200 hover:bg-gray-200 hover:shadow-lg"
                >
                    ×
                </button>

                <div className="flex flex-col">
                    {/* Product Title */}
                    <h3 className="text-lg font-bold mb-2">{product.title}</h3>

                    {/* Main Product Image */}
                    <img
                        src={mainImage}
                        alt={product.title}
                        className="w-full h-auto max-h-80 object-contain rounded-lg mb-4"
                    />

                    {/* Image Gallery (if additional images exist) */}
                    {product.additionalImages && product.additionalImages.length > 0 && (
                        <div className="flex space-x-2 mb-4">
                            {product.additionalImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`product-image-${index}`}
                                    className="w-16 h-16 object-contain cursor-pointer rounded-md border"
                                    onClick={() => setMainImage(image)} // Switch main image
                                />
                            ))}
                        </div>
                    )}

                    {/* Product Description */}
                    <p className="text-sm">{product.description}</p>

                    {/* Price and Sale Price */}
                    <p className="text-sm font-semibold mt-2">
                        {product.salePrice ? (
                            <>
                                <span className="line-through text-gray-500 text-xs">{product.price}</span>{' '}
                                <span>{product.salePrice}</span>
                            </>
                        ) : (
                            <span className="text-sm">{product.price}</span>
                        )}
                    </p>

                    {/* Add to Cart Button */}
                    <button 
                        onClick={handleAddToCart} 
                        className="mt-4 bg-black text-white py-2 rounded flex items-center justify-center w-[45%]"
                    >
                        <FaShoppingCart className="mr-2" />
                        <span className="font-semibold">დამატება</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal2;
