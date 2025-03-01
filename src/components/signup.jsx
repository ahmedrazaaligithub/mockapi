import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userGender, setUserGender] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      let axios_response = await axios.get(
        "https://67b416df392f4aa94fa93d91.mockapi.io/user",
        {
          name: userName,
          email: userEmail,
          password: userPassword,
          gender: userGender,
        }
      );
      console.log(axios_response);
      alert("User created successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Register Your self
        </h2>
        <p className="text-center text-gray-600">Enter These Credentials</p>

        <form onSubmit={submit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              User Name
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter Username"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              User Email
            </label>
            <input
              type="email"
              className="w-full p-2 border rounded mt-1"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Enter Email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Enter Password
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded mt-1"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="Enter Password"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Enter Gender
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              value={userGender}
              onChange={(e) => setUserGender(e.target.value)}
              placeholder="Enter Gender"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition"
          >
            Signup
          </button>
          <p className="text-blue-400 text-sm text-end" onClick={()=>(navigate("/"))}>need to be login</p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
