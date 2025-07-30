import { useContext, useState } from "react";
import assets from "../assets/assets";
import axios from "axios";
import { AppContext } from "../context/AppContext";
const Register = () => {
  const [isText, setIsText] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(false);
  const { backendUrl, navigate, setToken } = useContext(AppContext);
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("profilePicture", image);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!isText) {
      return setIsText(true);
    } else {
      try {
        const response = await axios.post(
          `${backendUrl}/api/user/register`,
          formData
        );
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          setToken(response.data.token);
          toast.success(response.data.message);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          {!isText && (
            <div>
              <label className="block mb-1 text-sm text-gray-600">
                Full Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {!isText && (
            <div>
              <label className="block mb-1 text-sm text-gray-600">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {!isText && (
            <div>
              <label className="block mb-1 text-sm text-gray-600">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {isText && (
            <div>
              <label htmlFor="dp">
                <img
                  className="w-16 rounded-full"
                  src={image ? URL.createObjectURL(image) : assets.upload_icon}
                  alt=""
                />
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  hidden
                  type="file"
                  name=""
                  id="dp"
                />
              </label>
            </div>
          )}

          <button
            onClick={() => setIsText(true)}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isText ? "Register" : "Next"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
