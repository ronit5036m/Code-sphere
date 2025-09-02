import Loader from "../../assets/loader";
import Logo from "../../assets/logo";
import { usePosts } from "../../Context/PostContext";
import { useMedia } from "../../Context/ResponsiveContext";
import PostCard from "./PostCard";

export default function PostFeed() {
  const isMobileSize = useMedia();

  const { posts, loading } = usePosts();

  return (
    <div className={`flex flex-col gap-6 items-center w-2xl mx-1`}>
      {loading ? (
        <Loader className="h-15 w-15" />
      ) : posts?.length === 0 ? (
        <div>No posts are available</div>
      ) : (
        posts?.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
}
