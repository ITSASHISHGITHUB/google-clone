import React, { useState, useEffect } from "react";

const Layout = ({ go, searchTerm }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSearchUI, setShowSearchUI] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm && searchTerm.trim()) {
        setLoading(true);
        try {
          const response = await fetch(
            `/api/search?query=${encodeURIComponent(searchTerm)}`
          );
          if (response.ok) {
            const result = await response.json();
            setResults(result.items || []);
            setShowSearchUI(false);
          } else {
            console.error("Error fetching data:", response.status);
          }
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("Please enter a search term.");
      }
    };

    if (go) {
      fetchData();
    }
  }, [go, searchTerm]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {showSearchUI && (
        <>
          <div className="mb-8">
            <h1
              className="text-6xl font-bold"
              style={{
                background:
                  "linear-gradient(to right, #4285F4, #34A853, #FBBC05, #EA4335)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Ashish
            </h1>
          </div>

          <div className="w-full max-w-xl px-4">
            <div className="flex items-center border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow">
              <input
                type="text"
                placeholder="Search Google or type a URL"
                className="flex-grow px-6 py-3 rounded-full focus:outline-none"
              />
              <button className="p-3 text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid border-gray-300"></div>
        </div>
      ) : results.length > 0 ? (
        <ul className="space-y-6 mt-8 w-full max-w-4xl px-4">
          {results.map((item) => (
            <li key={item.link} className="border-b border-gray-200 pb-4">
              <a
                href={item.link}
                className="text-xl font-medium text-blue-600 hover:underline"
              >
                {item.title}
              </a>
              {item.pagemap && item.pagemap.restaurant && (
                <p className="text-sm text-gray-500 mt-1">
                  Location:{" "}
                  {item.pagemap.restaurant[0].address || "No address available"}
                </p>
              )}
              <p className="text-sm text-gray-700 mt-2">{item.snippet}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Layout;