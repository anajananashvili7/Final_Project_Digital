import React, { useState } from 'react';
import { FaShoppingCart, FaEye } from 'react-icons/fa';
import Modal from '../modal/Modal';  // Assuming the modal is the same
import { useCart } from '../../context/CartContext';  // Use the CartContext to manage the cart
import { useAuth } from '../../context/AuthContext';  // Use AuthContext to check authentication

const SectionThree = () => {
    const { isAuthenticated } = useAuth();  // Access authentication status
    const products = [
        { id: 1, title: 'Ronius მაჯის საათი V41', description: 'იაპონური მიოტას კვარცის მექანიზმი', image: '/mostwanted1.webp', price: '584₾', salePrice: '342₾', additionalImages: ['/watch0.webp', 'watch1.jpg', 'watch2.jpg'] },
        { id: 2, title: 'SharkNinja აეროგრილი Food AG551EU', description: '2460 W სიმძლავრე, 3,8 ლ მოცულობა, ვერცხლისფერი/შავი', image: '/mostwanted2.webp', price: '200₾', salePrice: '180₾',  additionalImages: ['/grill1.jpg', '/grill2.jpg', '/grill3.jpg'] },
        { id: 3, title: 'Muller სარეცხი მანქანა 6 კგ M02E61000', description: 'ბრუნვის სიჩქარე: 1000 ბრ / წთ', image: '/mostwanted3.webp', price: '759₾', salePrice: '399₾', additionalImages: ['/washing machine0.webp','/washing machine.webp', '/washing machine2.avif'] },
        { id: 4, title: 'ბუდე საქანელა მუქი ნაცრისფერი, კრემისფერი ბალიშით', description: 'მაქსიმალური დატვირთვა: 120 კგ', image: '/mostwanted4.webp', price: '198₾', salePrice: '370₾', additionalImages: ['/bude0.png', 'bude1.png', 'bude2.png'] },
        { id: 5, title: 'Chipolino ეტლი LKMIL0232GT', description: 'ნაცრისფერი ეტლი', image: '/mostwanted5.webp', price: '326₾', salePrice: '450₾', additionalImages: ['/etli1.jpg', '/etli2.png'] },
        { id: 6, title: 'ნაოჭების საწინააღმდეგო კრემი', description: 'ატენიანებს ღრმად', image: '/mostwanted6.jpg', price: '120₾', salePrice: '60₾', additionalImages: ['/cream0.jpg', '/cream1.jpg']  },
        { id: 7, title: 'ჯამების ნაკრები', description: '3 ცალიანი ფერადი ჯამების კომპლექტი', image: '/mostwanted7.png', price: '30₾', salePrice: '15₾', additionalImages: ['/jami0.jfif', '/jami1.jfif']  },
        { id: 8, title: 'ნაყინის აპარატი', description: 'ვარდისფერი, მაღალი სიმძლავრის', image: '/mostwanted8.jpg', price: '400₾', salePrice: '320₾', additionalImages: ['/icecream0.jpg', '/icecream1.jpg']  },
        { id: 9, title: 'მინის სათავსოები', description: 'მინის, ხის თავსახური', image: '/mostwanted9.png', price: '39₾', salePrice: '25₾', additionalImages: ['/mina0.jfif', '/mina1.jfif']  },
        { id: 10, title: 'ქვაბების ნაკრები', description: 'მეტალის ცეცხლგამძლე ქვაბები', image: '/mostwanted10.png', price: '600₾', salePrice: '370₾', additionalImages: ['/metal1.png', 'metal2.png', '/metal3.png']  },
    ];

    const { addToCart } = useCart();  // Access the addToCart function from CartContext

    // Pagination state
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 5;

    const nextPage = () => {
        if (currentIndex + itemsPerPage < products.length) {
            setCurrentIndex(currentIndex + itemsPerPage);
        }
    };

    const prevPage = () => {
        if (currentIndex - itemsPerPage >= 0) {
            setCurrentIndex(currentIndex - itemsPerPage);
        }
    };

    const [currentProduct, setCurrentProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);  // Success modal state
    const [authMessage, setAuthMessage] = useState('');  // Message state for authentication check

    const openModal = (product) => {
        setCurrentProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setCurrentProduct(null);
        setIsModalOpen(false);
    };

    // Handle Add to Cart
    const handleAddToCart = (product) => {
        if (!isAuthenticated) {
            setAuthMessage('გთხოვთ, პროდუქტის დასამატებლად გაიაროთ ავტორიზაცია');
            setTimeout(() => setAuthMessage(''), 3000); // Clear message after 3 seconds
        } else {
            addToCart(product);  // Add product to the cart
            setIsSuccessModalOpen(true);  // Open the success modal
            setTimeout(() => {
                setIsSuccessModalOpen(false);  // Close the success modal after 2 seconds
            }, 2000);
        }
    };

    // Helper function to calculate discount percentage
    const calculateDiscountPercentage = (price, salePrice) => {
        if (!price || !salePrice) return 0;
        return Math.round(((price - salePrice) / price) * 100);
    };

    return (
        <div className="mx-auto max-w-[1300px] w-[90%] mt-12 flex flex-col">
            <h2 className="text-2xl font-bold mb-4">ყველაზე მოთხოვნადი</h2>
            
            {/* Display message if not authenticated */}
            {authMessage && (
                <p className="text-red-500 mb-4">{authMessage}</p>
            )}

            <div className="flex justify-end mb-4">
                <button 
                    onClick={prevPage} 
                    disabled={currentIndex === 0}
                    className="bg-white text-gray-700 px-3 py-3 rounded-full border transition duration-500 hover:border-black hover:shadow-md disabled:opacity-50 flex items-center justify-center"
                >
                    <img src="/back.png" alt="Previous" className="w-4 h-4" />
                </button>
                <button 
                    onClick={nextPage} 
                    disabled={currentIndex + itemsPerPage >= products.length}
                    className="bg-white text-gray-700 px-3 py-3 rounded-full border transition duration-500 hover:border-black hover:shadow-md disabled:opacity-50 flex items-center justify-center ml-2"
                >
                    <img src="/front.png" alt="Next" className="w-4 h-4" />
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {products.slice(currentIndex, currentIndex + itemsPerPage).map((product) => {
                    const discountPercentage = product.salePrice ? calculateDiscountPercentage(Number(product.price.replace('₾', '').trim()), Number(product.salePrice.replace('₾', '').trim())) : 0;
                    return (
                        <div key={product.id} className="bg-white p-3 rounded-lg shadow relative group flex flex-col h-full">
                            <div className="flex justify-center mb-2">
                                <img
                                    className="w-25 h-25 rounded-lg"
                                    src={product.image || '/placeholder.png'}
                                    alt={product.title}
                                />
                            </div>
                            <h3 className="font-bold text-sm">{product.title}</h3>
                            <p className="text-xs mb-2 flex-grow">{product.description}</p>
                            <div className="flex items-center justify-between mb-4">
                                {product.salePrice && discountPercentage > 0 && (
                                    <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full mr-2">
                                        {discountPercentage}% off
                                    </div>
                                )}
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
                            </div>

                            {/* Eye Icon and Quick View Button */}
                            <div 
                                className="absolute top-[220px] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center space-x-2 cursor-pointer"
                                onClick={() => openModal(product)} // Open modal on clicking the eye icon
                            >
                                <FaEye className="text-gray-700" />
                                <span className="text-sm">სწრაფი ნახვა</span>
                            </div>

                            <button 
                                onClick={() => handleAddToCart(product)}  // Add the product to the cart
                                className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 transition-all duration-300 opacity-0 group-hover:bottom-2 group-hover:opacity-100 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded shadow-lg hover:scale-105  py-2 px-4 rounded flex items-center justify-center w-[100%]"
                            >
                                <FaShoppingCart className="mr-2 text-white" />
                                <span className="font-semibold">დამატება</span>
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Modal Component for Quick View */}
            {isModalOpen && currentProduct && (
                <Modal onClose={closeModal} product={currentProduct} />
            )}

{isSuccessModalOpen && isAuthenticated && (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <h4 className="text-lg font-bold mb-2">პროდუქტი წარმატებით დაემატა კალათში</h4>
            <p>გთხოვთ, გააგრძელოთ შოპინგი.</p>
        </div>
    </div>
)}

        </div>
    );
};

export default SectionThree;
