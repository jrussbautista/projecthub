import { db } from "lib/firebase";

const getUser = async (id: string) => {
  const userRef = db.collection("users").doc(id);
  const getUserRef = await userRef.get();

  if (!getUserRef.exists) {
    throw new Error("User not found");
  }

  return {
    id,
    ...getUserRef.data(),
  };
};

export const UserService = {
  getUser,
};
