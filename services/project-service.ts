import { auth, db, postToJSON, timestamp, fromMillis } from "lib/firebase";
import { AddProject, Project } from "interfaces/Project";
import { FirebaseStorage } from "lib/firebase-storage";
import { PROJECTS_COLLECTION } from "./service-constants";

const RELATED_PROJECTS_LIMIT = 4;
const PROJECTS_LIMIT = 20;

const addProject = async ({
  title,
  description,
  website_link,
  github_link,
  category,
  image_file,
}: AddProject) => {
  const currentUser = auth.currentUser;

  if (!currentUser) throw new Error("Please log in first.");

  const { uid, displayName, photoURL } = currentUser;

  const projectRef = db.collection(PROJECTS_COLLECTION);

  const { downloadUrl } = await FirebaseStorage.uploadFile(image_file, uid);

  const newProject = {
    title,
    description,
    website_link,
    github_link,
    category,
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
  category = "",
  search = "",
}: {
  category?: string;
  search?: string;
}) => {
  let query;
  let orderBy = "created_at";

  query = db.collection(PROJECTS_COLLECTION);

  if (category.length > 0) {
    query = query.where("category", "==", category);
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

  const getProjects = await query.limit(PROJECTS_LIMIT).get();

  return getProjects.docs.map((project) => {
    const projectDetails = postToJSON(project);

    return {
      ...(projectDetails as Project),
      id: project.id,
    };
  });
};

const getMoreProjects = async ({
  search = "",
  lastProject,
  category,
}: {
  search?: string;
  lastProject: Project;
  category?: string;
}) => {
  const cursor =
    typeof lastProject.created_at === "number"
      ? fromMillis(lastProject.created_at)
      : lastProject.created_at;

  let query;
  let orderBy = "created_at";

  query = db.collection(PROJECTS_COLLECTION);

  if (category) {
    query = query.where("category", "==", category);
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

  query = query.startAfter(cursor);

  const getProjects = await query.limit(PROJECTS_LIMIT).get();

  if (getProjects.docs.length === 0) return null;

  return getProjects.docs.map((project) => {
    const projectDetails = postToJSON(project);

    return {
      ...(projectDetails as Project),
      id: project.id,
    };
  });
};

export const getProject = async (
  projectId: string
): Promise<Project | null> => {
  const projectRef = db.collection(PROJECTS_COLLECTION).doc(projectId);
  const getProject = await projectRef.get();

  if (!getProject.exists) return null;
  const project = postToJSON(getProject);

  return {
    ...(project as Project),
    id: getProject.id,
  };
};

const getRelatedProjects = async (category: string) => {
  let query;

  query = db.collection(PROJECTS_COLLECTION);

  if (category) {
    query = query.where("category", "==", category);
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
  getMoreProjects,
};
