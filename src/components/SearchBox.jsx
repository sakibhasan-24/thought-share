import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location?.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  console.log(searchTerm);
  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2">
      <input
        type="text"
        name="search"
        id="search"
        placeholder="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-4 py-2 rounded-md focus:outline-none w-full bg-slate-200 select-none"
      />
      <input
        type="submit"
        value={"search"}
        className="text-slate-500 bg-slate-800 px-2 py-2 ml-2 cursor-pointer rounded-lg"
      />
    </form>
  );
}
