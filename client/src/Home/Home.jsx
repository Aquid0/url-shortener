import { useState } from 'react'
import axios from 'axios'
import { Header } from '../components/Header'

const getBaseUrl = () => {
  return import.meta.env.VITE_API_URL || window.location.origin;
};

export const Home = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('/api/v1/shorten', { url })
      .then(response => {
        setShortUrl(response.data.shortUrl);
      })
      .catch(error => {
        console.error('Error shortening URL:', error);
      });
  }

  const fullShortUrl = `${getBaseUrl()}/${shortUrl}`;

  return (
    <div className="min-h-screen w-full flex flex-col bg-indigo-950">
      <Header />
      <main className="flex-1 flex items-center justify-center py-10">
        <div className="flex flex-col justify-center gap-2 items-center bg-cyan-900/20 w-2/3 rounded-[3rem] border-cyan-900 border-1 p-5">  
          <div className="text-white text-4xl font-bold mb-8">
            URL Shortener
          </div>
          <div className="flex flex-col bg-white w-full rounded-[2.5rem] p-7">
          <div>
            <h3 className="text-3xl font-semibold">Shorten a long URL</h3>
            <p className="mt-2">Make your link easier to share.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full h-32 p-3 mt-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your URL here..."
            />
            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">Shorten URL</button>
          </form>
          
          {shortUrl && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Your shortened URL:</p>
              <div className="flex items-center gap-3">
                <a 
                  href={fullShortUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:underline break-all"
                >
                  {fullShortUrl}
                </a>
                <button 
                  onClick={() => navigator.clipboard.writeText(fullShortUrl)}
                  className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
          </div>
        </div>
      </main>
    </div>
  )
}

