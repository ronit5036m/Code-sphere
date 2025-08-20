import Logo from "../../assets/logo";
import { usePosts } from "../../Context/PostContext";
import { useMedia } from "../../Context/ResponsiveContext";
import PostCard from "./PostCard";

export default function PostFeed() {
  const isMobileSize = useMedia();

  const { posts, loading } = usePosts();

  return (
    <div className={`flex flex-col gap-6 items-center w-2xl mx-4`}>
      {loading ? (
        <img src={Logo.loading} className="h-20 w-20 flex" />
      ) : posts?.length === 0 ? (
        <div>No posts are available</div>
      ) : (
        posts?.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
}
