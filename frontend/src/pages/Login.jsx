import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { login , user} = useAuth();
  const navigate = useNavigate();

  //  useEffect(() => {
  //   if (user) {
  //     navigate("/");
  //   }
  // }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(userData);
      navigate('/');
    } catch (err) {
      console.log('Login failed', err);
      setError('Invalid credentials');
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

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={userData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex gap-2 ">
            <label className="text-xl font-semibold">Password</label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={userData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <Button
            type="submit"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
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
