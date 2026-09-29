import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // ✅ Added useNavigate
import type { Product } from '../store/productSlice';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const ProductDetails = () => {
  // Extract the dynamic 'id' from the URL parameters
  const { id } = useParams<{ id: string }>();

  // Hook used to redirect the user after a successful deletion
  const navigate = useNavigate();

  // State to store the single product fetched from the server
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Switch that controls the modal visibility (closed by default)
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

    // Fetch a single product by passing the ID in the URL
    fetch(`${baseUrl}/products/${id}`)
      .then((response) => {
        const data = response.json();
        if (response.ok) return data;
        throw new Error('Product not found');
      })
      .then((data) => {
        setSelectedProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Opens the confirmation modal when the Delete button is clicked
  const handleModalOpen = () => setIsOpen(true);

  // Closes the modal (shared by the X button and the Cancel button)
  const handleModalClose = () => setIsOpen(false);

  // ✅ Calls the DELETE API to remove the product from the database
  const handleDeleteProduct = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

    fetch(`${baseUrl}/products/${id}`, {
      method: 'DELETE', // Delete operation requires the DELETE method explicitly
    })
      .then((response) => {
        const data = response.json();
        // If the request succeeded return the data, otherwise throw it as an error
        if (response.ok) return data;
        throw data;
      })
      .then((data) => {
        // Show the success message sent by the backend in an alert popup
        alert(data.message);
        // After closing the popup, redirect home so the user sees the updated list
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
        {/* Back to products link */}
        <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Back to Products
        </Link>

        {/* Product card: horizontal layout (image left, info right) */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
          {/* Left side: product image */}
          <div className="md:w-2/5 h-64 md:h-80 flex-shrink-0">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback UI if the image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = '<div class="flex items-center justify-center h-full bg-gray-200 text-6xl">🍎</div>';
              }}
            />
          </div>

          {/* Right side: info panel with action buttons */}
          <div className="md:w-3/5 bg-gray-200 p-8 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">{selectedProduct.name}</h1>
            <p className="text-2xl font-bold text-gray-800 mb-4">${selectedProduct.price}</p>
            <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>

            {/* Action buttons row */}
            <div className="flex gap-2 mt-6">
              {/* Edit button: redirects to the edit page with the product id */}
              <Link
                to={`/products/edit/${selectedProduct.id}`}
                className="border border-gray-500 px-3 py-1 rounded-md text-gray-800 hover:bg-gray-100 transition"
              >
                Edit Product
              </Link>

              {/* Delete button: opens the confirmation modal (no redirection) */}
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

      {/* ✅ Render the modal only when open, passing BOTH close and delete handlers */}
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