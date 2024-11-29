import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaMobileAlt, 
  FaLaptop, 
  FaHeadphones, 
  FaCamera, 
  FaGamepad, 
  FaTv, 
  FaTabletAlt, 
  FaRegHeart, 
  FaGem, 
  FaHome, 
  FaTree, 
  FaPuzzlePiece, 
  FaDumbbell, 
  FaBirthdayCake, 
  FaCouch,
  FaShoppingCart,
  FaChevronLeft,
  FaChevronRight,
  FaEye
} from 'react-icons/fa';

import Slider from '../slider/Slider';
import Modal2 from '../modal/Modal2';

const SectionOne = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/product-category', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryName) => {
    setLoading(true);
    setCurrentPage(1); // Reset to first page when category changes
    try {
      const response = await fetch(`http://localhost:3000/product?categoryName=${encodeURIComponent(categoryName)}&limit=12`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      const filteredProducts = data.products || [];
      setProducts(filteredProducts);
      setSelectedCategory(categoryName);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const openModal = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentProduct(null);
    setIsModalOpen(false);
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setProducts([]); // Optionally clear products as well
  };

  const handleNavigate = () => {
    navigate('/refrigerators');
  };

  const handleNavigateWashingMachine = () => {
    navigate('/washing-machine');
  };

  const handleFurniture = () => {
    navigate('/furniture');
  };

  const handleBabyFeeding = () => {
    navigate('/baby-feeding');
  };
  
  return (
    <div className="mx-auto max-w-[1300px] w-[90%] mt-12 flex flex-col md:flex-row">
      <nav className="category-nav w-full md:w-[300px] h-auto overflow-y-auto overflow-x-hidden p-4">
        <ul className="list-none p-0 m-0 grid grid-cols-2 gap-4 md:grid-cols-1">
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex items-center bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer text-sm md:flex md:justify-start"
              onClick={() => handleCategoryClick(category.name)}
            >
              {categoryIcons[category.name] || <span className="w-6 h-6 mr-2" />}
              <span className="text-md font-semibold">{category.name}</span>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex-grow w-full md:w-3/4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        ) : selectedCategory ? (
          <>
          <button 
  className="mb-4 ml-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded shadow-lg hover:scale-105 transition-transform duration-200"
  onClick={handleBack}
>
  უკან დაბრუნება
</button>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentProducts.filter(product => product.image).map((product) => (
                <div key={product.id} className="bg-white p-3 rounded-lg shadow relative group">
                  <img
                    className="w-full h-36 object-cover rounded-lg mb-6"
                    src={product.image || '/placeholder.png'} 
                    alt={product.title}
                  />
                  <h3 className="font-bold text-sm">{product.title}</h3>
                  <p className="text-xs">{product.description}</p>
                  <p className="text-sm font-semibold">
                    {product.salePrice ? (
                      <>
                        <span className="line-through text-gray-500 text-xs">{product.price}</span>{' '}
                        <span>{product.salePrice}</span>
                      </>
                    ) : (
                      <span className="text-sm">{product.price}</span>
                    )}
                  </p>
                  <div 
                    className="w-[100%] absolute z-50 top-[160px] left-[180px] transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center space-x-2 cursor-pointer"
                    onClick={() => openModal(product)}
                  >
                    <FaEye className="text-gray-700" />
                    <span className="text-sm">სწრაფი ნახვა</span>
                  </div>
                  <button className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 transition-all duration-300 opacity-0 group-hover:bottom-2 group-hover:opacity-100 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded shadow-lg hover:scale-105  py-2 px-4 rounded flex items-center justify-center w-[100%]">
                    <FaShoppingCart className="mr-2 text-white" />
                    <span className="font-semibold">დამატება</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <button 
                onClick={handlePrevPage} 
                disabled={currentPage === 1} 
                className="flex items-center bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50 transition duration-200 hover:bg-gray-400"
              >
                <FaChevronLeft className="mr-2" />
              </button>
              <span className="font-semibold">{`Page ${currentPage} of ${totalPages}`}</span>
              <button 
                onClick={handleNextPage} 
                disabled={currentPage === totalPages} 
                className="flex items-center bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50 transition duration-200 hover:bg-gray-400"
              >
                <FaChevronRight className="ml-2" />
              </button>
            </div>
          </>
        ) : (
          <Slider />
        )}
      </div>

      {/* Modal for Quick View */}
      {isModalOpen && <Modal2 product={currentProduct} onClose={closeModal} />}
      
      {/* Other components or sections... */}
      {!selectedCategory && (
        <div className="grid grid-cols-2 gap-5 font-bold">
          <div className="flex flex-col items-center">
            <img className="w-full h-auto max-w-[300px] mb-1 rounded-lg cursor-pointer" src='/1.png' alt="Category 1" onClick={handleNavigate} />
            <p className="text-center text-sm">მაცივრები</p>
          </div>
          <div className="flex flex-col items-center">
            <img className="cursor-pointer w-full h-auto max-w-[300px] mb-1 rounded-lg" src='/2.png' alt="Category 2" onClick={handleNavigateWashingMachine} />
            <p className="text-center text-sm">სარეცხი მანქანა</p>
          </div>
          <div className="flex flex-col items-center">
            <img className="cursor-pointer w-full h-auto max-w-[300px] mb-1 rounded-lg" src='/3.png' alt="Category 3" onClick={handleFurniture} />
            <p className="text-center text-sm">ეზოს ავეჯი</p>
          </div>
          <div className="flex flex-col items-center">
            <img className="cursor-pointer w-full h-auto max-w-[300px] mb-1 rounded-lg" src='/4.png' alt="Category 4" onClick={handleBabyFeeding} />
            <p className="text-center text-sm">ბავშვის კვება</p>
          </div>
        </div>
      )}
    </div>
  );
};

const categoryIcons = {
  'სმარტფონები': <FaMobileAlt className="w-6 h-6 mr-2" />,
  'ლეპტოპები': <FaLaptop className="w-6 h-6 mr-2" />,
  'აუდიო': <FaHeadphones className="w-6 h-6 mr-2" />,
  'ფოტო | ვიდეო': <FaCamera className="w-6 h-6 mr-2" />,
  'გეიმინგი': <FaGamepad className="w-6 h-6 mr-2" />,
  'TV | მონიტორები': <FaTv className="w-6 h-6 mr-2" />,
  'табები': <FaTabletAlt className="w-6 h-6 mr-2" />,
  'თავის მოვლა': <FaRegHeart className="w-6 h-6 mr-2" />,
  'სამკაულები და აქსესუარები': <FaGem className="w-6 h-6 mr-2" />,
  'სახლი': <FaHome className="w-6 h-6 mr-2" />,
  'ეზო და დასვენება': <FaTree className="w-6 h-6 mr-2" />,
  'სათამაშოები': <FaPuzzlePiece className="w-6 h-6 mr-2" />,
  'ფიტნესი და იოგა': <FaDumbbell className="w-6 h-6 mr-2" />,
  'დღესასწაული': <FaBirthdayCake className="w-6 h-6 mr-2" />,
  'ავეჯი': <FaCouch className="w-6 h-6 mr-2" />,
};

export default SectionOne;
