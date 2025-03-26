import { useContext, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router";
import { AuthContext } from "../services/auth/auth.context";
import AgeVerificationModal from "../components/modals/AgeVerificationModal";
import LoginModal from "../components/modals/LoginModal";

const ProtectedRoute = () => {
  const [showAgeVerificationModal, setShowAgeVerificationModal] =
    useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // Store the current location

  const navigateToHome = () => {
    navigate("/", { replace: true });
  };

  // If user is NOT authenticated, show modals
  if (!isAuthenticated || !user) {
    return (
      <>
        <AgeVerificationModal
          isOpen={showAgeVerificationModal}
          onConfirm={() => setShowLoginModal(true)}
          onClose={() => {
            setShowAgeVerificationModal(false);
            setShowLoginModal(false);
            navigateToHome();
          }}
        />
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      </>
    );
  }

  // If authenticated, allow access to nested routes
  return <Outlet />;
};

export default ProtectedRoute;
