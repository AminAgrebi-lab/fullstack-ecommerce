import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import type { Product } from '../store/productSlice';
import useFetchProductDetails from '../hooks/useFetchProductDetails'; // Import the custom hook
import DeleteConfirmationModal from './DeleteConfirmationModal';

const ProductDetails = () => {
  // Extract the dynamic 'id' from the URL parameters
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // State to store the single product fetched from the server
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Switch that controls the modal visibility (closed by default)
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // The old useEffect is REPLACED by the custom hook.
  // The callback stores the fetched product in this component's own state.
  useFetchProductDetails(
    id,
    (product) => {
      setSelectedProduct(product);
      setLoading(false);
    },
    (message) => {
      setError(message);
      setLoading(false);
    }
  );

  // Opens the confirmation modal when the Delete button is clicked
  const handleModalOpen = () => setIsOpen(true);

  // Closes the modal (shared by the X button and the Cancel button)
  const handleModalClose = () => setIsOpen(false);

  // Calls the DELETE API to remove the product from the database
  const handleDeleteProduct = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

    fetch(`${baseUrl}/products/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        const data = response.json();
        if (response.ok) return data;
        throw data;
      })
      .then((data) => {
        alert(data.message);
        navigate('/');
      })
      .catch((err) => console.error('Error deleting product:', err));
  };

  if (loading) {
    return <div className="text-center mt-10 text-xl text-blue-500">Loading product details...</div>;
  }

  if (error || !selectedProduct) {
    return (
      <div className="text-center mt-10">
        <p className="text-xl text-red-500 mb-4">Product not found</p>
        <Link to="/" className="text-blue-600 hover:underline">Back to Products</Link>
      </div>
    );
  }

  return (
    // Fragment wraps the two top-level elements: page content + modal
    <>
      <div className="max-w-4xl mx-auto p-6">
        <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Back to Products
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-2/5 h-64 md:h-80 flex-shrink-0">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = '<div class="flex items-center justify-center h-full bg-gray-200 text-6xl">🍎</div>';
              }}
            />
          </div>

          <div className="md:w-3/5 bg-gray-200 p-8 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">{selectedProduct.name}</h1>
            <p className="text-2xl font-bold text-gray-800 mb-4">${selectedProduct.price}</p>
            <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>

            <div className="flex gap-2 mt-6">
              <Link
                to={`/products/edit/${selectedProduct.id}`}
                className="border border-gray-500 px-3 py-1 rounded-md text-gray-800 hover:bg-gray-100 transition"
              >
                Edit Product
              </Link>
              <button
                type="button"
                onClick={handleModalOpen}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <DeleteConfirmationModal
          onClose={handleModalClose}
          handleDeleteProduct={handleDeleteProduct}
        />
      )}
    </>
  );
};

export default ProductDetails;