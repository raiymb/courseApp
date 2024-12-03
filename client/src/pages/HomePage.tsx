import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const HomePage: React.FC = () => {
  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h2" gutterBottom>
        Welcome to the Course Platform
      </Typography>
      <Typography variant="h6" gutterBottom>
        Learn new skills and enhance your knowledge today.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/courses">
        Browse Courses
      </Button>
    </Box>
  );
};

export default HomePage;
