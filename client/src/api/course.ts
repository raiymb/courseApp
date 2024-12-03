import axios from "axios";

const API_URL = "http://localhost:3000/api/courses";

export const getAllCourses = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data; // Returns an array of courses
};

export const getCourseById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data; // Returns a single course
};

export const createCourse = async (data: { title: string; description: string; isPublished: boolean }, token: string) => {
  const response = await axios.post(`${API_URL}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data; // Returns the created course
};
