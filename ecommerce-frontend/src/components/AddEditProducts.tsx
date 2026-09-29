import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchProductDetails from '../hooks/useFetchProductDetails'; // Import the custom hook

const AddEditProducts = () => {
  // State to store the form input values dynamically
  const [data, setData] = useState({
    name: '',
    image: '',
    price: '',
    description: '',
  });

  const navigate = useNavigate();
  // The id exists ONLY in edit mode, undefined in add mode
  const { id } = useParams<{ id: string }>();

  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  // EDIT mode: the custom hook fetches the product and the callback
  // prefills the controlled form fields with its data
  useFetchProductDetails(id, (product) => {
    setData({
      name: product.name,
      image: product.image,
      price: String(product.price), // Convert number to string for the input
      description: product.description,
    });
  });

  // Handler to update the state whenever any input field changes
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
        navigate('/');
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
        navigate(`/product-details/${id}`);
      })
      .catch((error) => console.error('Error updating product:', error));
  };

  // Submit handler: chooses between edit mode and add mode based on the id
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
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">Product Name</label>
          <input type="text" name="name" value={data.name} onChange={handleChange} required
            className="border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">Image URL</label>
          <input type="text" name="image" value={data.image} onChange={handleChange} required
            className="border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">Price</label>
          <input type="number" name="price" value={data.price} onChange={handleChange} required
            className="border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">Description</label>
          <textarea name="description" value={data.description} onChange={handleChange} rows={4} required
            className="border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <button type="submit"
          className="col-span-2 w-[400px] mx-auto mt-4 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition font-semibold">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddEditProducts;