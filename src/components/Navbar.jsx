import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "../context/ToastContext"; 

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast(); 



  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("ticketapp_session"));
    setLoggedInUser(session);
  }, [location]);


  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session");
    showToast("You've been logged out.", "info"); 
    navigate("/");
  };


  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-[1440px] mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          TicketMgr
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium transition"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-blue-600 font-medium transition"
          >
            About
          </Link>
          <Link
            to="/dashboard"
            className="text-gray-700 hover:text-blue-600 font-medium transition"
          >
            Dashboard
          </Link>

          {/* Divider */}
          <span className="h-6 w-px bg-gray-300"></span>

          {/* Conditional Auth Buttons */}
          <div className="flex items-center gap-3">
            {loggedInUser ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium 
                 shadow-md transition-all duration-300 
                 hover:bg-red-600 hover:shadow-lg hover:scale-[1.03]"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg 
                   font-medium transition-all duration-300 
                   hover:bg-blue-600 hover:text-white hover:shadow-md"
                >
                  Login
                </Link>
                <Link
                  to="/auth/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium 
                   shadow-md transition-all duration-300 
                   hover:bg-blue-700 hover:shadow-lg hover:scale-[1.03]"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-3xl text-blue-600 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md shadow-md py-4 space-y-3 text-center">
          <Link
            to="/"
            className="block text-gray-700 hover:text-blue-600 font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block text-gray-700 hover:text-blue-600 font-medium"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/dashboard"
            className="block text-gray-700 hover:text-blue-600 font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>

          <hr className="border-gray-200 w-3/4 mx-auto" />

          {/* Auth Buttons (Mobile) */}
          <div className="flex flex-col items-center gap-3 pt-2">
            {loggedInUser ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-3/4 px-4 py-2 bg-red-500 text-white rounded-lg font-medium 
                 shadow-md transition-all duration-300 
                 hover:bg-red-600 hover:shadow-lg hover:scale-[1.03]"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="w-3/4 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg 
                   font-medium transition-all duration-300 
                   hover:bg-blue-600 hover:text-white hover:shadow-md"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>

                <Link
                  to="/auth/signup"
                  className="w-3/4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium 
                   shadow-md transition-all duration-300 
                   hover:bg-blue-700 hover:shadow-lg hover:scale-[1.03]"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
