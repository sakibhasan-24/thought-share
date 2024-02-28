import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../hook/useAxiosPublic";
import { Select, Spinner } from "flowbite-react";
import PostCard from "./PostCard";

export default function Search() {
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortTermFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortTermFromUrl || categoryFromUrl) {
      setSearchData({
        ...searchData,
        searchTerm: searchTermFromUrl,
        sort: sortTermFromUrl,
        category: categoryFromUrl,
      });
    }

    // fetchPosts
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const searchQuery = urlParams.toString();
        const res = await axiosPublic(`/api/post/get-posts?${searchQuery}`);

        setPosts(res.data?.posts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [location.search]);
  const handleChange = (e) => {
    if (e.target.id === "search") {
      setSearchData({ ...searchData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSearchData({ ...searchData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSearchData({ ...searchData, category });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchData.searchTerm);
    urlParams.set("sort", searchData.sort);
    urlParams.set("category", searchData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  console.log(searchData);
  console.log(posts);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-9 md:grid-cols-12 gap-12">
      <form
        onSubmit={handleSubmit}
        className=" sm:col-span-3 md:col-span-3 flex flex-col"
      >
        <input
          type="text"
          name="search"
          id="search"
          placeholder="search"
          value={searchData.searchTerm}
          // onChange={(e) => setSearchTerm(e.target.value)}
          onChange={handleChange}
          className="px-4 py-2 rounded-md focus:outline-none w-full bg-slate-200 select-none"
        />
        <div className="flex flex-col gap-2">
          <label className="text-xl font-semibold mr-10">sort</label>
          <Select id="sort" onChange={handleChange} value={searchData.sort}>
            <option value="asc">Newest</option>
            <option value="desc">Oldest</option>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl font-semibold mr-10">category</label>
          <Select
            id="category"
            onChange={handleChange}
            value={searchData.category}
          >
            <option value="uncategorized">uncategorized</option>
            <option value="food">food</option>
            <option value="sports">sports</option>
            <option value="technology">technology</option>
            <option value="entertainment">entertainment</option>
            <option value="politics">politics</option>
            <option value="SoftwareEngineering">Software Engineering</option>
          </Select>
        </div>
        <button className="bg-slate-800 text-white p-2 my-6 rounded-lg cursor-pointer">
          Search
        </button>
      </form>
      <div className=" sm:col-span-6 md:col-span-9">
        <div>
          {!loading && posts?.length === 0 && (
            <p className="text-4xl font-semibold text-center text-slate-800">
              No Posts Found
            </p>
          )}
          {loading && (
            <div className="text-4xl font-semibold text-center text-slate-800">
              <Spinner />
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {posts &&
              posts.length > 0 &&
              posts?.map((post) => <PostCard key={post._id} post={post} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
