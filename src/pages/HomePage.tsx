import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white text-center px-6">
      <h1 className="text-5xl font-bold mb-4">Welcome to Movix</h1>
      <p className="text-lg text-gray-300 mb-6">Your ultimate destination for booking movie tickets effortlessly.</p>
      
      <Link to="/login" className="bg-red-500 hover:bg-red-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300">
        Book Movie Tickets
      </Link>
    </div>
  );
};

export default HomePage;
