// utils/api.js
import axios from 'axios';

// Define the base URL for the API
const BASE_URL = 'http://localhost:9000/';
const userId = localStorage.getItem('userId');
// Function to fetch items from the backend (GET request)
export const fetchItems = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Function to post new item to the backend (POST request)
export const getUser = async () => {
  console.log(userId)
  try {
    const response = await axios.get(`http://localhost:9000/api/user/${userId}`,{
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// You can add more API functions here as needed and export them
