import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Product } from '../store/productSlice';

const ProductDetails = () => {
  // Extract the dynamic 'id' from the URL parameters
  const { id } = useParams<{ id: string }>();
  
  // Create a state to store the data of the single product fetched from the server
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    
    // Call the API to fetch a single product by passing the ID in the URL
    fetch(`${baseUrl}/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Product not found');
        }
        return response.json();
      })
      .then((data) => {
        // Store the fetched object directly into the selectedProduct state
        setSelectedProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

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
    <div className="max-w-3xl mx-auto p-6">
      {/* Back to Products Link */}
      <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Back to Products
      </Link>
      
      {/* Product Card - Smaller size matching the course design */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Product Image - FIXED smaller size */}
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
        
        {/* Right Side: Product Information - Light gray background */}
        <div className="md:w-3/5 bg-neutral-50 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            {selectedProduct.name}
          </h1>
          
          <p className="text-2xl font-bold text-gray-800 mb-4">
            ${selectedProduct.price}
          </p>
          
          <p className="text-gray-600 leading-relaxed">
            {selectedProduct.description}
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default ProductDetails;