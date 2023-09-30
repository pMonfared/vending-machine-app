import { useSelector, useDispatch } from "react-redux";
import authSlice from "../reducers/authSlice";
import { api } from "../services/api";

interface AuthHook {
  user: any | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, password: string, role: string) => Promise<void>;
}

export const useAuth = (): AuthHook => {
  const user = useSelector((state: any) => state.auth.user);
  const token = useSelector((state: any) => state.auth.token);
  const dispatch = useDispatch();

  const login = async (username: string, password: string) => {
    const response = await api.post("/auth/login", {
      username,
      password,
    });

    const { user, token } = response.data;

    dispatch(authSlice.actions.login({ user, token }));
  };

  const logout = () => {
    dispatch(authSlice.actions.logout());
  };

  const register = async (username: string, password: string, role: string) => {
    const response = await api.post("/auth/register", {
      username,
      password,
      role,
    });

    const { user, token } = response.data;

    dispatch(authSlice.actions.login({ user, token }));
  };

  return {
    user,
    token,
    login,
    logout,
    register,
  };
};
