import React from "react";
import { useAuth } from "../context/AuthContext";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Box mt={5} textAlign="center">
      <Typography variant="h4">Profile</Typography>
      <Typography variant="h6">Name: {`${user.firstName} ${user.lastName}`}</Typography>
      <Typography variant="h6">Email: {user.email}</Typography>
      <Typography variant="h6">Role: {user.role}</Typography>
    </Box>
  );
};

export default ProfilePage;
