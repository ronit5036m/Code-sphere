import Landing1 from "./Landing1";
import Landing2 from "./Landing2";
import Landing3 from "./Landing3";
import Landing4 from "./Landing4";
import Landing5 from "./Landing5";
import { ArrowLeft } from "lucide-react";

const AboutCompo = () => {
  return (
    <>
      {history.length > 0 && (
        <nav className="p-2 min-h-10 max-w-full sticky top-0 flex items-center pl-10 backdrop-blur-lg bg-black/20 rounded-xl">
          <ArrowLeft size={30} color="#fff" onClick={() => history.back()} />
        </nav>
      )}
      <Landing1 />
      <Landing2 />
      <Landing3 />
      <Landing4 />
      <Landing5 />
    </>
  );
};

export default AboutCompo;
