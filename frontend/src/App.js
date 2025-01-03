import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import StudentForm from "./components/StudentForm";
import StudentsTable from "./components/StudentsTable";
import StudentsPage from "./components/StudentsPage";
import UsersPage from "./pages/UsersPage "; // Import UsersPage component
import CoursesPage from "./pages/CoursesPage"; // Import CoursesPage
import SettingsPage from "./pages/SettingsPage"; // Import SettingsPage

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home />} />
        {/* Login route */}
        <Route path="/login" element={<Login />} />
        {/* Registration route */}
        <Route path="/register" element={<Registration />} />
        {/* Admin Dashboard route */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<StudentsPage />} />
        {/* Students routes */}
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/students/edit/:id" element={<StudentForm />} />
        <Route path="/students/add" element={<StudentForm />} />{" "}
        {/* Add student route */}
        <Route path="/students/list" element={<StudentsTable />} />
        {/* Users route */}
        <Route path="/users" element={<UsersPage />} />
        {/* Courses route */}
        <Route path="/courses" element={<CoursesPage />} />{" "}
        {/* Add the CoursesPage route */}
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
