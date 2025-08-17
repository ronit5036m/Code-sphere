// pages/ProfilePage.jsx
import { useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import Logo from "../../assets/logo";
import AppLoading from "../../components/Loading/Loading";
import MobileBottombar from "../../components/SidebottomBars/MobileBottombar";
import { DesktopSidebar } from "../../components/SidebottomBars/DesktopSidebar";
import { useMedia } from "../../Context/ResponsiveContext";
import ProfilePost from "../../components/ProfileComponent/ProfileTimeLine";
import TimelineFeed from "../../components/ProfileComponent/TimelineFeed";
import ProfileComponent from "../../components/ProfileComponent/ProfileHeader";

import Errorpage from "../Error/Errorpage";
import { usePosts } from "../../Context/PostContext";

const ProfilePage = () => {
  const { id } = useParams();
  const isMobileSize = useMedia();
  const { CurrentUser, authToken } = useAuth();
  const { profile, setProfile } = usePosts();
  const [loading, setLoading] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/api/user/${id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setLoading(false);

        if (res?.data?.user?.projects?.length > 0) {
          fetchProjects(res?.data?.user?.projects);
        } else {
          setProjects([]); // No projects
          setLoadingProjects(false);
        }

        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile", err);
        setLoadingProjects(false);
      } finally {
        setLoading(false);
        setLoadingProjects(false);
      }
    };

    const fetchProjects = async (projectIds) => {
      const projectPromises = projectIds.map((id) =>
        axiosInstance.get(`/api/project/${id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        })
      );

      const responses = await Promise.all(projectPromises);

      // Append new projects without removing previous
      setProjects((prevProjects) => [
        ...prevProjects,
        ...responses?.map((res) => res?.data),
      ]);
    };

    fetchProfile();
  }, [id]);

  if (loading) return <AppLoading />;
  if (!profile)
    return (
      <p className="text-white">
        <Errorpage />
      </p>
    );

  const isCurrentUser = CurrentUser?.existuser?._id === profile?.user?._id;

  return (
    <div className="flex min-h-screen bg-black text-white">
      {isMobileSize ? <MobileBottombar /> : <DesktopSidebar />}
      <ProfileComponent
        profile={profile}
        isCurrentUser={isCurrentUser}
        projects={projects}
      />
    </div>
  );
};

export default ProfilePage;
