import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../Context/AuthContext";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const { authToken, CurrentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  const shuffleArray = (arr) => {
    let array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/api/global-posts");

      const rawPosts = Array.isArray(res.data)
        ? res?.data
        : res?.data?.project
        ? [res?.data?.project]
        : [];

      const safePosts = rawPosts
        .filter((p) => p?.isGlobalPost === true)
        .map((p) => ({
          ...p,
          likes: Array.isArray(p?.likes) ? p?.likes : [],
        }));

      // Shuffle posts before setting state
      setPosts(shuffleArray(safePosts));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (postId) => {
    try {
      // Optimistic UI
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: post?.likes?.includes(CurrentUser?.existuser?._id)
                  ? post?.likes?.filter(
                      (id) => id !== CurrentUser?.existuser?._id
                    )
                  : [...post?.likes, CurrentUser?.existuser?._id],
              }
            : post
        )
      );

      // API Call to toggle
      const res = await axiosInstance.post(
        `/api/project/${postId}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
    } catch (err) {
      setError(err);
      fetchPosts();
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      fetchPosts();
    }
  }, [location.pathname]);

  const isCurrentUser = CurrentUser?.existuser?._id === profile?.user?._id;

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        loading,
        toggleLike,
        fetchPosts,
        profile,
        setProfile,
        isCurrentUser,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => useContext(PostContext);
