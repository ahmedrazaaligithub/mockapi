import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

const JobForm = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [salary, setSalary] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [designation, setDesignation] = useState("");
    const [department, setDepartment] = useState("");
    const [gender, setGender] = useState("");
    const [message, setMessage] = useState("");
    const [isShow, setIsShow] = useState(false);

    async function handleSubmit() {
        try {
            let axios_response = await axios.post("https://67b416df392f4aa94fa93d91.mockapi.io/add-job", {
                employee_name: name,
                employee_salary: salary,
                employee_email: email,
                employee_password: password,
                employee_designation: designation,
                employee_department: department,
                employee_gender: gender,
            }).catch((E) => { console.log(E) });
            console.log(axios_response);
            setMessage("Your Data Save successFully");
            setIsShow(true);
            // navigate("/get-employee")
            clear();
        } catch (error) {
            console.log(error);
        }
    }

    function clear() {
        setName("");
        setSalary(0);
        setEmail("");
        setPassword("");
        setDesignation("");
        setDepartment("");
        setGender("");
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">

            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">

                <h2 className="text-center text-2xl font-semibold text-gray-700">Employee Information</h2>

                <div className="mt-4">

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700">Enter Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Employee Name"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700">Enter Salary</label>
                        <input
                            type="number"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            placeholder="Employee Salary"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700">Enter Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Employee Email"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700">Enter Password</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Employee Password"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700">Enter Designation</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            placeholder="Employee Designation"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700">Enter Department</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            placeholder="Employee Department"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700">Select Gender:</label>
                        <div className="flex items-center mt-2">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                onChange={(e) => setGender(e.target.value)}
                                checked={gender === "male"}
                                className="mr-2"
                            /> Male
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                onChange={(e) => setGender(e.target.value)}
                                checked={gender === "female"}
                                className="ml-4 mr-2"
                            /> Female
                            <input
                                type="radio"
                                name="gender"
                                value="other"
                                onChange={(e) => setGender(e.target.value)}
                                checked={gender === "other"}
                                className="ml-4 mr-2"
                            /> Other
                        </div>
                    </div>

                    <button
                        className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>

                    {isShow && (
                        <h5 className="text-center mt-4 text-green-500">{message}</h5>
                    )}

                </div>
            </div>
        </div>
    );
};

export default JobForm;
