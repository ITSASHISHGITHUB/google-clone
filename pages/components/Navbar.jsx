import React, { useState } from 'react';

const Navbar = ({ setGo, setSearchTerm }) => {
  const [data, setData] = useState('');

  const handleChange = (event) => {
    setData(event.target.value);
  };

  const handleSearch = () => {
    setSearchTerm(data); 
    setGo(true); 
  };

  return (
    <div>
      <nav className="flex justify-between items-center p-4 shadow-md bg-white">
        <div className="flex items-center space-x-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
            alt="Google Logo"
            className="h-8"
          />
        </div>

        <div className="flex-grow flex justify-center mx-4">
          <div className="flex items-center max-w-lg w-full space-x-2">
            <input
              type="text"
              placeholder="Search Google or type URL"
              className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              value={data}
              onChange={handleChange}
            />
            <button
              className="text-gray-600 hover:text-black p-2 rounded-full focus:outline-none focus:ring focus:ring-blue-300"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
