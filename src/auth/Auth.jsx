import { Navigate } from "react-router-dom";
// Protected Route Component
export const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

// Public Route Restriction (e.g., /login, /register)
export const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" /> : children;
};

export function extractBearerToken(authHeader) {
  if (typeof authHeader !== 'string') {
    throw new Error('Authorization header must be a string');
  }

  const parts = authHeader.trim().split(/\s+/);

  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
    throw new Error('Invalid Authorization header format. Expected: Bearer <token>');
  }

  return parts[1];
}
