// Dedicated page for creating/adding a new product.
// It is rendered as a child of the '/products' route, so the URL
// clearly shows what the page is linked to (/products/a).
const AddProducts = () => {
  return (
    // Card-like container: border, large shadow, rounded corners,
    // padding 10, max width 1024px, centered with margin auto on X axis
    <div className="border border-gray-50 shadow-lg rounded-md p-10 max-w-5xl m-6 mx-auto">
      {/* Page title */}
      <h1 className="text-3xl font-semibold">Add Product</h1>
      {/* The form fields will be added in the next lecture */}
    </div>
  );
};

export default AddProducts;