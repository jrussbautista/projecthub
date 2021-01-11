import { auth, db, timestamp, increment } from "lib/firebase";
import { AddProject, Project, Field } from "types/Project";

const PROJECT_COLLECTION = "projects";
const FAVORITES_COLLECTION = "favorites";

const addProject = ({
  title,
  description,
  website_link,
  github_link,
  labels = [],
  image,
}: AddProject) => {
  const currentUser = auth.currentUser;

  if (!currentUser) throw new Error("Please log in first.");

  const { uid, displayName, photoURL } = currentUser;

  const projectRef = db.collection(PROJECT_COLLECTION);

  // TODO: Upload image to firebase storage
  const image_url = image;

  const newProject = {
    title,
    description,
    website_link,
    github_link,
    labels,
    image_url,
    created_at: timestamp,
    updated_at: timestamp,
    user: {
      id: uid,
      name: displayName,
      image_url: photoURL,
    },
  };

  return projectRef.add(newProject);
};

const getProjects = async (
  field: Field = "all_projects"
): Promise<Project[]> => {
  const currentUser = auth.currentUser;

  if (!currentUser) throw new Error("Please log in first.");
  const { uid } = currentUser;

  let projectsRef = db.collection(PROJECT_COLLECTION);

  switch (field) {
    case "my_projects":
      projectsRef.where("user.id", "==", uid);
      break;
  }

  const getProjects = await projectsRef.get();

  return getProjects.docs.map((project) => {
    const {
      title,
      description,
      image_url,
      github_link,
      website_link,
      labels,
      updated_at,
      created_at,
    } = project.data() as Project;

    return {
      id: project.id,
      labels,
      title,
      description,
      image_url,
      github_link,
      website_link,
      updated_at,
      created_at,
    };
  });
};

export const getProject = async (projectId: string): Promise<Project> => {
  const currentUser = auth.currentUser;

  const projectRef = db.collection(PROJECT_COLLECTION).doc(projectId);
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

  const {
    title,
    description,
    image_url,
    github_link,
    website_link,
    labels,
    created_at,
    updated_at,
  } = getProject.data() as Project;

  return {
    id: getProject.id,
    labels,
    title,
    description,
    image_url,
    github_link,
    website_link,
    is_favorite,
    created_at,
    updated_at,
  };
};

export const toggleFavorite = async (projectId: string) => {
  const currentUser = auth.currentUser;

  if (!currentUser) throw new Error("Please log in first.");
  const { uid } = currentUser;

  const projectRef = db.collection(PROJECT_COLLECTION).doc(projectId);
  const getProject = await projectRef.get();

  if (!getProject.exists) throw new Error("Project not found");

  const batch = db.batch();

  const favoriteRef = db
    .collection(FAVORITES_COLLECTION)
    .where("user_id", "==", uid)
    .where("project_id", "==", projectId);
  const getFavorite = await favoriteRef.get();

  if (getFavorite.empty) {
    // add to favorite collection
    const newFavorite = {
      user_id: uid,
      project_id: projectId,
    };
    const addFavoriteRef = db.collection(FAVORITES_COLLECTION).doc();

    batch.set(addFavoriteRef, newFavorite);
    batch.update(projectRef, { favorites_count: increment(1) });

    return batch.commit();
  }

  const { id } = getFavorite.docs[0];

  // delete to favorite collection
  const deleteFavoriteRef = db.collection(FAVORITES_COLLECTION).doc(id);
  batch.update(projectRef, { favorites_count: increment(-1) });
  batch.delete(deleteFavoriteRef);

  return batch.commit();
};

export const ProjectService = {
  addProject,
  getProjects,
  getProject,
  toggleFavorite,
};
