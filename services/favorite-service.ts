import { auth, db, increment } from "lib/firebase";
import { Project } from "interfaces/Project";
import { PROJECTS_COLLECTION, FAVORITES_COLLECTION } from "./service-constants";

const checkFavorite = async (projectId: string) => {
  const { currentUser } = auth;
  if (currentUser) {
    const favoriteRef = db
      .collection(FAVORITES_COLLECTION)
      .where("user_id", "==", currentUser.uid)
      .where("project_id", "==", projectId);
    const getFavorite = await favoriteRef.get();

    if (!getFavorite.empty) return true;
    return false;
  } else {
    return false;
  }
};

const getFavorites = async () => {
  const currentUser = auth.currentUser;

  if (!currentUser) throw new Error("Please log in first.");
  const { uid } = currentUser;

  const favoritesRef = db.collection(FAVORITES_COLLECTION);
  const getFavoritesRef = await favoritesRef.where("user_id", "==", uid).get();

  const favoritesDocs = getFavoritesRef.docs.map((favorite) => {
    return {
      id: favorite.id,
      project_id: favorite.data().project_id,
    };
  });

  return Promise.all(
    favoritesDocs.map(async (favorite) => {
      const projectRef = db
        .collection(PROJECTS_COLLECTION)
        .doc(favorite.project_id);
      const getProjectRef = await projectRef.get();
      return {
        ...(getProjectRef.data() as Project),
        id: favorite.project_id,
      };
    })
  );
};

const toggleFavorite = async (projectId: string) => {
  const currentUser = auth.currentUser;

  if (!currentUser) throw new Error("Please log in first.");
  const { uid } = currentUser;

  const projectRef = db.collection(PROJECTS_COLLECTION).doc(projectId);

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

export const FavoriteService = {
  checkFavorite,
  toggleFavorite,
  getFavorites,
};
