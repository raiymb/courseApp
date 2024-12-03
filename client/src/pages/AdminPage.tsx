import React from "react";
import { useAuth } from "../context/AuthContext";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const AdminPage: React.FC = () => {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return <Typography>Access Denied</Typography>;
  }

  return (
    <Box mt={5} textAlign="center">
      <Typography variant="h4">Admin Dashboard</Typography>
      <Typography>Manage users, courses, and more.</Typography>
    </Box>
  );
};

export default AdminPage;
