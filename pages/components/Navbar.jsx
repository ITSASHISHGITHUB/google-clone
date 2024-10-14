import React, { useState } from 'react';

const Navbar = ({ setGo, setSearchTerm }) => {
  const [data, setData] = useState('');

  const handleChange = (event) => {
    setData(event.target.value);
  };

  const handleSearch = () => {
    if (data.trim()) {
      setSearchTerm(data);
      setGo(true);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setData('');
    setGo(false); 
  };

  return (
    <div>
      <nav className="flex justify-between items-center p-4 shadow-md bg-gradient-to-r  text-black">
        <div className="flex items-center space-x-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
            alt="Google Logo"
            className="h-10 transform hover:scale-105 transition-transform duration-200 ease-in-out"
          />
        </div>

        <div className="flex-grow flex justify-center mx-4">
          <div className="flex items-center max-w-lg w-full space-x-2">
            <input
              type="text"
              placeholder="Search Google or type URL"
              className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none transition-all duration-200 ease-in-out transform text-black"
              value={data}
              onChange={handleChange}
              onKeyDown={handleKeyDown} 
            />
            <button
              className="bg-white text-gray-600 hover:bg-blue-500 hover:text-white p-2 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-blue-300"
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              className="bg-white text-gray-600 hover:bg-blue-500 hover:text-white p-2 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-blue-300"
              onClick={handleClear} 
            >
              Clear
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
