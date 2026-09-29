// Props interface: the modal receives the close handler and the delete handler from its parent
interface DeleteConfirmationModalProps {
  onClose: () => void;
  handleDeleteProduct: () => void; // ✅ Function that calls the DELETE API
}

const DeleteConfirmationModal = ({ onClose, handleDeleteProduct }: DeleteConfirmationModalProps) => {
  return (
    // Fixed overlay: covers the whole screen, centers the modal, floats above all content
    <div className="fixed inset-0 flex justify-center items-center z-50">
      
      {/* Backdrop: dark semi-transparent layer to differentiate the modal from the UI */}
      <div className="fixed inset-0 bg-black opacity-50"></div>

      {/* Modal body: white centered card with shadow and larger text */}
      <div className="relative w-full max-w-xl bg-white p-10 shadow-lg text-xl">
        
        {/* Close (X) button pinned to the top-right corner */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-5 text-3xl p-0 text-gray-400 hover:text-gray-600 transition"
        >
          &times;
        </button>

        {/* Modal content: confirmation message + action buttons */}
        <div className="flex flex-col">
          <p className="font-semibold text-center">
            Are you sure you want to delete this product?
          </p>

          {/* Action buttons row: Delete and Cancel */}
          <div className="flex gap-4 mt-4 self-center">
            {/* ✅ Delete button: calls the DELETE API passed from the parent */}
            <button
              type="button"
              onClick={handleDeleteProduct}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
            >
              Delete
            </button>

            {/* Cancel button: closes the modal without deleting anything */}
            <button
              type="button"
              onClick={onClose}
              className="border px-3 py-1 rounded-md hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;