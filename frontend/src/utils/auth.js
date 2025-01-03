// frontend/src/utils/auth.js

export const getAuthToken = () => {
    return localStorage.getItem('authToken'); // Get token from localStorage
  };
  
  export const setAuthToken = (token) => {
    localStorage.setItem('authToken', token); // Save token to localStorage
  };
  
  export const removeAuthToken = () => {
    localStorage.removeItem('authToken'); // Remove token from localStorage
  };
  