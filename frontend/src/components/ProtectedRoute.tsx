import { Navigate, useLocation } from "react-router-dom";
import { AuthService } from "@/services/auth.service";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthenticated = AuthService.isAuthenticated();
  const currentUser = AuthService.getCurrentUser();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified, check if user has the required role
  if (allowedRoles && currentUser?.role) {
    if (!allowedRoles.includes(currentUser.role)) {
      // Redirect to appropriate dashboard based on role
      return <Navigate to={`/dashboard/${currentUser.role}`} replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
