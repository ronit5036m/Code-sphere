import Logo from "../../assets/logo";
import { usePosts } from "../../Context/PostContext";
import { useMedia } from "../../Context/ResponsiveContext";
import PostCard from "./PostCard";

export default function PostFeed() {
  const isMobileSize = useMedia();

  const { posts, loading } = usePosts();

  return (
    <div className={`flex flex-col gap-6 py-6 items-center w-2xl`}>
      {posts?.length === 0 || loading ? (
        <img src={Logo.loading} className="h-20 w-20 flex" />
      ) : (
        posts?.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
}
