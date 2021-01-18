import { db } from "lib/firebase";
import { Project } from "types/Project";
import { User } from "types/User";
import { USERS_COLLECTION, PROJECTS_COLLECTION } from "./service-constants";

const getUser = async (userId: string): Promise<User> => {
  const userRef = db.collection(USERS_COLLECTION).doc(userId);
  const getUserRef = await userRef.get();

  if (!getUserRef.exists) {
    throw new Error("User not found");
  }

  return {
    ...(getUserRef.data() as User),
    id: getUserRef.id,
  };
};

const getUserProjects = async (userId: string): Promise<Project[]> => {
  const projectsRef = db
    .collection(PROJECTS_COLLECTION)
    .where("user.id", "==", userId);
  const getProjectsRef = await projectsRef.get();

  return getProjectsRef.docs.map((project) => {
    return {
      ...(project.data() as Project),
      id: project.id,
    };
  });
};

export const UserService = {
  getUser,
  getUserProjects,
};
