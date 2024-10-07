import React, { useState, useEffect } from "react";

const Layout = ({ go, searchTerm }) => {
  const [results, setResults] = useState([]);

  const fetchData = async () => {
    if (searchTerm && searchTerm.trim()) {
      try {
        const response = await fetch(
          `/api/search?query=${encodeURIComponent(searchTerm)}`
        );
        if (response.ok) {
          const result = await response.json();
          setResults(result.items || []);
        } else {
          console.error("Error fetching data:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.log("Please enter a search term.");
    }
  };

  useEffect(() => {
    if (go) { 
      fetchData();
    }
  }, [go]);

  return (
    <div className="results mt-4">
      {results.length > 0 ? (
        <ul className="space-y-4">
          {results.map((item) => (
            <li
              key={item.link}
              className="bg-white p-4 border rounded-md shadow hover:shadow-lg transition-shadow"
            >
              <a
                href={item.link}
                className="text-blue-600 hover:underline text-lg font-semibold"
              >
                {item.title}
              </a>
              {item.pagemap && item.pagemap.restaurant ? (
                <p className="text-gray-600">
                  Location:{" "}
                  {item.pagemap.restaurant[0].address || "No address available"}
                </p>
              ) : null}
              <p className="text-gray-600">{item.snippet}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No results found.</p>
      )}
    </div>
  );
};

export default Layout;
