import { db, postToJSON } from "lib/firebase";
import { Project } from "interfaces/Project";
import { User } from "interfaces/User";
import { USERS_COLLECTION, PROJECTS_COLLECTION } from "./service-constants";

const getUser = async (userId: string): Promise<User | null> => {
  const userRef = db.collection(USERS_COLLECTION).doc(userId);
  const getUserRef = await userRef.get();

  if (!getUserRef.exists) return null;

  const userDetails = postToJSON(getUserRef);

  return {
    ...(userDetails as User),
    id: getUserRef.id,
  };
};

const getUserProjects = async (userId: string): Promise<Project[]> => {
  const projectsRef = db
    .collection(PROJECTS_COLLECTION)
    .where("user.id", "==", userId);
  const getProjectsRef = await projectsRef
    .where("status", "==", "active")
    .get();

  return getProjectsRef.docs.map((project) => {
    const projectDetails = postToJSON(project);
    return {
      ...(projectDetails as Project),
      id: project.id,
    };
  });
};

export const UserService = {
  getUser,
  getUserProjects,
};
