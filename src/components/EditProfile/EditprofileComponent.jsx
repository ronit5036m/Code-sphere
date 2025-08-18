import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { ArrowLeft, Edit } from "lucide-react";
import { useAuth } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useMedia } from "../../Context/ResponsiveContext";

const EditprofileComponent = () => {
  const { authToken, CurrentUser, fetchUser } = useAuth();
  const navigate = useNavigate();
  const isMobileSize = useMedia();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    github: "",
    bio: "",
    twitter: "",
    instagram: "",
    facebook: "",
    skills: "",
    avatar: null,
  });

  useEffect(() => {
    if (CurrentUser?.existuser) {
      setFormData({
        name: CurrentUser?.existuser?.name || "",
        phone: CurrentUser?.existuser?.phone || "",
        address: CurrentUser?.existuser?.address || "",
        github: CurrentUser?.existuser?.links?.github || "",
        bio: CurrentUser?.existuser?.bio || "",
        twitter: CurrentUser?.existuser?.links?.twitter || "",
        instagram: CurrentUser?.existuser?.links?.instagram || "",
        facebook: CurrentUser?.existuser?.links?.facebook || "",
        skills: CurrentUser?.existuser?.skills || "",
        avatar: CurrentUser?.existuser?.avatar || null,
      });
    }
  }, [CurrentUser]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      setLoading(true);
      await axiosInstance.post("/api/profile", data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Profile updated successfully!");
      navigate(`/profile/${CurrentUser?.existuser?._id}`);
      fetchUser();
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-black text-white flex items-center justify-center flex-col ${
        isMobileSize ? "px-6" : "p-6"
      }`}
    >
      {isMobileSize && history.length > 0 && (
        <nav
          className={`sticky top-0 flex items-center h-15 w-full backdrop-blur-lg bg-black/20 rounded-xl px-1 z-999`}
        >
          <ArrowLeft
            size={28}
            color="#fff"
            className="cursor-pointer"
            onClick={() => window.history.back()}
          />
        </nav>
      )}

      <div className="w-full max-w-xl bg-black rounded-2xl shadow-xl p-8 border-2 border-neutral-900">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile avatar Upload */}
          <div className="flex flex-col items-center">
            <label className="w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-full cursor-pointer hover:bg-neutral-800 transition">
              {formData.avatar ? (
                <img
                  src={
                    typeof formData.avatar === "string"
                      ? formData.avatar
                      : URL.createObjectURL(formData.avatar)
                  }
                  alt="Preview"
                  className="w-32 h-32 rounded-full object-cover hover:opacity-80 transition-opacity"
                />
              ) : (
                <span className="text-gray-400">
                  <Edit />
                </span>
              )}
              <input
                type="file"
                name="avatar"
                className="hidden"
                accept="image/*"
                onChange={handleChange}
              />
            </label>
          </div>

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Phone */}
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Address */}
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Bio */}
          <textarea
            name="bio"
            placeholder="Write your bio..."
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none"
          />

          {/* Social Links */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="github"
              placeholder="GitHub"
              value={formData.github}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-gray-500 outline-none"
            />
            <input
              type="text"
              name="twitter"
              placeholder="Twitter"
              value={formData.twitter}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-sky-500 outline-none"
            />
            <input
              type="text"
              name="instagram"
              placeholder="Instagram"
              value={formData.instagram}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 outline-none"
            />
            <input
              type="text"
              name="facebook"
              placeholder="Facebook"
              value={formData.facebook}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          {/* Skills */}
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 outline-none"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full p-3 bg-gradient-to-l from-pink-600 via-red-500 to-orange-400 rounded-lg transition font-semibold ${
              loading ? "opacity-60" : "opacity-100"
            }`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditprofileComponent;
