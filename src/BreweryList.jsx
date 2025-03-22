import { useState, useEffect } from "react";
import axios from "axios";

const BreweryList = () => {
  const [breweries, setBreweries] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBreweries = async () => {
      const url = searchTerm
        ? `https://api.openbrewerydb.org/v1/breweries?by_name=${searchTerm}&page=${page}&per_page=10`
        : `https://api.openbrewerydb.org/v1/breweries?page=${page}&per_page=10`;

      try {
        const response = await axios.get(url);
        setBreweries(response.data || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching data", error);
        setError("Failed to fetch breweries. Please try again later.");
      }
    };

    fetchBreweries();
  }, [page, searchTerm]);

  return (
    <div>
      <h2 className="py-2 text-lg font-bold ">Brewery List</h2>
      <input
        type="text"
        placeholder="Search brewery..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border-1 rounded-lg p-2 my-2"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table className="border-collapse border border-gray-400 lg:w-[100%] text-left md:w-[100%] sm:w-[100%]">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 p-2 w-[30%]">Name</th>
            <th className="border border-gray-400 p-2 w-[8%]">Type</th>
            <th className="border border-gray-400 p-2 w-[45%]">Address</th>
            <th className="border border-gray-400 p-2 w-[9%]">Phone</th>
            <th className="border border-gray-400 p-2 w-[8%]">Website</th>
          </tr>
        </thead>
        <tbody>
          {breweries.length > 0 ? (
            breweries.map((brewery) => (
              brewery ? (
                <tr key={brewery.id || Math.random()} className="hover:bg-gray-100">
                  <td className="border border-gray-400 p-2">{brewery.name || "N/A"}</td>
                  <td className="border border-gray-400 p-2">{brewery.brewery_type || "N/A"}</td>
                  <td className="border border-gray-400 p-2">
                    {(brewery.street ? `${brewery.street}, ` : "") +
                      (brewery.city ? `${brewery.city}, ` : "") +
                      (brewery.state || "N/A")}
                  </td>
                  <td className="border border-gray-400 p-2">{brewery.phone || "N/A"}</td>
                  <td className="border border-gray-400 p-2 text-center">
                    {brewery.website_url ? (
                      <a href={brewery.website_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        Website
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ) : null
            ))
          ) : (
            <tr>
              <td colSpan="5" className="border border-gray-400 p-2 text-center">No breweries found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="py-4">
        <button onClick={() => setPage(page - 1)} disabled={page === 1} className="bg-blue-500 text-white py-2 px-3 hover:bg-gray-500 rounded-lg delay-75">
          Previous
        </button>
        <span className="mx-2"> Page {page} </span>
        <button onClick={() => setPage(page + 1)} disabled={breweries.length === 0} className="bg-blue-500 text-white py-2 px-3 hover:bg-gray-500 rounded-lg delay-75">
          Next
        </button>
      </div>
    </div>
  );
};

export default BreweryList;