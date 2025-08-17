import Logo from "../../assets/logo";

const FeedLoading = () => {
  return (
    <div className="h-screen bg-red-700" >
      <img src={Logo.loading} className="bg" alt="Loading..." />
    </div>
  );
};

export default FeedLoading;
