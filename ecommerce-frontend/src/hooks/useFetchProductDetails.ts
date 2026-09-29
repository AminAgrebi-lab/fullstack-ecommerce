import { useEffect } from 'react';
import type { Product } from '../store/productSlice';

// Custom hook: encapsulates the reusable logic for fetching a single product's details.
// It receives:
//  - id:        the product id taken from the URL parameters
//  - onSuccess: callback used by the calling component to store the fetched data
//               (each component stores it in its own state, so we delegate via callback)
//  - onError:   optional callback invoked when the request fails
const useFetchProductDetails = (
  id: string | undefined,
  onSuccess: (product: Product) => void,
  onError?: (message: string) => void
) => {
  // Base URL from environment variable (Vite requires the VITE_ prefix)
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    // Fetch only when an id exists (details mode or edit mode)
    if (id) {
      fetch(`${baseUrl}/products/${id}`)
        .then((response) => {
          const data = response.json();
          if (response.ok) return data;
          throw new Error('Product not found');
        })
        .then((product) => {
          // Store the data in the calling component's state via the callback
          onSuccess(product);
        })
        .catch((error) => {
          console.error('Error fetching product details:', error);
          if (onError) onError(error.message);
        });
    }
  }, [id, baseUrl]); // Callbacks are excluded from deps to avoid re-fetch loops
};

export default useFetchProductDetails;