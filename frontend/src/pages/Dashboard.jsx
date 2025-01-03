
//parnt reprt
import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import {
  FaBars,
  FaUserGraduate,
  FaUser,
  FaBook,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa"; // Add these imports
import { useNavigate } from "react-router-dom";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Dashboard = () => {
  const [totalCounts, setTotalCounts] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalCourses: 0,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTotalCounts();
  }, []);

  const fetchTotalCounts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/total-counts");
      const data = await response.json();
      setTotalCounts(data);
    } catch (error) {
      console.error("Error fetching total counts:", error);
    }
  };

  const { totalUsers, totalStudents, totalCourses } = totalCounts;

  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "New Enrollments",
        data: [12, 19, 3, 5, 2],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ["Courses", "Students", "Users"],
    datasets: [
      {
        data: [totalCourses, totalStudents, totalUsers],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div
        className={`bg-gray-800  text-white h-screen p-5 lg:w-64 w-full lg:h-auto lg:fixed lg:overflow-y-auto ${
          sidebarOpen ? "block" : "hidden"
        } lg:block`}
      >
        <h2 className="text-2xl font-bold mb-6 text-orange-500">
          Admin Dashboard
        </h2>
        <nav>
          <ul className="space-y-4 h-screen">
            <li className="flex items-center space-x-3 hover:bg-orange-500 p-2 rounded-lg">
              <FaUserGraduate className="sidebar-icon" />
              <a href="/dashboard" className="sidebar-link">
                Dashboard
              </a>
            </li>
            <li className="flex items-center space-x-3 hover:bg-orange-500 p-2 rounded-lg">
              <FaUser className="sidebar-icon" />
              <a href="/users" className="sidebar-link">
                Users
              </a>
            </li>
            <li className="flex items-center space-x-3 hover:bg-orange-500 p-2 rounded-lg">
              <FaBook className="sidebar-icon" />
              <a href="/courses" className="sidebar-link">
                Courses
              </a>
            </li>
            <li className="flex items-center space-x-3 hover:bg-orange-500 p-2 rounded-lg">
              <FaUserGraduate className="sidebar-icon" />
              <a href="/students" className="sidebar-link">
                Students
              </a>
            </li>
            <li className="flex items-center space-x-3 hover:bg-orange-500 p-2 rounded-lg">
              <FaCog className="text-xl" />
              <a href="/settings" className="sidebar-link">
                Settings
              </a>
            </li>
            <li className="flex items-center space-x-3 hover:bg-orange-500 p-2 rounded-lg">
              <FaSignOutAlt className="sidebar-icon" />
              <a href="/" className="sidebar-link">
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Hamburger Icon for Mobile View */}
      <div className="lg:hidden p-4">
        <FaBars
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-2xl cursor-pointer"
        />
      </div>

      {/* Main Dashboard Content */}
      <div className="flex-1 lg:ml-64 p-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-semibold">
            Welcome to the Admin Dashboard
          </h1>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-orange-500 p-4 rounded-lg shadow-md text-white text-center">
            <h2 className="text-2xl font-semibold">Total Students</h2>
            <p className="text-4xl">{totalStudents}</p>
          </div>
          <div className="bg-orange-500 p-4 rounded-lg shadow-md text-white text-center">
            <h2 className="text-2xl font-semibold">Total Courses</h2>
            <p className="text-4xl">{totalCourses}</p>
          </div>
          <div className="bg-orange-500 p-4 rounded-lg shadow-md text-white text-center">
            <h2 className="text-2xl font-semibold">Total Users</h2>
            <p className="text-4xl">{totalUsers}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">
              New Enrollments (Monthly)
            </h3>
            <div className="chart-container">
              <Bar
                data={barChartData}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Distribution</h3>
            <div className="chart-container">
              <Pie
                data={pieChartData}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
