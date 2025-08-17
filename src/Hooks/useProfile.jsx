// hooks/useUserProfile.js
import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../Context/AuthContext";

export default function useUserProfile(userId) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken } = useAuth();

  useEffect(() => {
    if (!userId) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    axiosInstance
      .get(`/api/user/${userId}`, {
        headers: { Authorization: authToken },
      })
      .then((res) => {
        if (isMounted) {
          setProfile(res.data);
          setLoading(false);
        }
        console.log(res.data);
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.response?.data?.message || "Failed to load profile");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return { profile, loading, error };
}
