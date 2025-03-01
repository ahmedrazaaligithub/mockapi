import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { MdOutlineDelete } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const GetEmployee = () => {
  const location = useLocation()
  const name = location.state?.name
  const navigate = useNavigate()

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc"); // Default sorting order
  const [isDeleted, setIsDeleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    axios
      .get("https://67b416df392f4aa94fa93d91.mockapi.io/employee")
      .then((response) => {
        setEmployees(response.data); // Ensure response.data is used
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleDeleteEmployee = (id, name) => {
    Swal.fire({
      title: `Are you sure you want to delete ${name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://67b416df392f4aa94fa93d91.mockapi.io/employee/${id}`)
          .then(() => {
            const updatedEmployees = employees.filter((employee) => employee.id !== id);
            setEmployees(updatedEmployees);
            setIsDeleted(true);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          });
      }
    });
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  useEffect(() => {
    if (isDeleted) {
      const timer = setTimeout(() => {
        setIsDeleted(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isDeleted]);

  const searchEmployees = search
    ? employees.filter((data) =>
        data.employee_name.toLowerCase().includes(search.toLowerCase())
      )
    : employees;

  const sortedEmployees = searchEmployees.sort((a, b) => {
    if (sort === "asc") {
      return a.employee_salary - b.employee_salary; // Ascending order
    } else {
      return b.employee_salary - a.employee_salary; // Descending order
    }
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Employee Directory
        </h1>
        <div className="flex justify-between items-center my-3">
        <h1 className="text-sm font-bold text-start mb-6 text-gray-800">
          welcome {name}!
        </h1>
        <button
          onClick={()=>navigate("/add-employee")}
            className="w-40 bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition"
          >
            + add employee
          </button>
        </div>
        <input
          type="text"
          placeholder="Search Employee"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="flex justify-end mb-6">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="asc">Sort by Salary (Low to High)</option>
            <option value="desc">Sort by Salary (High to Low)</option>
          </select>
        </div>
        {isDeleted && (
          <p className="text-red-600 text-center p-1 bg-red-200 border border-red-600 rounded mb-4">
            Employee deleted successfully
          </p>
        )}
        <div className="space-y-4">
          {sortedEmployees.map((employee) => (
            <div
              key={employee.id}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center justify-between w-full"
            >
              <div>
                <span className="text-lg font-semibold text-gray-700">
                  {employee.employee_name}
                </span>{" "}
                -{" "}
                <span className="text-gray-500">
                  {employee.employee_designation}
                </span>
                <span className="block text-gray-600">
                  Salary: {employee.employee_salary}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <button
                  className="p-1 rounded-md"
                  onClick={() => handleEditEmployee(employee)}
                >
                  <HiOutlinePencilAlt className="text-sky-600 text-xl" />
                </button>
                <button
                  className="p-1 rounded-md"
                  onClick={() =>
                    handleDeleteEmployee(employee.id, employee.employee_name)
                  }
                >
                  <MdOutlineDelete className="text-red-600 text-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-center text-2xl font-semibold text-gray-700">
              Edit Employee Information
            </h2>
            <div className="mt-4">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Enter Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  // value={selectedEmployee.employee_name}
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      employee_name: e.target.value
                    })
                  }
                  placeholder="Employee Name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Enter Salary
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  // value={selectedEmployee.employee_salary}
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      employee_salary: e.target.value
                    })
                  }
                  placeholder="Employee Salary"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Enter Designation
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  // value={selectedEmployee.employee_designation}
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      employee_designation: e.target.value
                    })
                  }
                  placeholder="Employee Designation"
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetEmployee;