import { auth } from "lib/firebase";
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthService } from "services/authService";
import { Login, SignUp } from "types/Auth";
import { User } from "types/User";
import reducer from "./authReducer";

interface State {
  isAuthenticated: boolean;
  isLoading: boolean;
  currentUser: User | null;
  login(value: Login): void;
  signUp(value: SignUp): void;
  logout(): void;
}

const defaultValue = {
  isAuthenticated: false,
  isLoading: true,
  currentUser: null,
};

const AuthContext = createContext<State>({
  ...defaultValue,
  login: () => null,
  signUp: () => null,
  logout: () => null,
});

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultValue);
  const history = useHistory();

  const setCurrentUser = (user: any) => {
    const userDetails: User = {
      id: user.uid,
      name: user.displayName as string,
      email: user.email as string,
      email_verified: user.emailVerified,
      photo_url: user.photoURL,
    };
    dispatch({ type: "SET_CURRENT_USER", payload: { user: userDetails } });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        return setCurrentUser(user);
      }
      dispatch({ type: "LOG_OUT" });
    });
    return () => unsubscribe();
  }, []);

  const login = async ({ email, password }: Login) => {
    const user = await AuthService.login({ email, password });
    setCurrentUser(user);
    history.push("/profile");
  };

  const signUp = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    const user = await AuthService.signUp({ name, email, password });
    setCurrentUser(user);
    history.push("/profile");
  };

  const logout = async () => {
    await AuthService.logout();
    dispatch({ type: "LOG_OUT" });
    history.push("/");
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
