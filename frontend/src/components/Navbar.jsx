import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {``
      await axios.post(
        "http://localhost:3000/api/users/logout",
        {},
        { withCredentials: true }
      );

      setUser(null); 
      navigate("/login");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

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