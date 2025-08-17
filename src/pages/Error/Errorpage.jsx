import { Link } from "react-router-dom";
const Errorpage = () => {
  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <h1 className="font-bold text-7xl text-gray-600 pb-10 text-center">
        404 Not Found !!
      </h1>
      <p>
        <Link to="/" className="text-3xl">
          Click to Go home
        </Link>
      </p>
    </div>
  );
};

export default Errorpage;
