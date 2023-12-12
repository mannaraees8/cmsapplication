"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { userState } from "../state/atoms/userState";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { username, password });
      if (response.data.isAuthenticated) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", username);
        setEmail(username);
        router.push("/");
      } else {
        alert(response.data["message"]);
      } // Handle success (redirect, etc.)
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="h-screen flex bg-gray-200 text-black">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-blackBorder shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-black mt-4 mb-12 text-center">
          Log in to your account 🔐
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="w-full p-2 text-black border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              id="username"
              placeholder="Your Username"
              required={true}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="w-full p-2 text-black border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              id="password"
              placeholder="Your Password"
              required={true}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="flex justify-center items-center mt-6">
            <button className="bg-green-700 py-2 px-4 text-sm text-white rounded border border-green focus:outline-none transition duration-150 ease-in-out hover:bg-green-dark">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
