import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance"; // adjust path
import { useAuth } from "../../Context/AuthContext";
import { useMedia } from "../../Context/ResponsiveContext";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateProjectComponent = () => {
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const isMobileSize = useMedia();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    projectLink: "",
    isGlobalPost: false,
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggle = () => {
    setFormData((prev) => ({
      ...prev,
      isGlobalPost: !prev.isGlobalPost,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 5) {
      alert("You can only upload up to 5 images.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("techStack", formData.techStack);
      data.append("projectLink", formData.projectLink);
      data.append("isGlobalPost", formData.isGlobalPost);

      formData.images.forEach((file) => {
        data.append("images", file);
      });
      setLoading(true);
      await axiosInstance.post("/api/project", data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      toast.success("Project posted successfully!");
      setFormData({
        title: "",
        description: "",
        techStack: "",
        projectLink: "",
        isGlobalPost: false,
        images: [],
      });
      navigate("/");
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-black text-white flex items-center flex-col ${
        isMobileSize ? "px-6" : "p-6"
      }`}
    >
      {isMobileSize && history.length > 0 && (
        <nav
          className={`sticky top-0 flex items-center h-15 w-full backdrop-blur-lg bg-black/20 rounded-xl px-1`}
        >
          <ArrowLeft
            size={28}
            color="#fff"
            className="cursor-pointer"
            onClick={() => window.history.back()}
          />
        </nav>
      )}
      <div className="w-full max-w-xl bg-black border border-neutral-900 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create New Project
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-neutral-400 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-neutral-400 outline-none focus:ring-2 focus:ring-blue-500 h-28 resize-none"
            required
          />

          {/* Tech Stack */}
          <input
            type="text"
            name="techStack"
            placeholder="Tech Stack (comma separated)"
            value={formData.techStack}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-neutral-400 outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Project Link */}
          <input
            type="url"
            name="projectLink"
            placeholder="Project Link (GitHub/Live)"
            value={formData.projectLink}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-neutral-400 outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Global Post Toggle */}
          <div className="flex items-center justify-between bg-neutral-800 p-3 rounded-lg">
            <span>Global Post</span>
            <button
              type="button"
              onClick={handleToggle}
              className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
                formData.isGlobalPost
                  ? "bg-gradient-to-l from-pink-600 via-red-500 to-orange-400"
                  : "bg-neutral-600"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transform transition ${
                  formData.isGlobalPost ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-sm">
              Upload Project Images (max 5)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full text-sm text-gray-400"
            />

            {/* Preview */}
            {formData.images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {formData.images.map((img, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="w-full h-24 object-cover rounded-lg border border-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 bg-red-600 text-xs px-2 py-1 rounded-md opacity-80 group-hover:opacity-100"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full p-3 bg-gradient-to-l from-pink-600 via-red-500 to-orange-400 rounded-lg font-semibold hover:opacity-90 ${
              loading && "opacity-60"
            }`}
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectComponent;
