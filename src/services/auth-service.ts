import { auth, db, timestamp, firebase } from "lib/firebase";
import { UpdateProfile, SignUp, ChangePassword, Provider } from "types/Auth";
import { USERS_COLLECTION } from "./service-constants";

const createUser = async (user: any) => {
  if (!user) return;

  const { uid, email, photoURL, emailVerified, displayName } = user;

  const newUser = {
    name: displayName,
    email,
    photo_url: photoURL,
    created_at: timestamp,
    updated_at: timestamp,
    email_verified: emailVerified,
  };

  await db.collection(USERS_COLLECTION).doc(uid).set(newUser);

  return user;
};

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
  const { user } = await auth.createUserWithEmailAndPassword(email, password);
  if (user) {
    await user.updateProfile({
      displayName: name,
    });
    return createUser(user);
  }
};

const socialLogin = async (provider: Provider) => {
  let selectedProvider: firebase.auth.AuthProvider;

  switch (provider) {
    case "google":
      selectedProvider = new firebase.auth.GoogleAuthProvider();
      break;
    default:
      throw new Error("Unknown provider");
  }

  const { user, additionalUserInfo } = await auth.signInWithPopup(
    selectedProvider
  );
  if (additionalUserInfo?.isNewUser) {
    await createUser(user);
  }
};

const reauthenticate = (currentPassword: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Please login first");

  const { email } = user;

  const cred = firebase.auth.EmailAuthProvider.credential(
    email as string,
    currentPassword
  );
  return user.reauthenticateWithCredential(cred);
};

const updateProfile = async ({ name, email, password }: UpdateProfile) => {
  const { currentUser } = auth;
  if (!currentUser) throw new Error("Please login first");

  if (currentUser.email !== email) {
    if (!password)
      throw new Error("Password is required to update your profile");
    await reauthenticate(password);
    await currentUser?.updateEmail(email);
  }

  if (currentUser.displayName !== name) {
    await currentUser?.updateProfile({ displayName: name });
  }

  // update only if email or displayName has changed
  if (currentUser.email !== email || currentUser.displayName !== name) {
    return db
      .collection(USERS_COLLECTION)
      .doc(currentUser.uid)
      .update({ name, email });
  }
};

const changePassword = async ({
  oldPassword,
  newPassword,
  confirmNewPassword,
}: ChangePassword) => {
  const { currentUser } = auth;

  if (!currentUser) throw new Error("Please login first");

  if (newPassword !== confirmNewPassword)
    throw new Error("New password does not match with confirm new password");

  await reauthenticate(oldPassword);
  return currentUser.updatePassword(newPassword);
};

const logout = async () => {
  return auth.signOut();
};

export const AuthService = {
  login,
  logout,
  signUp,
  socialLogin,
  updateProfile,
  changePassword,
};
