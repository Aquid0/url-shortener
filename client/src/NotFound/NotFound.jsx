import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center bg-indigo-950">
            <h1 className="text-6xl font-bold text-white mb-4">404</h1>
            <p className="text-xl text-gray-300 mb-8">URL not found or invalid</p>
            <Link 
                to="/" 
                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
            >
                Go Home
            </Link>
        </div>
    );
}
