import { useLoginMutation } from "../features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authslice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Login() {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  
  const handleLogin = async () => {
    try {
      setError(null);
      const res = await login({
      email: "admin@admin.com",
      password: "admin123",
    }).unwrap();

    dispatch(setCredentials(res));
    navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-xl font-semibold mb-4">Login</h1>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}
