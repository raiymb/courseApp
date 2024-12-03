import React, { useEffect, useState } from "react";
import { getAllCourses } from "../api/course"; // Update the import to match the correct function name
import CourseCard from "../components/CourseCard";
import Loader from "../components/Loader";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses(); // Use the correct function
        setCourses(data);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <Loader />;

  return (
    <Box mt={5}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Available Courses
      </Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        {courses.map((course: any) => (
          <CourseCard key={course.id} id={course.id} title={course.title} description={course.description} />
        ))}
      </Box>
    </Box>
  );
};

export default CoursesPage;
