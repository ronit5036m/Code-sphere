import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
  Dot,
  Ellipsis,
  MessageSquareWarning,
} from "lucide-react";
import { timeAgo } from "../../utils/timeAgo";
import { BiLock } from "react-icons/bi";
import { GiEarthAsiaOceania } from "react-icons/gi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import { useMedia } from "../../Context/ResponsiveContext";
import Logo from "../../assets/logo";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../Context/AuthContext";
import { usePosts } from "../../Context/PostContext";
import toast from "react-hot-toast";

const ProfileTimeLine = ({ post }) => {
  const { authToken } = useAuth();
  const { isCurrentUser } = usePosts();
  const navigate = useNavigate();
  const isMobileSize = useMedia();
  const [openThreeDotModel, setOpenThreeDotModel] = useState(false);
  const [isGlobal, setIsGlobal] = useState(post?.project?.isGlobalPost);
  
  // Image Showmodel
  const images = post?.project?.images || post?.images || [];
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const closeModal = () => setSelectedImageIndex(null);
  const showPrev = () =>
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  const showNext = () =>
    setSelectedImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));

  // Turncated Text Description
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = post?.project?.description?.length > 30;
  const displayText = isExpanded
    ? post?.project?.description
    : post?.project?.description?.substring(0, 30);

  const handleToggleVisibility = async () => {
    try {
      const updatedValue = !isGlobal;
      setIsGlobal(updatedValue);

      await axiosInstance.patch(
        `/api/project/${post?.project?._id}`,
        {
          isGlobalPost: updatedValue,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
    } catch {
      setIsGlobal(post?.project?.isGlobalPost);
    }
  };

  useEffect(() => {
    if (openThreeDotModel || selectedImageIndex !== null) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [openThreeDotModel, selectedImageIndex]);

  const handleDeletePost = async () => {
    try {
      const res = await axiosInstance.delete(
        `/api/project/${post?.project?._id}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setOpenThreeDotModel(false);
      toast.success(res.data.message);
      navigate("/");
    } catch {
      setOpenThreeDotModel(false);
    }
  };

  return (
    <div className="bg-black border-b-neutral-900 rounded-xl shadow-md max-w-md w-full mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mx-2">
        {/* Profile section */}
        <Link
          to={`/profile/${post?.project?.user?._id}`}
          className="flex items-center py-4"
        >
          <img
            src={post?.project?.user?.avatar || Logo?.defaultUser}
            alt={post?.project?.user?.name}
            className="w-10 h-10 rounded-full border border-neutral-700 object-cover"
          />

          <div className="ml-3 text-white font-semibold">
            {/* Name */}
            <span>
              {post?.project?.user?.name?.length > 20
                ? post?.project?.user?.name.substring(0, 20) + "..."
                : post?.project?.user?.name}
            </span>
            <span className="flex items-center text-sm text-neutral-400 font-normal ml-2">
              <span title={`${timeAgo(post?.project?.createdAt)} Ago`}>
                {timeAgo(post?.project?.createdAt)}
              </span>
              <span
                className="ml-2 text-neutral-500"
                title={isGlobal ? "Public" : "Private"}
              >
                {isGlobal ? (
                  <GiEarthAsiaOceania size={15} />
                ) : (
                  <BiLock size={15} />
                )}
              </span>
            </span>
          </div>
        </Link>
        {/* Menu */}
        <Ellipsis
          className="cursor-pointer ml-3"
          onClick={() => setOpenThreeDotModel(!openThreeDotModel)}
        />
      </div>

      {openThreeDotModel && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setOpenThreeDotModel(false)}
        >
          <div
            className="bg-neutral-800 w-80 rounded-2xl shadow-2xl p-5 relative text-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col space-y-3">
              {!isCurrentUser && (
                <>
                  <button className="w-full py-2 rounded-lg hover:bg-neutral-700 text-left px-3">
                    Share
                  </button>
                  <button className="w-full py-2 rounded-lg hover:bg-neutral-700 font-bold text-red-500 text-left px-3">
                    Report Post
                  </button>
                </>
              )}
              {isCurrentUser && (
                <>
                  {/* Delete Button */}
                  <button
                    className="w-full py-2 rounded-lg hover:bg-neutral-700 font-bold text-red-500 text-left px-3"
                    onClick={handleDeletePost}
                  >
                    Delete Post
                  </button>

                  {/* Toggle Button */}

                  <div className="flex items-center justify-between bg-neutral-700 rounded-lg p-2">
                    <span className="text-sm font-medium">
                      {isGlobal ? "Public" : "Private"}
                    </span>
                    <button
                      type="button"
                      onClick={handleToggleVisibility}
                      className={`w-14 h-6 flex items-center rounded-full transition ${
                        isGlobal ? "bg-green-500" : "bg-neutral-600"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transform transition ${
                          isGlobal ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Images */}
      {isMobileSize && images.length > 0 && (
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
          className="shadow-md"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative group overflow-hidden">
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

      {!isMobileSize && images.length > 0 && (
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
            {images.map((img, idx) => (
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
        <button className={`transition-transform duration-150`}>
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
        {post?.project?.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {post?.project?.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="bg-neutral-800 text-s px-4 py-2 rounded-lg text-neutral-300 font-bold"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
      {/* Horizontal Ruler */}
      <div className="w-full border-b-2 border-neutral-900"></div>
    </div>
  );
};

export default ProfileTimeLine;
