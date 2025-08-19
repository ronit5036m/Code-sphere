import { Link } from "react-router-dom";
import { useState } from "react";
import { Heart, X, ChevronLeft, ChevronRight, Dot } from "lucide-react";
import { timeAgo } from "../../utils/timeAgo";
import { BiLock } from "react-icons/bi";
import { GiEarthAsiaOceania } from "react-icons/gi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import { useMedia } from "../../Context/ResponsiveContext";

const ProfileTimeLine = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isMobileSize = useMedia();
  const images = post?.project?.images || post?.images || [];

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setShowModal(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
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
          <span
            className="px-5 text-neutral-500"
            title={post?.project?.isGlobalPost ? "Public" : "Private"}
          >
            {post?.project?.isGlobalPost ? (
              <GiEarthAsiaOceania size={17} />
            ) : (
              <BiLock size={17} />
            )}
          </span>
        </Link>
      </div>

      {/* Images */}
      {isMobileSize && images.length > 0 && (
        <div
          className={`grid ${
            images.length === 1
              ? "grid-cols-1"
              : images.length === 2
              ? "grid-cols-2"
              : "grid-cols-2"
          } gap-1`}
        >
          {images.map((img, idx) => (
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

      {!isMobileSize && images.length > 0 && (
        <div className="w-full relative">
          <Swiper
            pagination={{ clickable: true }}
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
                  className="w-full aspect-video max-h-[500px] object-cover rounded-lg"
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
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
        <p className="text-neutral-300">{post?.project?.description}</p>

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

      {/* Image Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setShowModal(false)}
          >
            <X size={32} />
          </button>

          {/* Prev Button */}
          {images.length > 1 && (
            <button className="absolute left-4 text-white" onClick={prevImage}>
              <ChevronLeft size={40} />
            </button>
          )}

          {/* Current Image */}
          <img
            src={images[currentImageIndex]}
            alt="Preview"
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />

          {/* Next Button */}
          {images.length > 1 && (
            <button className="absolute right-4 text-white" onClick={nextImage}>
              <ChevronRight size={40} />
            </button>
          )}
        </div>
      )}

      {/* Horizontal Ruler */}
      <div className="w-full border-b-2 border-neutral-900"></div>
    </div>
  );
};

export default ProfileTimeLine;
