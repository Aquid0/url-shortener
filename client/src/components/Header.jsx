export const Header = () => {
  return (
    <header className="flex justify-between items-center p-3 bg-cyan-900/20 border-b border-cyan-900">
      <div className="text-white text-xl font-bold">
        URL Shortener
      </div>
      <button className="bg-white text-indigo-950 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
        Login
      </button>
    </header>
  );
};
