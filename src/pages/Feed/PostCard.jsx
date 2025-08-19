import { useState } from "react";
import { Heart, X, ChevronLeft, ChevronRight, Dot, Earth } from "lucide-react";
import { timeAgo } from "../../utils/timeAgo";
import { usePosts } from "../../Context/PostContext";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import { GiEarthAsiaOceania } from "react-icons/gi";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import { useMedia } from "../../Context/ResponsiveContext";

export default function PostCard({ post }) {
  const { toggleLike } = usePosts();
  const { CurrentUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const likedByUser = post?.likes?.includes(CurrentUser?.existuser?._id);

  const isMobileSize = useMedia();

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setShowModal(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === post?.images?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? post?.images?.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-black border-b-neutral-900 rounded-xl shadow-md max-w-md w-full mx-auto">
      {/* Header */}
      <div className="flex items-center py-4">
        <img
          src={post?.user?.avatar}
          alt={post?.user?.name}
          className="w-10 h-10 rounded-full border border-neutral-700 object-cover"
        />
        <Link
          to={`/profile/${post?.user?._id}`}
          className="ml-3 text-white font-semibold flex items-center"
        >
          {post?.user?.name}
          <p className="text-sm text-neutral-400 flex items-center">
            <Dot />
            {timeAgo(post?.createdAt)}
          </p>
          <span
            className="flex items-center p-5 text-neutral-500"
            title="Public"
          >
            <GiEarthAsiaOceania size={15} />
          </span>
        </Link>
      </div>
      {/* Images Grid */}
      {isMobileSize && post?.images?.length > 0 && (
        <div
          className={`grid ${
            post.images.length === 1
              ? "grid-cols-1"
              : post.images.length === 2
              ? "grid-cols-2"
              : "grid-cols-2"
          } gap-1`}
        >
          {post?.images?.map((img, idx) => (
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

      {/* Image Swiper */}

      {!isMobileSize && post?.images?.length > 0 && (
        <div className="w-full relative">
          <Swiper
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="w-full rounded-lg bg-black"
          >
            {post.images.map((img, idx) => (
              <SwiperSlide
                key={idx}
                className="flex items-center justify-center"
              >
                <img
                  src={img}
                  alt={`Post ${idx + 1}`}
                  className="
              w-full
              aspect-square
              max-h-[500px]
              object-cover
              rounded-lg
            "
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Actions */}
      <div className="p-3">
        <button
          onClick={() => toggleLike(post?._id)}
          className={`transition-transform duration-150 ${
            likedByUser
              ? "scale-110 text-red-500 drop-shadow-[0_0_10px_rgba(255,0,0,0.7)]"
              : "text-white"
          }`}
        >
          <Heart
            className={`w-6 h-6 ${
              likedByUser ? "fill-red-500" : "fill-none"
            } transition-all duration-300`}
          />
        </button>

        <p className="mt-1 text-white font-semibold">
          {post?.likes?.length} likes
        </p>

        {/* Title + Description */}
        <h2 className="mt-2 text-lg font-semibold text-white">{post?.title}</h2>
        <p className="text-neutral-300">{post?.description}</p>

        {/* Tech Stack */}
        {post?.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {post?.techStack?.map((tech, idx) => (
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
        {post?.projectLink && (
          <a
            href={post?.projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 text-sm mt-2 inline-block hover:underline"
          >
            View Project
          </a>
        )}
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
          {post?.images?.length > 1 && (
            <button className="absolute left-4 text-white" onClick={prevImage}>
              <ChevronLeft size={40} />
            </button>
          )}

          {/* Current Image */}
          <img
            src={post?.images[currentImageIndex]}
            alt="Preview"
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />

          {/* Next Button */}
          {post?.images?.length > 1 && (
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
}
