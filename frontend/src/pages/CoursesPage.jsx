
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaUserGraduate, FaUser, FaBook, FaUserTie, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({ name: '', grade: '', maxCapacity: '' });
  const [editingCourse, setEditingCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/courses');
      console.log('Fetched courses:', response.data);
      setCourses(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Error fetching courses');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate formData
    if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      setError('Course name must be a valid string without numbers.');
      return;
    }

    if (!/^[0-9]+$/.test(formData.grade)) {
      setError('Grade must be a valid number.');
      return;
    }

    setError(null);

    try {
      if (editingCourse) {
        await axios.put(`http://localhost:5000/api/courses/${editingCourse._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/courses', formData);
      }
      setFormData({ name: '', grade: '', maxCapacity: '' });
      setEditingCourse(null);
      fetchCourses();
    } catch (error) {
      console.error('Error saving course:', error);
      setError('Error saving course');
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({ name: course.name, grade: course.grade, maxCapacity: course.maxCapacity });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`);
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      setError('Error deleting course');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white h-screen p-5 lg:w-64 w-full lg:h-auto lg:fixed lg:overflow-y-auto">
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
              <FaCog className="sidebar-icon" />
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

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100 lg:ml-64">
        <h1 className="text-5xl font-bold text-orange-500 mb-4 text-center ">
          Course Management
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mb-4 bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-2">
            <label className="block text-gray-700">Course Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                if (/^[a-zA-Z\s]*$/.test(e.target.value)) {
                  setFormData({ ...formData, name: e.target.value });
                }
              }}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Grade</label>
            <input
              type="number"
              value={formData.grade}
              onChange={(e) =>
                setFormData({ ...formData, grade: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Max Capacity</label>
            <input
              type="number"
              value={formData.maxCapacity}
              onChange={(e) =>
                setFormData({ ...formData, maxCapacity: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded"
          >
            {editingCourse ? "Update Course" : "Add Course"}
          </button>
        </form>
        <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Grade</th>
              <th className="border border-gray-300 p-2">Max Capacity</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id} className="text-center">
                <td className="border border-gray-300 p-2">{course.name}</td>
                <td className="border border-gray-300 p-2">{course.grade}</td>
                <td className="border border-gray-300 p-2">
                  {course.maxCapacity}
                </td>
                <td className="border border-gray-300 p-2 flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(course)}
                    className="bg-orange-500 text-white px-2 py-1 rounded"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesPage;

































































































































































































































































































































// import React, { useState, useEffect } from 'react';
// import { FaEdit, FaTrash, FaPlus, FaUserGraduate, FaUser, FaBook, FaUserTie, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';
// import axios from 'axios';

// const CoursesPage = () => {
//   const [courses, setCourses] = useState([]);
//   const [formData, setFormData] = useState({ name: '', grade: '', maxCapacity: '' });
//   const [editingCourse, setEditingCourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/courses'); // Ensure the correct URL
//       console.log('Fetched courses:', response.data); // Log the response data
//       setCourses(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//       setError('Error fetching courses');
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingCourse) {
//         await axios.put(`http://localhost:5000/api/courses/${editingCourse._id}`, formData); // Ensure the correct URL
//       } else {
//         await axios.post('http://localhost:5000/api/courses', formData); // Ensure the correct URL
//       }
//       setFormData({ name: '', grade: '', maxCapacity: '' });
//       setEditingCourse(null);
//       fetchCourses(); // Fetch the updated list of courses
//     } catch (error) {
//       console.error('Error saving course:', error);
//       setError('Error saving course');
//     }
//   };

//   const handleEdit = (course) => {
//     setEditingCourse(course);
//     setFormData({ name: course.name, grade: course.grade, maxCapacity: course.maxCapacity });
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/courses/${id}`); // Ensure the correct URL
//       fetchCourses(); // Fetch the updated list of courses
//     } catch (error) {
//       console.error('Error deleting course:', error);
//       setError('Error deleting course');
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="flex flex-col lg:flex-row">
//       {/* Sidebar */}
//       <div className="bg-gray-800 text-white h-screen p-5 lg:w-64 w-full lg:h-auto lg:fixed lg:overflow-y-auto">
//         <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
//         <nav>
//           <ul className="space-y-4">
//             <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg">
//               <FaUserGraduate className="sidebar-icon" />
//               <a href="/dashboard" className="sidebar-link">Dashboard</a>
//             </li>
//             <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg">
//               <FaUser className="sidebar-icon" />
//               <a href="/users" className="sidebar-link">Users</a>
//             </li>
//             <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg">
//               <FaBook className="sidebar-icon" />
//               <a href="/courses" className="sidebar-link">Courses</a>
//             </li>
//             <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg">
//               <FaUserGraduate className="sidebar-icon" />
//               <a href="/students" className="sidebar-link">Students</a>
//             </li>
//             <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg">
//               <FaUserTie className="sidebar-icon" />
//               <a href="/parents" className="sidebar-link">Parents</a>
//             </li>
//             <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg">
//               <FaChartBar className="sidebar-icon" />
//               <a href="/reports" className="sidebar-link">Reports</a>
//             </li>
//             <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg">
//               <FaCog className="sidebar-icon" />
//               <a href="/settings" className="sidebar-link">Settings</a>
//             </li>
//             <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg">
//               <FaSignOutAlt className="sidebar-icon" />
//               <a href="/logout" className="sidebar-link">Logout</a>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8 bg-gray-100 lg:ml-64">
//         <h1 className="text-4xl font-bold text-orange-500 mb-4">Course Management</h1>
//         <form onSubmit={handleSubmit} className="mb-4 bg-white p-6 rounded-lg shadow-md">
//           <div className="mb-2">
//             <label className="block text-gray-700">Course Name</label>
//             <input
//               type="text"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>
//           <div className="mb-2">
//             <label className="block text-gray-700">Grade</label>
//             <input
//               type="text"
//               value={formData.grade}
//               onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>
//           <div className="mb-2">
//             <label className="block text-gray-700">Max Capacity</label>
//             <input
//               type="number"
//               value={formData.maxCapacity}
//               onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>
//           <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">
//             {editingCourse ? 'Update Course' : 'Add Course'}
//           </button>
//         </form>
//         <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-md">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border border-gray-300 p-2">Name</th>
//               <th className="border border-gray-300 p-2">Grade</th>
//               <th className="border border-gray-300 p-2">Max Capacity</th>
//               <th className="border border-gray-300 p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {courses.map((course) => (
//               <tr key={course._id} className="text-center">
//                 <td className="border border-gray-300 p-2">{course.name}</td>
//                 <td className="border border-gray-300 p-2">{course.grade}</td>
//                 <td className="border border-gray-300 p-2">{course.maxCapacity}</td>
//                 <td className="border border-gray-300 p-2 flex justify-center space-x-2">
//                   <button onClick={() => handleEdit(course)} className="bg-orange-500 text-white px-2 py-1 rounded">
//                     <FaEdit />
//                   </button>
//                   <button onClick={() => handleDelete(course._id)} className="bg-red-500 text-white px-2 py-1 rounded">
//                     <FaTrash />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CoursesPage;


































































































































































































































// import React, { useState, useEffect } from 'react';
// import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
// import axios from 'axios';

// const CoursesPage = () => {
//   const [courses, setCourses] = useState([]);
//   const [formData, setFormData] = useState({ name: '', grade: '', maxCapacity: '' });
//   const [editingCourse, setEditingCourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/courses'); // Ensure the correct URL
//       console.log('Fetched courses:', response.data); // Log the response data
//       setCourses(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//       setError('Error fetching courses');
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingCourse) {
//         await axios.put(`http://localhost:5000/api/courses/${editingCourse._id}`, formData); // Ensure the correct URL
//       } else {
//         await axios.post('http://localhost:5000/api/courses', formData); // Ensure the correct URL
//       }
//       setFormData({ name: '', grade: '', maxCapacity: '' });
//       setEditingCourse(null);
//       fetchCourses(); // Fetch the updated list of courses
//     } catch (error) {
//       console.error('Error saving course:', error);
//       setError('Error saving course');
//     }
//   };

//   const handleEdit = (course) => {
//     setEditingCourse(course);
//     setFormData({ name: course.name, grade: course.grade, maxCapacity: course.maxCapacity });
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/courses/${id}`); // Ensure the correct URL
//       fetchCourses(); // Fetch the updated list of courses
//     } catch (error) {
//       console.error('Error deleting course:', error);
//       setError('Error deleting course');
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-4xl font-bold mb-4">Course Management</h1>
//       <form onSubmit={handleSubmit} className="mb-4">
//         <div className="mb-2">
//           <label className="block text-gray-700">Course Name</label>
//           <input
//             type="text"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>
//         <div className="mb-2">
//           <label className="block text-gray-700">Grade</label>
//           <input
//             type="text"
//             value={formData.grade}
//             onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>
//         <div className="mb-2">
//           <label className="block text-gray-700">Max Capacity</label>
//           <input
//             type="number"
//             value={formData.maxCapacity}
//             onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//           {editingCourse ? 'Update Course' : 'Add Course'}
//         </button>
//       </form>
//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border border-gray-300 p-2">Name</th>
//             <th className="border border-gray-300 p-2">Grade</th>
//             <th className="border border-gray-300 p-2">Max Capacity</th>
//             <th className="border border-gray-300 p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {courses.map((course) => (
//             <tr key={course._id} className="text-center">
//               <td className="border border-gray-300 p-2">{course.name}</td>
//               <td className="border border-gray-300 p-2">{course.grade}</td>
//               <td className="border border-gray-300 p-2">{course.maxCapacity}</td>
//               <td className="border border-gray-300 p-2">
//                 <button onClick={() => handleEdit(course)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
//                   <FaEdit />
//                 </button>
//                 <button onClick={() => handleDelete(course._id)} className="bg-red-500 text-white px-2 py-1 rounded">
//                   <FaTrash />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CoursesPage;