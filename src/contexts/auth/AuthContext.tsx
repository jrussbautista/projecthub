import { auth } from "lib/firebase";
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AuthService } from "services/auth-service";
import { Login, SignUp, UpdateProfile } from "types/Auth";
import { User } from "types/User";
import reducer from "./authReducer";

interface State {
  isAuthenticated: boolean;
  isLoading: boolean;
  currentUser: User | null;
  login(value: Login): void;
  signUp(value: SignUp): void;
  updateProfile(value: UpdateProfile): void;
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
  updateProfile: () => null,
});

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultValue);
  const history = useHistory();
  const location = useLocation();

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

  const redirect = (userId: string) => {
    const { pathname } = location;
    if (pathname === "/") {
      const url = `/user/${userId}`;
      history.push(url);
    }
  };

  const login = async ({ email, password }: Login) => {
    const user = await AuthService.login({ email, password });
    setCurrentUser(user);
    redirect(user?.uid as string);
  };

  const signUp = async ({ name, email, password }: SignUp) => {
    const user = await AuthService.signUp({ name, email, password });
    setCurrentUser(user);
    redirect(user?.uid as string);
  };

  const updateProfile = async ({ name, email, password }: UpdateProfile) => {
    await AuthService.updateProfile({ name, email, password });
    const updatedUser = {
      ...state.currentUser,
      displayName: name,
      email,
    };
    setCurrentUser(updatedUser);
  };

  const logout = async () => {
    await AuthService.logout();
    dispatch({ type: "LOG_OUT" });
    history.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ ...state, login, logout, signUp, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
