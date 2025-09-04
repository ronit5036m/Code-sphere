import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import RegisterForm from "./pages/Register/Register";
import LoginForm from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Errorpage from "./pages/Error/Errorpage";
import { PublicRoute, PrivateRoute } from "./auth/Auth";
import { AuthProvider } from "./Context/AuthContext";
import { SearchContext } from "./Context/SearchContext";
import Profile from "./pages/UserProfile/Profile";
import SearchBar from "./components/Search/Search";
import { ResponsiveProvider } from "./Context/ResponsiveContext";
import { PostProvider } from "./Context/PostContext";
import About from "./pages/About/About";
import EditProfile from "./pages/Edit/EditProfile";
import CreateProject from "./pages/CreateProject/CreateProject";
import "./App.css";
import AppLoading from "./components/Loading/Loading";
import LoadingPage from "./components/Loading/Loading";

const App = () => {
  const { isSearch } = useContext(SearchContext);

  return (
    <BrowserRouter>
      <ResponsiveProvider>
        <AuthProvider>
          <Toaster />
          {isSearch && <SearchBar />}
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginForm />
                </PublicRoute>
              }
            />
            {/* Public Routes */}
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterForm />
                </PublicRoute>
              }
            />

            {/* Protected Route */}

            <Route
              path="/"
              element={
                <PrivateRoute>
                  <PostProvider>
                    <Home />
                  </PostProvider>
                </PrivateRoute>
              }
            />

            <Route
              path="/profile/:id"
              element={
                <PrivateRoute>
                  <PostProvider>
                    <Profile />
                  </PostProvider>
                </PrivateRoute>
              }
            />

            <Route
              path="/edit-profile"
              element={
                <PrivateRoute>
                  <PostProvider>
                    <EditProfile />
                  </PostProvider>
                </PrivateRoute>
              }
            />

            <Route
              path="/create-projects"
              element={
                <PrivateRoute>
                  <PostProvider>
                    <CreateProject />
                  </PostProvider>
                </PrivateRoute>
              }
            />

            <Route path="/about" element={<About />} />
            <Route path="*" element={<Errorpage />} />
          </Routes>
        </AuthProvider>
      </ResponsiveProvider>
    </BrowserRouter>
  );
};

export default App;
