import PostFeed from "../Feed/PostFeed";
import { usePosts } from "../../Context/PostContext";
import { useAuth } from "../../Context/AuthContext";
import AppLoading from "../../components/Loading/Loading";
import { useMedia } from "../../Context/ResponsiveContext";
import { DesktopSidebar } from "../../components/SidebottomBars/DesktopSidebar";
import MobileBottombar from "../../components/SidebottomBars/MobileBottombar";
import RightSideUserDetails from "../../components/RightSideUserDetails/RightSideUserDetails";
import Header from "../../components/Header/Header";
import "../../pages/Home/Home.css";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  const isMobileSize = useMedia();
  const { fullLoading, fetchUser } = useAuth();
  const { loading } = usePosts();

  if (fullLoading) {
    return <AppLoading />;
  }

  return (
    <>
      {isMobileSize && <Header />}
      <div className="flex min-h-screen bg-black text-white">
        {isMobileSize ? <MobileBottombar /> : <DesktopSidebar />}
        <PostFeed />
        {!isMobileSize && <RightSideUserDetails />}
      </div>
      {isMobileSize && (
        <div className="w-full flex justify-center items-center p-10">
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
