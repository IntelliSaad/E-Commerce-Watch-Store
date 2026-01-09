// src/pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4">
            <h1 className="text-6xl font-bold text-gray-600 mb-4">404</h1>
            <p className="text-xl text-gray-400 mb-8">Page Not Found</p>
            <Link
                to="/"
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors"
            >
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;
