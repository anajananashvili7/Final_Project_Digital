import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import React Icons

const AdminPanel = () => {
  // State for managing category creation
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryMessage, setCategoryMessage] = useState('');

  // State for managing product creation and editing
  const [productTitle, setProductTitle] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [products, setProducts] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  
  // State for editing a product
  const [editingProduct, setEditingProduct] = useState(null);

  // Retrieve products from localStorage
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  // Save products to localStorage
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  // Handle Category Submit
  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (categoryName && !categories.includes(categoryName)) {
      setCategories([...categories, categoryName]);
      setCategoryMessage('Category successfully created!');
      setCategoryName('');
      setTimeout(() => setCategoryMessage(''), 3000);
    }
  };

  // Handle Product Submit (Create Product)
  const handleProductSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      title: productTitle,
      description: productDescription,
      price: productPrice,
      category: productCategory,
      image: imagePreview,
    };

    setProducts([newProduct, ...products]);
    setProductTitle('');
    setProductDescription('');
    setProductPrice('');
    setProductCategory('');
    setProductImage(null);
    setImagePreview(null);
    setShowProductModal(true);
  };

  // Handle Product Edit Submit (Update Product)
  const handleProductEditSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      title: productTitle,
      description: productDescription,
      price: productPrice,
      category: productCategory,
      image: imagePreview,
    };

    const updatedProducts = products.map((product, index) =>
      index === editingProduct ? updatedProduct : product
    );
    setProducts(updatedProducts);
    setEditingProduct(null);  // Close edit mode
    setProductTitle('');
    setProductDescription('');
    setProductPrice('');
    setProductCategory('');
    setProductImage(null);
    setImagePreview(null);
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle modal close
  const closeModal = () => {
    setShowProductModal(false);
  };

  // Handle deleting a product
  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  // Handle selecting a product for editing
  const editProduct = (index) => {
    const productToEdit = products[index];
    setEditingProduct(index);
    setProductTitle(productToEdit.title);
    setProductDescription(productToEdit.description);
    setProductPrice(productToEdit.price);
    setProductCategory(productToEdit.category);
    setImagePreview(productToEdit.image);
  };

  return (
    <div className="admin-panel-container flex flex-col lg:flex-row p-6 space-x-8 bg-gray-100 min-h-screen">
      {/* Left Side - Category and Product Creation */}
      <div className="flex-[1] min-w-0 bg-white rounded-lg p-8 shadow-md mb-8 lg:mb-0">
        {/* Create Category Form */}
        <div className="mb-8 p-6 rounded-lg shadow-lg bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500">
          <h2 className="text-2xl font-bold text-white mb-4">შექმენი კატეგორია</h2>
          <form onSubmit={handleCategorySubmit}>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="კატეგორიის სახელი"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              შექმნა
            </button>
          </form>
          {categoryMessage && <p className="mt-4 text-green-500 font-semibold">{categoryMessage}</p>}
        </div>

        {/* Create Product Form */}
        <div className="p-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-green-600 to-yellow-500">
          <h2 className="text-2xl font-bold text-white mb-4">
            {editingProduct !== null ? 'პროდუქტის განახლება' : 'Create Product'}
          </h2>
          <form onSubmit={editingProduct !== null ? handleProductEditSubmit : handleProductSubmit}>
            <input
              type="text"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              placeholder="Product Title"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Product Description"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-4"
              rows="4"
              required
            />
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              placeholder="Price"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-4"
              required
            />
            <select
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-4"
              required 
            >
              <option value="">აირჩიე კატეგორია</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-3 border-2 border-gray-300 rounded-lg mt-4"
            />
            {imagePreview && (
              <div className="mt-4">
                <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
              </div>
            )}
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingProduct !== null ? 'პროდუქტის განახლება' : 'Create Product'}
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Display Products */}
      <div className="flex-[2] min-w-0 bg-white rounded-lg p-8 shadow-md">
        <h2 className="text-2xl font-bold text-purple-900 mb-6">შექმნილი პროდუქტები</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-purple-200 to-purple-300 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <button
                onClick={() => deleteProduct(index)}
                className="absolute top-2 right-2 text-red-500"
              >
                <FaTrashAlt size={20} />
              </button>
              <button
                onClick={() => editProduct(index)}
                className="absolute top-2 left-2 text-blue-500"
              >
                <FaEdit size={20} />
              </button>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-xl font-semibold text-gray-800 mt-4">{product.title}</h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-gray-900 mt-2 font-semibold">${product.price}</p>
              <p className="text-gray-500 mt-2">{product.category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product Created Modal */}
      {showProductModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-indigo-700">Product Created Successfully!</h2>
            <button
              onClick={closeModal}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
