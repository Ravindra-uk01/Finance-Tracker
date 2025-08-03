import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // login user logic her

      console.log("Logging in with:", userData);
      //   navigate("/");
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="p-2 flex flex-col gap-4 justify-center items-center">
          <div className="flex gap-2  ">
            <label className="text-xl font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="p-1 border-black border-1 rounded"
              required
            />
          </div>
          <div className="flex gap-2 ">
            <label className="text-xl font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter your Password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              className="p-1 border-black border-1 rounded"
              required
            />
          </div>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            type="submit"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>

      <div className="mt-4 text-center">
        <p>
          Don't have an account?
          <a href="/register" className="text-blue-600 hover:underline ml-1">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
