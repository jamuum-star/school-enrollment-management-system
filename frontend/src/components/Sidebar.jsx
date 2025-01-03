

import React from 'react';

const Sidebar = ({ userRole }) => {
  return (
    <div className="sidebar">
      <ul>
        {userRole === 'Admin' && (
          <>
            <li><a href="/admin/dashboard">Admin Dashboard</a></li>
            <li><a href="/admin/manage-users">Manage Users</a></li>
            {/* Additional Admin Links */}
          </>
        )}
        {userRole === 'User' && (
          <>
            <li><a href="/user/dashboard">User Dashboard</a></li>
            {/* Additional User Links */}
          </>
        )}
        {userRole === 'Student' && (
          <>
            <li><a href="/student/dashboard">My Dashboard</a></li>
            {/* Additional Student Links */}
          </>
        )}
        {userRole === 'Parent' && (
          <>
            <li><a href="/parent/dashboard">My Child's Dashboard</a></li>
            {/* Additional Parent Links */}
          </>
        )}
      </ul>
    </div>
  );
};

const Dashboard = ({ userRole }) => {
  return (
    <div className="dashboard">
      <Sidebar userRole={userRole} />
      <div className="dashboard-content">
        {userRole === 'Admin' && (
          <div>Admin-specific content</div>
        )}
        {userRole === 'Student' && (
          <div>Student-specific content</div>
        )}
        {userRole === 'Parent' && (
          <div>Parent-specific content</div>
        )}
        {/* Render content based on the role */}
      </div>
    </div>
  );
};

export default Dashboard;
