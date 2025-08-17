import EditprofileComponent from "../../components/EditProfile/EditprofileComponent";
import { useMedia } from "../../Context/ResponsiveContext";
import { useAuth } from "../../Context/AuthContext";
import MobileBottombar from "../../components/SidebottomBars/MobileBottombar";
import { DesktopSidebar } from "../../components/SidebottomBars/DesktopSidebar";
import RightSideUserDetails from "../../components/RightSideUserDetails/RightSideUserDetails";
import AppLoading from "../../components/Loading/Loading";

const EditProfile = () => {
  const isMobileSize = useMedia();
  const { fullLoading, fetchUser } = useAuth();
  if (fullLoading) {
    return <AppLoading />;
  }
  return (
    <>
      <div className="flex min-h-screen bg-black text-white">
        {isMobileSize ? <MobileBottombar /> : <DesktopSidebar />}
        <EditprofileComponent />
        {!isMobileSize && <RightSideUserDetails />}
      </div>
    </>
  );
};

export default EditProfile;
