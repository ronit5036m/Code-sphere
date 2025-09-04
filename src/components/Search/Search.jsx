// SearchBar.jsx
import { useContext, useEffect, useState, useRef } from "react";
import { SearchContext } from "../../Context/SearchContext";
import axiosInstance from "../../api/axiosInstance";
import Logo from "../../assets/logo";
import { Link } from "react-router-dom";
import { ArrowUpLeft } from "lucide-react";

import Loader from "../../assets/loader";

export default function SearchBar() {
  const { isSearch, setIsSearch } = useContext(SearchContext);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const wrapperRef = useRef();

  // Close search if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsSearch]);

  // Simulated API search
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setLoading(false);
      return;
    }

    const delayDebounce = setTimeout(() => {
      setLoading(true);
      axiosInstance
        .get(`/api/suggest`, {
          params: { q: query },
        })
        .then((res) => {
          setResults(
            res.data.filter((user) =>
              user?.name?.toLowerCase().includes(query.toLowerCase())
            )
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }, 0.1);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  if (!isSearch) return null;

  return (
    <div className="h-screen w-full bg-black/70 fixed z-999">
      <div
        ref={wrapperRef}
        className="absolute top-16 left-1/2 transform -translate-x-1/2 min-w-[400px] bg-[#111] rounded-lg shadow-lg p-4 z-50"
      >
        <input
          type="text"
          placeholder="Search..."
          className="w-full text-white border-[3px] border-transparent bg-white
p-3 rounded outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <div className="mt-3">
          {loading && (
            <div className="flex justify-center p-4">
              <Loader />
            </div>
          )}
          {!loading && results.length > 0 ? (
            results.map((user) => (
              <div
                key={user?._id}
                className="text-neutral-500 flex justify-between items-center"
              >
                <Link
                  className="flex items-center w-full gap-3 p-2 hover:bg-neutral-900 rounded-md cursor-pointer"
                  to={`/profile/${user?._id}`}
                  onClick={() => setIsSearch(!isSearch)}
                >
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full flex items-center object-cover"
                  />
                  <span className="text-white">{user?.name}</span>
                  <ArrowUpLeft />
                </Link>
              </div>
            ))
          ) : !loading && query ? (
            <p className="text-gray-400 text-sm text-center">No user found</p>
          ) : (
            !loading && (
              <p className="text-gray-400 text-sm text-center">
                No Recent serach
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
