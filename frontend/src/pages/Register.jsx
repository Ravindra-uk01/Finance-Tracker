import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Register = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      // registration logic here
      // After successful registration, you can redirect or show a success message
    } catch (err) {
      console.error("Registration failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="p-2 flex flex-col gap-4 justify-center items-center">
          <div className="flex gap-2 ">
            <label className="text-xl font-semibold">Name</label>
            <Input
              type="text"
              placeholder="Enter your Name"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-2 ">
            <label className="text-xl font-semibold">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex gap-2 ">
            <label className="text-xl font-semibold">Password</label>
            <Input
              type="password"
              placeholder="Enter your Password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              required
            />
          </div>
       

          <Button
            type="submit"
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </div>
      </form>

      <div className="mt-4 text-center">
        <p>
          Already have an account?
          <a href="/login" className="text-blue-600 hover:underline ml-1">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
