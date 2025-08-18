import { usePosts } from "../../Context/PostContext";
import ProfileTimeLine from "./ProfileTimeLine";

const TimelineFeed = ({ projects }) => {
  const { isCurrentUser } = usePosts();
  const filteredProjects = isCurrentUser
    ? projects
    : projects?.filter((post) => post?.project?.isGlobalPost === true);

  return (
    <div className="px-4">
      {filteredProjects?.length === 0 ? (
        <div className="w-full flex items-center justify-center text-center">
          No Project yet
        </div>
      ) : (
        filteredProjects?.map((post, i) => (
          <ProfileTimeLine key={i} post={post} />
        ))
      )}
    </div>
  );
};

export default TimelineFeed;
