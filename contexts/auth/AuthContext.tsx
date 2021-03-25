import { auth } from "lib/firebase";
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthService } from "services/auth-service";
import { Login, SignUp, UpdateProfile, Provider } from "interfaces/Auth";
import { User } from "interfaces/User";
import reducer from "./auth-reducer";

interface State {
  isAuthenticated: boolean;
  isLoading: boolean;
  currentUser: User | null;
  login(value: Login): Promise<void>;
  socialLogin(provider: Provider): Promise<void>;
  signUp(value: SignUp): Promise<void>;
  updateProfile(value: UpdateProfile): Promise<void>;
  sendPasswordReset(email: string): Promise<void>;
  logout(): Promise<void>;
}

const defaultValue = {
  isAuthenticated: false,
  isLoading: true,
  currentUser: null,
};

const AuthContext = createContext<State>({
  ...defaultValue,
  login: async () => {},
  signUp: async () => {},
  logout: async () => {},
  socialLogin: async () => {},
  updateProfile: async () => {},
  sendPasswordReset: async () => {},
});

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultValue);

  const router = useRouter();

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
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        dispatch({ type: "LOG_OUT" });
      }
    });
    return () => unsubscribe();
  }, []);

  const redirect = (userId: string) => {
    const { pathname } = router;
    if (pathname === "/") {
      const url = `/user/${userId}`;
      router.push(url);
    }
  };

  const login = async ({ email, password }: Login) => {
    const user = await AuthService.login({ email, password });
    setCurrentUser(user);
    redirect(user?.uid as string);
  };

  const socialLogin = async (provider: Provider) => {
    const user = await AuthService.socialLogin(provider);
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

  const sendPasswordReset = async (email: string) => {
    return AuthService.sendResetPasswordEmail(email);
  };

  const logout = async () => {
    await AuthService.logout();
    dispatch({ type: "LOG_OUT" });
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        socialLogin,
        signUp,
        updateProfile,
        sendPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
