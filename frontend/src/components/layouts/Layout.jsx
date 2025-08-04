import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Finance Tracker
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/transactions" className="hover:text-gray-300">
                  Transactions
                </Link>
              </li>
              
              {user?.role === "ADMIN" && (
                <li>
                  <Link to="/admin/users" className="hover:text-gray-300">
                    Users
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span>Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-300">
                  Login
                </Link>
                <Link to="/register" className="hover:text-gray-300">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4">{children}</main>

      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          © {new Date().getFullYear()} Personal Finance Tracker by Ravindra Singh Rayal
        </div>
      </footer>
    </div>
  );
};

export default Layout;
