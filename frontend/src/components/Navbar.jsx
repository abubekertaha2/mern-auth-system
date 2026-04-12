import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { logoutUser } from "../lib/api.js";

function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  console.log("User:", user);
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-700 text-white">
      <Link to="/" className="text-xl font-bold">
        Registration App
      </Link>

      <div className="flex gap-4 items-center">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <span>Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded cursor-pointer"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;