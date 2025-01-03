import React from 'react';import { FaUserLock, FaUserPlus, FaChalkboardTeacher, FaBell, FaCreditCard, FaChartBar, FaBook, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import icons

import image from '../images/2.jpg'; // Import your images
import ajay from '../images/4.jpg';
import contactImage from '../images/6.jpg';

const App = () => {
  return (
    <div className="font-sans bg-gray-50 text-2xl" >
      {/* Navigation */}
      <nav className="flex justify-between items-center bg-orange-500 text-white p-4 sticky top-0 z-50">
        <div className="text-2xl font-bold">SmartEnroll</div>
        <ul className="flex gap-8">
          <li><a href="./" className="">Home</a></li>
          <li><a href="#courses" className="">Courses</a></li>
          <li><a href="#key-features" className="">Features</a></li>
          <li><a href="#contact" className="">Contact Us</a></li>
          <li><a href="/login" className="">Login</a></li>
        </ul>
      </nav>

      {/* Main Section */}
<div className="flex items-center justify-between p-12 gap-8 border-b-4 border-gray-300">
  <div className="text-section max-w-lg text-right mr-8 leading-tight">
    <h1 className="text-6xl font-bold mb-8">SmartEnroll </h1>
    <h1 className="text-5xl font-bold ml-[-7] text-orange-500 "> high Shcool </h1>

    <h2 className="text-4xl font-bold mb-4">Take your career to the next level </h2>
    <h1 className="text-5xl font-bold ml-12 text-orange-500 "> Our school is where your dreams begin. </h1>
    <p className="text-3xl mb-6">With indispensable courses</p>
    <div className="flex mt-6 justify-end">
      <button className="bg-orange-500 px-10 py-4 rounded-xl font-bold hover:bg-gray-800 text-white mr-4 text-lg">
        Exams
      </button>
      <button className=" px-10 py-4 rounded-xl font-bold hover:bg-gray-800 hover:bg-orange-500 text-white text-lg bg-gray-800">
        Our Courses
      </button>
    </div>
  </div>

  <div className="image-section w-[800px] h-[600px]">
    <img className="w-full h-full object-cover rounded-xl shadow-lg" src={image} alt="Career" />
  </div>
</div>


      {/* About Section */}
      <section className="py-16 bg-gray-50 border-b-4 border-gray-300" id="about">
        <h2 className="text-6xl mb-8 text-center font-bold text-gray-800">About Us</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 px-6">
          <div>
            <img className="w-[full] h-[500px] object-cover rounded-xl shadow-lg mr-[30px]" src={ajay} alt="School Environment" />
          </div>
          <div className="text-left">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">Welcome to Our School</h1>
            <h2 className='text-orange-500 text-4xl'>Where Learning Meets Excellence</h2>
            <p className="text-lg text-gray-700 mt-6 leading-relaxed">
            Welcome to Our School
        Where Learning Meets Excellence
         Our school is dedicated to providing a nurturing environment where students can excel academically, socially, and personally.
            Join us on this exciting journey of discovery and transformation.
            </p>
            <p className="text-lg text-gray-700 mt-4 leading-relaxed">
              Join us on this exciting journey of discovery and transformation.
            </p>
            <div className="mt-8 text-center">
              <button className="bg-orange-500 px-8 py-4 rounded-xl text-white font-bold hover:bg-orange-600 transition">
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Courses</h2>
          <p className="text-gray-600 text-lg mb-12">
            Explore a variety of courses that will take your skills to the next level.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Course Item */}
            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <FaBook className="text-orange-500 text-5xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Islamic Studies</h3>
              <p className="text-gray-600">
                Learn about the rich history, culture, and teachings of Islam.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <FaBook className="text-orange-500 text-5xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Arabic</h3>
              <p className="text-gray-600">
                Master the Arabic language and understand its significance in the modern world.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <FaBook className="text-orange-500 text-5xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">English</h3>
              <p className="text-gray-600">
                Improve your English proficiency in reading, writing, and communication.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <FaBook className="text-orange-500 text-5xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Physics</h3>
              <p className="text-gray-600">
                Understand the fundamental principles of physics and how they apply to the world around us.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <FaBook className="text-orange-500 text-5xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Chemistry</h3>
              <p className="text-gray-600">
                Dive into the study of chemicals and their reactions in real-world applications.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <FaBook className="text-orange-500 text-5xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Biology</h3>
              <p className="text-gray-600">
                Explore the world of living organisms and understand the science behind life.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <FaBook className="text-orange-500 text-5xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Science</h3>
              <p className="text-gray-600">
                Broaden your knowledge of various scientific fields, from physics to biology.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <FaBook className="text-orange-500 text-5xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Technology</h3>
              <p className="text-gray-600">
                Stay up-to-date with the latest advancements in technology and their applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="key-features" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
          <p className="text-gray-600 text-lg mb-12">
            Discover the unique features that make our platform stand out.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Item */}
            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <FaUserLock className="text-orange-500 text-5xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Secure Login</h3>
              <p className="text-gray-600">
                Ensure data privacy with our role-based, secure login system for all users.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <FaUserPlus className="text-orange-500 text-5xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Seamless Enrollment</h3>
              <p className="text-gray-600">
                Manage student enrollment and updates with ease, ensuring smooth workflows.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <FaChalkboardTeacher className="text-orange-500 text-5xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Dynamic Classes</h3>
              <p className="text-gray-600">
                Organize and assign students to classes effortlessly with flexible scheduling.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <FaBell className="text-orange-500 text-5xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Real-Time Notifications</h3>
              <p className="text-gray-600">
                Stay informed with real-time updates on approvals, deadlines, and announcements.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <FaCreditCard className="text-orange-500 text-5xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Fee Management</h3>
              <p className="text-gray-600">
                Track payments and generate invoices while maintaining transparent records.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <FaChartBar className="text-orange-500 text-5xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Analytics</h3>
              <p className="text-gray-600">
                Access insightful analytics to monitor enrollment trends and overall performance.
              </p>
            </div>
          </div>
        </div>
      </section>

  


{/* Contact Section */}
<section id="contact" className="py-16 bg-white-800 text-black">
  <h2 className="text-6xl font-bold text-center mb-6">Contact Us</h2>
  <div className="max-w-6xl mx-auto text-center px-4 flex items-center justify-between">
    {/* Left Side (Image) */}
    <div className="w-1/2">
      <img src={contactImage} alt="Contact Us" className="w-[full] h-[500px] object-cover rounded-xl shadow-lg ml-1" />
    </div>
    
    {/* Right Side (Form) */}
    <div className="w-1/2">
      <p className="text-lg mb-8">Have any questions or need assistance? Get in touch with us today!</p>
      <form className="max-w-lg mx-auto">
        <input type="text" className="w-full p-4 mb-4 rounded-xl text-black-800" placeholder="Your Name" />
        <input type="email" className="w-full p-4 mb-4 rounded-xl text-gray-800" placeholder="Your Email" />
        <textarea className="w-full p-4 mb-4 rounded-xl text-gray-800" placeholder="Your Message"></textarea>
        <button type="submit" className="bg-orange-500 px-8 py-4 rounded-xl text-white font-bold hover:bg-orange-600 transition">
          Send Message
        </button>
      </form>
    </div>
  </div>
</section>



       {/* Footer Section */}
       <footer className="bg-gray-800 text-white py-12">
  <div className="max-w-6xl mx-auto text-center">
    <div className="mb-8">
      <h3 className="text-3xl font-bold">SmartEnroll</h3>
      <p className="text-lg">Empowering Students, Enabling Futures</p>
    </div>
    <div className="flex justify-center space-x-6 mb-8">
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-500">
        <FaFacebook size={30} />
      </a>
      <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-500">
        <FaTwitter size={30} />
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-500">
        <FaInstagram size={30} />
      </a>
      <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-500">
        <FaLinkedin size={30} />
      </a>
    </div>
    <p className="text-sm">&copy; 2024 SmartEnroll. All rights reserved.</p>
  </div>
</footer>


    </div>
  );
};

export default App;