import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUserGraduate,
  FaUser,
  FaBook,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    theme: "light",
    notifications: true,
    language: "en",
  });

  useEffect(() => {
    // Fetch settings from backend on component mount
    axios
      .get("/api/settings")
      .then((response) => {
        setSettings(response.data);
        // Apply theme on initial load
        document.documentElement.classList.toggle(
          "dark",
          response.data.theme === "dark"
        );
      })
      .catch((error) => {
        console.error("There was an error fetching the settings!", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });

    // Apply theme change instantly
    if (name === "theme") {
      document.documentElement.classList.toggle("dark", value === "dark");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/settings", settings)
      .then((response) => {
        console.log("Settings saved:", response.data);
      })
      .catch((error) => {
        console.error("There was an error saving the settings!", error);
      });
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex">
        <aside className="w-64 bg-gray-800 text-white h-screen p-4">
          <h2 className="text-2xl font-bold mb-6 text-orange-500">
            Admin Dashboard
          </h2>
          <nav>
            <ul className="space-y-4 h-screen">
              <li className="flex items-center space-x-3 hover:bg-orange-500 p-2 rounded-lg">
                <FaUserGraduate className="text-xl" />
                <a href="/dashboard" className="sidebar-link">
                  Dashboard
                </a>
              </li>
              <li className="flex items-center space-x-3 hover:bg-orange-500 p-2 rounded-lg">
                <FaUser className="text-xl" />
                <a href="/users" className="sidebar-link">
                  Users
                </a>
              </li>
              <li className="flex items-center space-x-3 hover:bg-orange-500 p-2 rounded-lg">
                <FaBook className="text-xl" />
                <a href="/courses" className="sidebar-link">
                  Courses
                </a>
              </li>
              <li className="flex items-center space-x-3 hover:bg-orange-500 p-2 rounded-lg">
                <FaUserGraduate className="text-xl" />
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
                <FaSignOutAlt className="text-xl" />
                <a href="/" className="sidebar-link">
                  Logout
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-4 text-center text-orange-200">
            Settings
          </h1>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md dark:bg-orange-500 dark:text-white"
          >
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-200">
                Theme
              </label>
              <select
                name="theme"
                value={settings.theme}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-200">
                Notifications
              </label>
              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
                className="mr-2 leading-tight"
              />
              <span className="text-gray-700 dark:text-gray-200">
                Enable notifications
              </span>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-200">
                Language
              </label>
              <select
                name="language"
                value={settings.language}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="en">English</option>
                <option value="so">Somali</option>
                <option value="ar">Arabic</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Save Settings
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
