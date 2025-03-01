import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [msg, setMsg] = useState("");
  async function submit(e) {
    e.preventDefault();
    const url = "https://67b416df392f4aa94fa93d91.mockapi.io/user";
    const getData = axios.get(url);
    const fetchData = (await getData).data;
    console.log(fetchData);

    const isUserExist = fetchData.find(
      (data) =>
        (data.email === userEmail ) &&
        data.password === userPassword
    );
    if (isUserExist) {
      alert("Login Successfull");
      setMsg("Login succesfull");

      const name = isUserExist.name;
      navigate("/get-employee", { state: { name } });
    } else {
      setMsg("Invalid Credentials");
    }
  }

  useEffect(() => {
    if (msg.length > 0) {
      let timer = setTimeout(() => {
        setMsg("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-center text-2xl font-bold text-gray-800">Login</h2>
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition"
          >
            Login
          </button>
          <p
            className="text-blue-400 text-sm text-end"
            onClick={() => navigate("/signup")}
          >
            need to be registerd
          </p>
          {msg && (
            <p className="text-red-400 bg-red-200 rounded-md px-4 py-1 border border-400  font-semibold text-center text-lg">
              {msg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signin;
