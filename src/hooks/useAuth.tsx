import { useAppSelector, useAppDispatch } from "./index";

import {
  login as actionLogin,
  logout as actionLogout,
  deposit as actionDeposit,
  resetDeposit as actionResetDeposit,
} from "../reducers/authSlice";
import {
  login as apiLogin,
  register as apiRegister,
  updateDeposit as apiUpdateDeposit,
  resetDeposit as apiResetDeposit,
} from "../services/api";

interface AuthHook {
  user: any | null;
  token: string | null;
  deposit: number;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, password: string, role: string) => Promise<void>;
  addDeposit: (amount: number) => Promise<void>;
  resetDeposit: () => Promise<void>;
}

export const useAuth = (): AuthHook => {
  const user = useAppSelector((state: any) => state.auth.user);
  const token = useAppSelector((state: any) => state.auth.token);
  const deposit = useAppSelector((state: any) => state.auth.deposit);
  const dispatch = useAppDispatch();

  const login = async (username: string, password: string) => {
    const { user, token, deposit } = await apiLogin(username, password);

    dispatch(actionLogin({ user, token, deposit }));
  };

  const logout = () => {
    dispatch(actionLogout());
  };

  const register = async (username: string, password: string, role: string) => {
    const { user, token, deposit } = await apiRegister(
      username,
      password,
      role
    );

    dispatch(actionLogin({ user, token, deposit }));
  };

  const addDeposit = async (amount: number) => {
    const { deposit } = await apiUpdateDeposit(amount);
    dispatch(actionDeposit(deposit));
  };

  const resetDeposit = async () => {
    await apiResetDeposit();
    dispatch(actionResetDeposit());
  };

  return {
    user,
    token,
    deposit,
    addDeposit,
    resetDeposit,
    login,
    logout,
    register,
  };
};
