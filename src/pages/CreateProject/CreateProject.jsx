import React from "react";
import { useEffect } from "react";
import { usePosts } from "../../Context/PostContext";
import { useAuth } from "../../Context/AuthContext";
import AppLoading from "../../components/Loading/Loading";
import { useMedia } from "../../Context/ResponsiveContext";
import { DesktopSidebar } from "../../components/SidebottomBars/DesktopSidebar";
import MobileBottombar from "../../components/SidebottomBars/MobileBottombar";
import RightSideUserDetails from "../../components/RightSideUserDetails/RightSideUserDetails";
import CreateProjectComponent from "../../components/CreateProject/CreateProjectComponent";

const CreateProject = () => {
  const isMobileSize = useMedia();
  const { fullLoading, fetchUser } = useAuth();
  const { loading } = usePosts();

  if (fullLoading) {
    return <AppLoading />;
  }

  return (
    <>
      <div className="flex min-h-screen bg-black text-white">
        {isMobileSize ? <MobileBottombar /> : <DesktopSidebar />}
        <CreateProjectComponent />
        {!isMobileSize && <RightSideUserDetails />}
      </div>
    </>
  );
};

export default CreateProject;
