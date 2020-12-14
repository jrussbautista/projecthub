import { auth, db, timestamp } from "lib/firebase";
import { SignUp } from "types/Auth";

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    return user;
  } catch (error) {
    const errorCode = error.code;
    let errorMessage = "";
    switch (errorCode) {
      case "auth/invalid-email":
        errorMessage = "Email is invalid";
        break;
      case "auth/user-not-found":
      case "auth/wrong-password":
        errorMessage = "Email or password is incorrect";
        break;
      case "auth/user-disabled":
        errorMessage = "Your account has been disabled";
        break;
      default:
        errorMessage = "Unable to login right now. Please try again later";
    }
    throw new Error(errorMessage);
  }
};

const signUp = async ({ name, email, password }: SignUp) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    if (!user) {
      throw new Error("Error in creating user");
    }

    const { uid } = user;
    const newUser = {
      name,
      email,
      photo_url: user.photoURL,
      created_at: timestamp,
      updated_at: timestamp,
    };

    await db.collection("users").doc(uid).set(newUser);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const logout = async () => {
  try {
    return auth.signOut();
  } catch (error) {
    throw new Error(error);
  }
};

export const AuthService = {
  login,
  logout,
  signUp,
};
