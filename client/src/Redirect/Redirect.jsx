import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Redirect = () => {
    const { code } = useParams();

    useEffect(() => {
        // Redirect to server endpoint which handles the actual redirect
        window.location.href = `http://localhost:3000/${code}`;
    }, [code]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-indigo-950">
            <p className="text-lg text-white">Redirecting...</p>
        </div>
    );
}