import { useSelector, useDispatch } from "react-redux";
import authSlice from "../reducers/authSlice";
import { login as apiLogin, register as apiRegister } from "../services/api";

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
    const { user, token } = await apiLogin(username, password);

    dispatch(authSlice.actions.login({ user, token }));
  };

  const logout = () => {
    dispatch(authSlice.actions.logout());
  };

  const register = async (username: string, password: string, role: string) => {
    const { user, token } = await apiRegister(username, password, role);

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
