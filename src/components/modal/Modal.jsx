import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext'; // Import useAuth hook

const Modal = ({ product, onClose }) => {
    const [mainImage, setMainImage] = useState(product.image);
    const { addToCart } = useCart();
    const { user } = useAuth();  // Get the user from context
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleAddToCart = () => {
        if (!user) {
            // If user is not logged in, show auth modal
            setIsAuthModalOpen(true);
        } else {
            // If user is logged in, add product to cart
            addToCart(product);
            setIsSuccessModalOpen(true);

            setTimeout(() => {
                setIsSuccessModalOpen(false);
                onClose();
            }, 2000);
        }
    };

    return (
        <>
            {/* Product Modal */}
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg p-5 w-[90%] max-w-3xl h-auto relative">
                    <h3 className="text-lg font-bold mb-2 text-left">{product.title}</h3>
                    <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 text-[30px] font-bold rounded-full p-2 transition-all duration-200">×</button>

                    <div className="flex">
                        <div className="w-1/3 flex flex-col space-y-2 mt-[80px]">
                            {product.additionalImages.map((img, index) => (
                                <img key={index} src={img} alt={`Additional view ${index + 1}`} className="rounded-lg h-20 object-cover cursor-pointer w-3/4" onClick={() => setMainImage(img)} />
                            ))}
                        </div>

                        <div className="ml-4 w-2/3 flex flex-col relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                            <div className="relative overflow-hidden" onMouseMove={(e) => {
                                const { left, top, width, height } = e.target.getBoundingClientRect();
                                setMousePosition({ x: ((e.clientX - left) / width) * 100, y: ((e.clientY - top) / height) * 100 });
                            }}
                                style={{
                                    backgroundImage: isHovered ? `url(${mainImage})` : 'none',
                                    backgroundSize: isHovered ? '300%' : 'cover',
                                    backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                                }}>
                                <img src={mainImage} alt={product.title} className="w-full rounded-lg mb-4 transition-transform duration-500 transform" style={{ transform: isHovered ? 'scale(2)' : 'scale(1)' }} />
                            </div>

                            <p className="text-sm">{product.description}</p>
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

                            <button onClick={handleAddToCart} className="mt-4 bg-black text-white py-2 rounded flex items-center justify-center w-full">
                                <FaShoppingCart className="mr-2" />
                                <span className="font-semibold">დამატება</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {isSuccessModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-5 w-[80%] max-w-[500px] text-center">
                        <h4 className="text-lg font-bold mb-2">პროდუქტი წარმატებით დაემატა კალათაში</h4>
                        <button onClick={() => setIsSuccessModalOpen(false)} className="mt-4 py-2 px-6 w-[25%] rounded-full">
                            <img src="/checked.png" alt="Checked" />
                        </button>
                    </div>
                </div>
            )}

            {/* Authentication Required Modal */}
            {isAuthModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-5 w-[80%] max-w-[500px] text-center">
                        <h4 className="text-lg font-bold mb-2">გაიარეთ ავტორიზაცია</h4>
                        <p className="text-sm">გთხოვთ, გაიარეთ ავტორიზაცია, რათა დაამატოთ პროდუქტი კალათაში</p>
                        <button 
                            onClick={() => setIsAuthModalOpen(false)} 
                            className="mt-4 bg-purple-500 text-white py-2 px-4 rounded"
                        >
                            დახურვა
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
