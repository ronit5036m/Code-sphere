import { useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import AppLoading from "../../components/Loading/Loading";
import MobileBottombar from "../../components/SidebottomBars/MobileBottombar";
import { DesktopSidebar } from "../../components/SidebottomBars/DesktopSidebar";
import { useMedia } from "../../Context/ResponsiveContext";
import ProfileComponent from "../../components/ProfileComponent/ProfileHeader";
import Errorpage from "../Error/Errorpage";
import { usePosts } from "../../Context/PostContext";
import Footer from "../../components/Footer/Footer";

const ProfilePage = () => {
  const { id } = useParams();
  const isMobileSize = useMedia();
  const { CurrentUser, authToken, setLoadingProjects } = useAuth();
  const { profile, setProfile } = usePosts();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/api/user/${id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (res?.data?.projects?.length > 0) {
          await fetchProjects(res?.data?.projects);
        } else {
          setProjects([]); // No projects
        }

        setProfile(res.data);
      } catch (err) {
        console.clear();
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchProjects = async (projectIds) => {
      try {
        setLoadingProjects(true); //  start projects loading
        const projectPromises = projectIds.map((id) =>
          axiosInstance.get(`/api/project/${id}`, {
            headers: { Authorization: `Bearer ${authToken}` },
          })
        );

        const responses = await Promise.all(projectPromises);
        setProjects(responses?.map((res) => res?.data));
      } catch (err) {
        setError(err);
      } finally {
        setLoadingProjects(false); //  only once after all fetched
      }
    };

    fetchProfile();
  }, [id, authToken]);

  if (loading) return <AppLoading />;
  if (!profile)
    return (
      <p className="text-white">
        <Errorpage />
      </p>
    );

  const isCurrentUser = CurrentUser?.existuser?._id === profile?._id;

  return (
    <>
      <div className="flex bg-black text-white">
        {isMobileSize ? <MobileBottombar /> : <DesktopSidebar />}
        <ProfileComponent
          profile={profile}
          isCurrentUser={isCurrentUser}
          projects={projects}
        />
      </div>
      {isMobileSize && (
        <div className="w-full flex justify-center items-center p-10">
          <Footer />
        </div>
      )}
    </>
  );
};

export default ProfilePage;
