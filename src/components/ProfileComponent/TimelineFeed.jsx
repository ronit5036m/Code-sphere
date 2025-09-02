import { useAuth } from "../../Context/AuthContext";
import { usePosts } from "../../Context/PostContext";
import ProfileTimeLine from "./ProfileTimeLine";
import Loader from "../../assets/loader";

const TimelineFeed = ({ projects }) => {
  const { isCurrentUser } = usePosts();

  const { loadingProjects, setLoadingProjects } = useAuth();

  const uniqueProjects = Array.from(
    new Map(
      projects?.map((post) => [post?.project?._id || post?._id, post])
    ).values()
  );

  let filteredProjects = isCurrentUser
    ? uniqueProjects
    : uniqueProjects.filter((post) => post?.project?.isGlobalPost === true);

  filteredProjects = filteredProjects.sort(
    (a, b) =>
      new Date(b?.project?.createdAt || b?.createdAt) -
      new Date(a?.project?.createdAt || a?.createdAt)
  );

  return (
    <div className="px-1">
      {loadingProjects ? (
        <Loader className="w-full flex items-center justify-center text-center" />
      ) : filteredProjects?.length === 0 ? (
        <div className="w-full flex items-center justify-center text-center">
          No Project yet
        </div>
      ) : (
        filteredProjects.map((post) => (
          <ProfileTimeLine key={post?.project?._id || post?._id} post={post} />
        ))
      )}
    </div>
  );
};

export default TimelineFeed;
