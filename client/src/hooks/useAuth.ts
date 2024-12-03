import { useAuth } from "../context/AuthContext";

export const useAuthState = () => {
  const { user, token } = useAuth();
  return { user, token };
};

export const useAuthActions = () => {
  const { login, logout } = useAuth();
  return { login, logout };
};
