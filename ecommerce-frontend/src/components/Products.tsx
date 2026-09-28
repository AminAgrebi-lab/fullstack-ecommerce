import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../store/productSlice';
import type { RootState, Product } from '../store/productSlice';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);

  useEffect(() => {
    // Base URL from environment variable (Vite requires VITE_ prefix)
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

    fetch(`${baseUrl}/products`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then((data) => {
        // Store the fetched data in the Redux store
        dispatch(setProducts(data));
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, [dispatch]);

  return (
    <div>
{/* Header row: title + Add Product button */}
{/* items-center prevents flex items from stretching vertically */}
<div className="flex justify-between items-center m-6">
  <h1 className="text-3xl font-semibold text-gray-800">Products</h1>
  
  {/* Small button-style link, exactly like the course */}
  <Link
    to="/products/add"
    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
  >
    Add Product
  </Link>
</div>

      {/* Render products only if they exist, otherwise show a message */}
      {products.length > 0 ? (
        <div className="flex gap-6 flex-wrap justify-center m-6">
          {products.map((product: Product) => (
            <Link
              key={product.id}
              to={`/product-details/${product.id}`}
              className="block border border-gray-200 rounded-md shadow-sm hover:shadow-xl transition-all duration-300 w-[260px] bg-white overflow-hidden"
            >
              <div className="h-[200px] w-full bg-gray-200 flex items-center justify-center rounded-t-md overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback UI if the image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = '<span class="text-4xl">🍎</span>';
                  }}
                />
              </div>
              <div className="p-4 border-t border-gray-200 text-center">
                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                <p className="text-green-600 font-bold mt-1">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h1 className="text-2xl font-semibold text-center mx-auto text-gray-500">
          No products available
        </h1>
      )}
    </div>
  );
};

export default Products;