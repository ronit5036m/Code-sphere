import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axiosInstance from "../../api/axiosInstance";
export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm();
  const naviagte = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/register", data);
      naviagte("/login");
      toast.success(response.data.message);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Registration failed.");
      } else {
        toast.error("Server error, Please try again later");
      }
    }
    reset();
  };

  const password = watch("password");
  return (
    <>
      <div className="flex items-center justify-center min-h-[88vh] bg-gradient-to-br bg-black flex-col px-4">
        <div className="bg-neutral-900 shadow-sm rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* uername section */}
            <div>
              <label className="block text-white font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                {...register("username", { required: "Username is required" })}
                className="w-full px-4 py-2 border-2 border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-600 placeholder:text-white/30 text-white"
                placeholder="Enter username"
                disabled={isSubmitting}
              />
              {errors.username && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password section */}

            <div>
              <label className="block text-white font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 1,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full px-4 py-2 border-2 border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-600 placeholder:text-white/30 text-white"
                placeholder="Create password"
                disabled={isSubmitting}
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm password section */}

            <div>
              <label className="block text-white font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="text"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full px-4 py-2 border-2 border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-600 placeholder:text-white/30 text-white"
                placeholder="Confirm password"
                disabled={isSubmitting}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}

            <button
              type="submit"
              className={`w-full font-semibold py-2 px-4 rounded-lg transition flex justify-center items-center ${
                isSubmitting
                  ? "bg-neutral-300"
                  : "bg-white hover:bg-neutral-200 text-black"
              }`}
              disabled={isSubmitting}
            >
              {/* Submit Loading */}

              {isSubmitting ? (
                <svg
                  className="animate-spin h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                  />
                </svg>
              ) : (
                "Register"
              )}
            </button>

            <p className="text-center font-medium block text-white mb-1">
              Already have an account ?{" "}
              <Link
                to="/login"
                className="font-bold hover:text-white transition-colors"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
