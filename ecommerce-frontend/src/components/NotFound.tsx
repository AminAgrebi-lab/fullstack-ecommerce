import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  // ✅ استخدام useNavigate hook
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // التوجيه للصفحة الرئيسية
  };

  const handleGoBack = () => {
    navigate(-1); // العودة للصفحة السابقة
  };

  return (
    <div className="text-center mt-20 mx-6">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-6">
        Oops! Page Not Found
      </p>
      <p className="text-gray-500 mb-8">
        The page you are looking for does not exist.
      </p>
      
      <div className="flex gap-4 justify-center">
        {/* ✅ زر العودة للصفحة الرئيسية */}
        <button
          onClick={handleGoHome}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition font-semibold"
        >
          Go to Home
        </button>

        {/* ✅ زر العودة للخلف */}
        <button
          onClick={handleGoBack}
          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition font-semibold"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;