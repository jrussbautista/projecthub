import { auth, db, timestamp } from "lib/firebase";
import { AddProject, Project } from "types/Project";
import { FirebaseStorage } from "lib/firebase-storage";
import { PROJECTS_COLLECTION, FAVORITES_COLLECTION } from "./service-constants";

const RELATED_PROJECTS_LIMIT = 4;
const PROJECTS_LIMIT = 20;

const addProject = async ({
  title,
  description,
  website_link,
  github_link,
  labels = [],
  image_file,
}: AddProject) => {
  const currentUser = auth.currentUser;

  if (!currentUser) throw new Error("Please log in first.");

  const { uid, displayName, photoURL } = currentUser;

  const projectRef = db.collection(PROJECTS_COLLECTION);

  const { downloadUrl } = await FirebaseStorage.uploadFile(image_file);

  const newProject = {
    title,
    description,
    website_link,
    github_link,
    labels,
    image_url: downloadUrl,
    created_at: timestamp,
    updated_at: timestamp,
    user: {
      id: uid,
      name: displayName as string,
      photo_url: photoURL as string,
    },
  };

  return projectRef.add(newProject);
};

const getProjects = async ({
  labels = [],
  search = "",
  lastVisible = null,
}: {
  labels?: string[];
  search?: string;
  lastVisible?: Object | null;
}) => {
  let query;
  let orderBy = "created_at";

  query = db.collection(PROJECTS_COLLECTION);

  if (labels.length > 0) {
    query = query.where("labels", "array-contains-any", labels);
  }

  if (search) {
    orderBy = "title";
    query = query
      .orderBy(orderBy)
      .startAt(search)
      .endAt(search + "~");
  } else {
    query = query.orderBy(orderBy);
  }

  if (lastVisible) {
    query = query.startAfter(lastVisible);
  }

  const getProjects = await query.limit(PROJECTS_LIMIT).get();

  if (getProjects.docs.length === 0) return null;

  const lastItemVisible = getProjects.docs[getProjects.docs.length - 1];

  const data = getProjects.docs.map((project) => {
    return {
      ...(project.data() as Project),
      id: project.id,
    };
  });

  return {
    data,
    lastItemVisible,
  };
};

export const getProject = async (projectId: string): Promise<Project> => {
  const currentUser = auth.currentUser;

  const projectRef = db.collection(PROJECTS_COLLECTION).doc(projectId);
  const getProject = await projectRef.get();

  if (!getProject.exists) throw new Error("Project not found");

  let is_favorite = false;

  if (currentUser) {
    const favoriteRef = db
      .collection(FAVORITES_COLLECTION)
      .where("user_id", "==", currentUser.uid)
      .where("project_id", "==", projectId);
    const getFavorite = await favoriteRef.get();
    if (!getFavorite.empty) {
      is_favorite = true;
    }
  }

  return {
    ...(getProject.data() as Project),
    is_favorite,
    id: getProject.id,
  };
};

const getRelatedProjects = async (labels: string[]) => {
  let query;

  query = db.collection(PROJECTS_COLLECTION);

  if (labels.length > 0) {
    query = query.where("labels", "array-contains-any", labels);
  }

  const getProjectsRef = await query.limit(RELATED_PROJECTS_LIMIT).get();

  return getProjectsRef.docs.map((project) => {
    return {
      ...(project.data() as Project),
      id: project.id,
    };
  });
};

export const ProjectService = {
  addProject,
  getProjects,
  getProject,
  getRelatedProjects,
};
