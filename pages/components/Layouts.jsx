import React, { useState, useEffect } from "react";

const Layout = ({ go, searchTerm }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm && searchTerm.trim()) {
        setLoading(true); // Set loading to true when fetching starts
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
        } finally {
          setLoading(false); // Set loading to false once fetching is done
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
    <div className="max-w-4xl mx-auto p-6">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid border-gray-300"></div>
        </div>
      ) : results.length > 0 ? (
        <ul className="space-y-6">
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
      ) : (
        <div className="text-center mt-12">
          <h1 className="text-5xl font-bold text-gray-800">Ashish Yadav</h1>
          <p className="text-2xl text-gray-600 mt-4">
            Full Stack Developer | React.js & Next.js Specialist
          </p>
          <p className="mt-6 text-gray-500 max-w-lg mx-auto">
            Hi, I'm Ashish Yadav, a passionate developer with a keen focus on building responsive and interactive web applications. I specialize in front-end technologies like React and Next.js, ensuring smooth user experiences.
          </p>

          <div className="mt-8 flex justify-center space-x-8">
            <a
              href="https://www.linkedin.com/in/ashishyadav677/"
              className="text-blue-600 hover:underline text-xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/ITSASHISHGITHUB"
              className="text-gray-800 hover:underline text-xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>

          <div className="mt-10">
            <a
              href="mailto:ay677204@gmail.com"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition text-lg font-semibold"
            >
              Hire Me
            </a>
          </div>

          <div className="mt-12">
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              If you're looking for someone to create robust web solutions, feel free to reach out! I'm always open to new challenges and opportunities.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
