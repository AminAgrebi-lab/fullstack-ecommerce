import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {
  // State to store the form input values dynamically
  const [data, setData] = useState({
    name: '',
    image: '',
    price: '',
    description: '',
  });

  // Hook used to redirect the user after a successful product addition
  const navigate = useNavigate();

  // Handler to update the state whenever any input field changes.
  // We use e.target.name to dynamically update the matching property in the state object
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({
      ...data, // Spread the existing data
      [e.target.name]: e.target.value, // Override only the field that changed
    });
  };

  // Separate function to call the POST API that inserts the product into the database
  const handleAddProduct = () => {
    // Base URL from environment variable (Vite requires the VITE_ prefix)
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

    // Call the Add Product API endpoint
    fetch(`${baseUrl}/products/add`, {
      method: 'POST', // It is an insert operation, so we must define the method
      headers: {
        // Tell the server that we are sending JSON data in the request body
        'Content-Type': 'application/json',
      },
      // Convert the state object into a JSON string to be sent in the body
      body: JSON.stringify(data),
    })
      .then((response) => {
        // Convert the response into JSON
        const responseData = response.json();

        // If the request succeeded return the data, otherwise throw it as an error
        if (response.ok) {
          return responseData;
        }
        throw responseData;
      })
      .then((responseData) => {
        // Show the success message sent by the backend in an alert popup
        alert(responseData.message);

        // After closing the popup, redirect the user to the homepage
        // so they can see the new product in the list
        navigate('/');
      })
      .catch((error) => console.error('Error adding product:', error));
  };

  // Handler for the form submission event
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default page reload behavior
    handleAddProduct(); // Call the API function instead of console.log
  };

  return (
    // Card-like container: border, shadow, rounded corners, padding, max-width, centered
    <div className="border border-gray-50 shadow-lg rounded-md p-10 max-w-5xl m-6 mx-auto">
      {/* Page title */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Add Product</h1>

      {/* Form with a 2-column grid layout and spacing */}
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

        {/* Description Field (Textarea) */}
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

        {/* Submit Button: spans both columns, fixed width, centered */}
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

export default AddProducts;