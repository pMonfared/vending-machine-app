import { useAppSelector, useAppDispatch } from "./index";

import {
  login as actionLogin,
  logout as actionLogout,
} from "../reducers/authSlice";
import { login as apiLogin, register as apiRegister } from "../services/api";

interface AuthHook {
  user: any | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, password: string, role: string) => Promise<void>;
}

export const useAuth = (): AuthHook => {
  const user = useAppSelector((state: any) => state.auth.user);
  const token = useAppSelector((state: any) => state.auth.token);
  const dispatch = useAppDispatch();

  const login = async (username: string, password: string) => {
    const { user, token } = await apiLogin(username, password);

    dispatch(actionLogin({ user, token }));
  };

  const logout = () => {
    dispatch(actionLogout());
  };

  const register = async (username: string, password: string, role: string) => {
    const { user, token } = await apiRegister(username, password, role);

    dispatch(actionLogin({ user, token }));
  };

  return {
    user,
    token,
    login,
    logout,
    register,
  };
};
