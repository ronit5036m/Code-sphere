import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance"; // adjust path
import { useAuth } from "../../Context/AuthContext";
import { useMedia } from "../../Context/ResponsiveContext";
import { ArrowLeft, Plus, X } from "lucide-react";
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
    const maxSize = 2 * 1024 * 1024; // Max file size 2 MB

    if (files.length + formData.images.length > 5) {
      toast.error("You can only upload up to 5 images.");
      return;
    }

    const validFiles = [];
    for (let file of files) {
      if (file.size > maxSize) {
        toast.error(`${file.name} is larger than 2 MB`);
      } else {
        validFiles.push(file);
      }
    }

    if (validFiles.length === 0) return;

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...validFiles],
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
            className={`w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-neutral-400 outline-none focus:ring-2 focus:ring-blue-500 ${
              loading && "opacity-60"
            }`}
            required
            disabled={loading}
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-neutral-400 outline-none focus:ring-2 focus:ring-blue-500 h-28 resize-none ${
              loading && "opacity-60"
            }`}
            required
            disabled={loading}
          />

          {/* Tech Stack */}
          <input
            type="text"
            name="techStack"
            placeholder="Tech Stack (comma separated)"
            value={formData.techStack}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-neutral-400 outline-none focus:ring-2 focus:ring-green-500 ${
              loading && "opacity-60"
            }`}
            disabled={loading}
          />

          {/* Project Link */}
          <input
            type="url"
            name="projectLink"
            placeholder="Project Link (GitHub/Live)"
            value={formData.projectLink}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-neutral-400 outline-none focus:ring-2 focus:ring-purple-500 ${
              loading && "opacity-60"
            }`}
            disabled={loading}
          />

          {/* Global Post Toggle */}
          <div className="flex items-center justify-between bg-neutral-800 p-3 rounded-lg">
            <span className={`${loading && "opacity-60"}`}>Global Post</span>
            <button
              type="button"
              onClick={handleToggle}
              disabled={loading}
              className={`w-15 h-7 flex items-center rounded-full transition ${
                formData.isGlobalPost ? "bg-green-400" : "bg-neutral-600"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full transform transition bg-white ${
                  formData.isGlobalPost ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-sm">
              Upload Project Images (max 5)
            </label>

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
              id="imageUpload"
              disabled={loading}
            />

            {/* Plus icon trigger */}
            <div className="flex flex-wrap gap-3">
              {/* Preview of selected images */}
              {formData.images.map((img, i) => (
                <div key={i} className="relative group w-24 h-24">
                  <img
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className={`w-full h-full object-cover rounded-lg border border-gray-700 ${
                      loading && "opacity-60"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    disabled={loading}
                    className={`absolute top-1 right-1 bg-red-600 text-xs p-1 rounded-md opacity-80 group-hover:opacity-100 ${
                      loading && "opacity-60"
                    }`}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}

              {/* Add new image button */}
              {formData.images.length < 5 && (
                <label
                  htmlFor="imageUpload"
                  className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:bg-neutral-800 transition"
                >
                  <span className="text-gray-400 text-3xl font-bold flex justify-center items-center">
                    <Plus />
                  </span>
                </label>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`font-bold w-full p-3 bg-white rounded-lg text-black ${
              loading ? "opacity-60" : "hover:opacity-90"
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
