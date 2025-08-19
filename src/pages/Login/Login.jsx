import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../Context/AuthContext";
import Footer from "../../components/Footer/Footer";

export default function LoginForm() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/login", data);

      if (response?.data?.success) {
        const token = response?.data?.token;
        await login(token);
        window.location.reload();
        navigate("/");
        toast.success(response?.data?.message);
      } else {
        navigate("/login");
        toast.error("No record found");
      }
    } catch (error) {
      if (error.response) {
        console.clear();
        toast.error(error?.response?.data?.message || "Login failed.");
      } else {
        console.clear();
        toast.error("Server error. Please try again later.");
      }
    }
    reset();
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-[88vh] p-4 bg-black">
        <div className="bg-neutral-900 shadow-sm rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Login Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              {errors?.username && (
                <p className="text-sm text-red-600">
                  {errors?.username?.message}
                </p>
              )}
            </div>
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
                placeholder="Enter password"
                disabled={isSubmitting}
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors?.password?.message}
                </p>
              )}
            </div>
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
                  xmlns="https://www.w3.org/2000/svg"
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
                "Login"
              )}
            </button>

            <p className="text-center font-medium block text-white mb-1">
              Don't have an account ?{" "}
              <Link
                to="/register"
                className="font-bold hover:text-white transition-colors"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <Footer />
      </div>
    </>
  );
}
