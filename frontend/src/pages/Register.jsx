// import { Alert } from "@/components/ui/alert";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useAuth } from "@/contexts/AuthContext";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();
//   const { register , user} = useAuth();

//   //  useEffect(() => {
//   //     if (user) {
//   //       navigate("/");
//   //     }
//   //   }, [user, navigate]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({
//       ...userData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       console.log('Registering user:', userData);
//       await register(userData);
//       <Alert type="success" message="Registration successful!" />
//       navigate('/');
//     } catch (err) {
//       console.error("Registration failed", err);
//     } 
//     finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
//       {error && <div className="mb-4 text-red-600">{error}</div>}

//       <form onSubmit={handleSubmit}>
//         <div className="p-2 flex flex-col gap-4 justify-center items-center">
//           <div className="flex gap-2 ">
//             <label className="text-xl font-semibold">Name</label>
//             <Input
//               type="text"
//               placeholder="Enter your Name"
//               name="name"
//               value={userData.name}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="flex gap-2 ">
//             <label className="text-xl font-semibold">Email</label>
//             <Input
//               type="email"
//               placeholder="Enter your email"
//               name="email"
//               value={userData.email}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="flex gap-2 ">
//             <label className="text-xl font-semibold">Password</label>
//             <Input
//               type="password"
//               placeholder="Enter your Password"
//               name="password"
//               value={userData.password}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
       

//           <Button
//             type="submit"
//           >
//             {loading ? "Registering..." : "Register"}
//           </Button>
//         </div>
//       </form>

//       <div className="mt-4 text-center">
//         <p>
//           Already have an account?
//           <a href="/login" className="text-blue-600 hover:underline ml-1">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;


import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye,FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { register, user } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (userData.password !== userData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      console.log("Registering user:", userData);
      await register(userData);
      navigate("/");
    } catch (err) {
      console.error("Registration failed", err);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="p-2 flex flex-col gap-4 justify-center items-center w-full">
          {/* Name */}
          <div className="flex gap-2 items-center w-full">
            <label className="text-xl font-semibold w-24">Name</label>
            <Input
              type="text"
              placeholder="Enter your Name"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Email */}
          <div className="flex gap-2 items-center w-full justify-between">
            <label className="text-xl font-semibold w-24">Email</label>
            <Input
              type="email"
              placeholder="Enter your Email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Password */}
          <div className="flex gap-2 items-center w-full relative">
            <label className="text-xl font-semibold w-24">Password</label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              required
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex gap-2 items-center w-full relative">
            <label className="text-xl font-semibold w-24">Confirm</label>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-2">
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
