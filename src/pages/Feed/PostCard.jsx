import { useState, useEffect } from "react";
import { Heart, X, ChevronLeft, ChevronRight, Dot, Earth } from "lucide-react";
import { timeAgo } from "../../utils/timeAgo";
import { usePosts } from "../../Context/PostContext";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import { GiEarthAsiaOceania } from "react-icons/gi";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Pagination, Navigation } from "swiper/modules";
import { useMedia } from "../../Context/ResponsiveContext";
import Logo from "../../assets/logo";

export default function PostCard({ post }) {
  const { toggleLike } = usePosts();
  const { CurrentUser } = useAuth();

  // Turncated Text of Description
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = post?.description?.length > 30;
  const displayText = isExpanded
    ? post?.description
    : post?.description?.substring(0, 30);

  // Image Show model
  const images = post?.images || post?.images || [];
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const closeModal = () => setSelectedImageIndex(null);
  const showPrev = () =>
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  const showNext = () =>
    setSelectedImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));

  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [selectedImageIndex]);

  const likedByUser = post?.likes?.includes(CurrentUser?.existuser?._id);
  const isMobileSize = useMedia();
  return (
    <div className="bg-black border-b-neutral-900 rounded-xl shadow-md max-w-md w-full mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mx-2">
        {/* Profile section */}
        <Link
          to={`/profile/${post?.user?._id}`}
          className="flex items-center py-4"
        >
          <img
            src={post?.user?.avatar || Logo?.defaultUser}
            alt={post?.user?.name}
            className="w-10 h-10 rounded-full border border-neutral-700 object-cover"
          />

          <div className="ml-3 text-white font-semibold">
            {/* Name */}
            <span>
              {post?.project?.user?.name?.length > 20
                ? post?.user?.name.substring(0, 20) + "..."
                : post?.user?.name}
            </span>
            <span className="flex items-center text-sm text-neutral-400 font-normal ml-2">
              <span title={`${timeAgo(post?.createdAt)} Ago`}>
                {timeAgo(post?.createdAt)}
              </span>
              <span className="ml-2 text-neutral-500" title={"Public"}>
                <GiEarthAsiaOceania size={15} />
              </span>
            </span>
          </div>
        </Link>
      </div>
      {/* Images Grid */}
      <div className="max-md:w-90 md:w-100 mx-auto">
        {isMobileSize && post?.images?.length > 0 && (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet !bg-neutral-200",
              bulletActiveClass: "swiper-pagination-bullet-active !bg-white",
            }}
            className="rounded-xl shadow-md"
          >
            {post?.images?.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative group overflow-hidden rounded-xl">
                  <img
                    src={img}
                    alt={`Post ${idx + 1}`}
                    className="w-full aspect-square max-h-[500px] object-cover"
                    loading="lazy"
                    onClick={() => setSelectedImageIndex(idx)}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Image Swiper */}

      {!isMobileSize && post?.images?.length > 0 && (
        <div className="w-full relative">
          <Swiper
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet !bg-neutral-200",
              bulletActiveClass: "swiper-pagination-bullet-active !bg-white",
            }}
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
                  className="w-full aspect-square max-h-[500px] object-cover rounded-lg"
                  loading="lazy"
                  onClick={() => setSelectedImageIndex(idx)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Image Showmodel */}

      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-999"
          onClick={closeModal}
        >
          <button
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={closeModal}
          >
            <X size={30} />
          </button>

          {/* Prev Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-5 text-neutral-300"
            >
              <ChevronLeft size={40} />
            </button>
          )}

          {/* Image */}
          <img
            src={images[selectedImageIndex]}
            alt="Full Preview"
            className="max-h-[90%] max-w-[90%] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-5 text-neutral-300"
            >
              <ChevronRight size={40} />
            </button>
          )}
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
        <h2 className="mt-2 text-xl font-semibold text-white">{post?.title}</h2>
        <p className="text-neutral-400">
          {displayText}
          {shouldTruncate && !isExpanded && "... "}
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-400 ml-1 hover:underline"
            >
              {isExpanded ? "less" : "more"}
            </button>
          )}
        </p>

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

      {/* Horizontal Ruler For defining the Post end */}
      <div className="w-full border-b-2 border-neutral-900"></div>
    </div>
  );
}
