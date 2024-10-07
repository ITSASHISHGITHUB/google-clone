// pages/api/search.js
export default async function handler(req, res) {
    const { query } = req.query; // Get the query parameter
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY; // Get the API key from environment variables
    const searchEngineId = '1552322468a204598'; // Your Custom Search Engine ID
  
    try {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`
      );
  
      if (!response.ok) {
        return res.status(response.status).json({ error: 'Failed to fetch data' });
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  