import { usePosts } from "../../Context/PostContext";
import ProfileTimeLine from "./ProfileTimeLine";

const TimelineFeed = ({ projects }) => {
  const { isCurrentUser } = usePosts();

  // Deduplicate posts by unique id
  const uniqueProjects = Array.from(
    new Map(
      projects?.map((post) => [post?.project?._id || post?._id, post])
    ).values()
  );

  // Apply filter: only global posts for non-current users
  let filteredProjects = isCurrentUser
    ? uniqueProjects
    : uniqueProjects.filter((post) => post?.project?.isGlobalPost === true);

  // Sort by createdAt (newest first)
  filteredProjects = filteredProjects.sort(
    (a, b) =>
      new Date(b?.project?.createdAt || b?.createdAt) -
      new Date(a?.project?.createdAt || a?.createdAt)
  );

  return (
    <div className="px-4">
      {filteredProjects?.length === 0 ? (
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
