import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddEditProducts = () => {
  // State to store the form input values dynamically
  const [data, setData] = useState({
    name: '',
    image: '',
    price: '',
    description: '',
  });

  const navigate = useNavigate();
  // The id exists ONLY in edit mode (/products/edit/:id), undefined in add mode
  const { id } = useParams<{ id: string }>();

  // Base URL from environment variable
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  // EDIT mode: fetch the product and prefill the form fields
  useEffect(() => {
    if (id) {
      fetch(`${baseUrl}/products/${id}`)
        .then((response) => {
          const responseData = response.json();
          if (response.ok) return responseData;
          throw responseData;
        })
        .then((product) => {
          setData({
            name: product.name,
            image: product.image,
            price: String(product.price), // Convert number to string for the input
            description: product.description,
          });
        })
        .catch((error) => console.error('Error fetching product:', error));
    }
  }, [id, baseUrl]);

  // Update the state whenever any input changes (dynamic key via e.target.name)
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // POST API call to insert a NEW product
  const handleAddProduct = () => {
    fetch(`${baseUrl}/products/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        const responseData = response.json();
        if (response.ok) return responseData;
        throw responseData;
      })
      .then((responseData) => {
        alert(responseData.message);
        navigate('/'); // Redirect home to see the new product
      })
      .catch((error) => console.error('Error adding product:', error));
  };

  // PUT API call to UPDATE the selected product
  const handleEditProduct = () => {
    fetch(`${baseUrl}/products/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        const responseData = response.json();
        if (response.ok) return responseData;
        throw responseData;
      })
      .then((responseData) => {
        alert(responseData.message);
        navigate(`/product-details/${id}`); // Back to the edited product's details
      })
      .catch((error) => console.error('Error updating product:', error));
  };

  // Submit handler: chooses edit or add mode based on the id
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {
      handleEditProduct();
    } else {
      handleAddProduct();
    }
  };

  return (
    <div className="border border-gray-50 shadow-lg rounded-md p-10 max-w-5xl m-6 mx-auto">
      {/* Conditional title based on the mode */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        {id ? 'Edit Product' : 'Add Product'}
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mt-4">
        {/* Product Name Field */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
            className="border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Image URL Field */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
            value={data.image}
            onChange={handleChange}
            required
            className="border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Price Field */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={data.price}
            onChange={handleChange}
            required
            className="border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Description Field */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            rows={4}
            required
            className="border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="col-span-2 w-[400px] mx-auto mt-4 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddEditProducts;