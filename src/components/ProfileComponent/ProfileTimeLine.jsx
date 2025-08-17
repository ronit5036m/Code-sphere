import { Link } from "react-router-dom";
import { useState } from "react";
import { Heart, X, ChevronLeft, ChevronRight, Dot } from "lucide-react";
import { timeAgo } from "../../utils/timeAgo";

const ProfileTimeLine = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setShowModal(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === post?.project?.images?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? post?.project?.images?.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-black border-b-neutral-900 rounded-xl shadow-md max-w-md w-full mx-auto">
      {/* Header */}
      <div className="flex items-center py-4">
        <img
          src={post?.project?.user?.avatar}
          alt={post?.project?.user?.name}
          className="w-10 h-10 rounded-full border border-neutral-700 object-cover"
        />
        <Link
          to={`/profile/${post?.project?.user?._id}`}
          className="ml-3 text-white font-semibold flex items-center"
        >
          {post?.project?.user?.name}
          <p className="text-sm text-neutral-400 flex items-center">
            <Dot />
            {timeAgo(post?.project?.createdAt)}
          </p>
        </Link>
      </div>

      {/* Images Grid */}
      {post?.project?.images?.length > 0 && (
        <div
          className={`grid ${
            post?.project?.images?.length === 1
              ? "grid-cols-1"
              : post?.project?.images?.length === 2
              ? "grid-cols-2"
              : "grid-cols-2"
          } gap-1`}
        >
          {post?.project?.images?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Post ${idx + 1}`}
              className="w-full h-64 object-cover cursor-pointer hover:opacity-75 transition"
              onClick={() => openModal(idx)}
              loading="lazy"
            />
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="p-3">
        <button
          // onClick={() => toggleLike(post?._id)}
          className={`transition-transform duration-150 `}
        >
          <Heart
            color="transparent"
            className={`w-6 h-6 fill-red-500 transition-all duration-300`}
          />
        </button>

        <p className="mt-1 text-white font-semibold">
          {post?.project?.likes?.length} likes
        </p>

        {/* Title + Description */}
        <h2 className="mt-2 text-lg font-semibold text-white">
          {post?.project?.title}
        </h2>
        <p className="text-neutral-300">{post?.project?.description}</p>

        {/* Tech Stack */}
        {post?.project?.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {post?.project?.techStack?.map((tech, idx) => (
              <span
                key={idx}
                className="bg-neutral-800 text-s px-4 py-2 rounded-lg text-neutral-300 font-bold"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Project Link */}
        {/* {post?.project?.projectLink && (
          <a
            href={post?.project?.projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 text-sm mt-2 inline-block hover:underline"
          >
            View Project
          </a>
        )} */}
      </div>

      {/* Image Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-999">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setShowModal(false)}
          >
            <X size={32} />
          </button>

          {/* Prev Button */}
          {post?.project?.images?.length > 1 && (
            <button className="absolute left-4 text-white" onClick={prevImage}>
              <ChevronLeft size={40} />
            </button>
          )}

          {/* Current Image */}
          <img
            src={post?.project?.images[currentImageIndex]}
            alt="Preview"
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />

          {/* Next Button */}
          {post?.project.images?.length > 1 && (
            <button className="absolute right-4 text-white" onClick={nextImage}>
              <ChevronRight size={40} />
            </button>
          )}
        </div>
      )}
      {/* Horizontal Ruler For defining the Post end */}
      <div className="w-full border-b-2 border-neutral-900"></div>
    </div>
  );
};

export default ProfileTimeLine;
