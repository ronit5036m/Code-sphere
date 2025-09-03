import { useAuth } from "../../Context/AuthContext";
import { usePosts } from "../../Context/PostContext";
import ProfileTimeLine from "./ProfileTimeLine";
import Loader from "../../assets/loader";
import { useMemo } from "react";

const TimelineFeed = ({ projects }) => {
  const { isCurrentUser } = usePosts();
  const { loadingProjects } = useAuth();

  // ✅ useMemo for derived filteredProjects
  const filteredProjects = useMemo(() => {
    if (!projects || projects.length === 0) return [];

    const uniqueProjects = Array.from(
      new Map(
        projects.map((post) => [post?.project?._id || post?._id, post])
      ).values()
    );

    let result = isCurrentUser
      ? uniqueProjects
      : uniqueProjects.filter((post) => post?.project?.isGlobalPost === true);

    return result.sort(
      (a, b) =>
        new Date(b?.project?.createdAt || b?.createdAt) -
        new Date(a?.project?.createdAt || a?.createdAt)
    );
  }, [projects, isCurrentUser]);

  const isLoading = loadingProjects || !projects; // ✅ loader until data exists

  return (
    <div className="px-1">
      {isLoading ? (
        <div className="w-full flex items-center justify-center text-center">
          <Loader />
        </div>
      ) : filteredProjects.length === 0 ? (
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
