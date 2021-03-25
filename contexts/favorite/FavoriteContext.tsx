import React, { createContext, useState, useContext, useEffect } from "react";
import { Project } from "interfaces/Project";
import { useAuth } from "contexts/auth/AuthContext";
import { FavoriteService } from "services/favorite-service";
import { Status } from "interfaces/Status";

interface State {
  status: Status;
  favorites: Project[];
  toggleFavorite(project: Project): void;
}

const defaultValue: State = {
  favorites: [],
  status: "idle",
  toggleFavorite: () => null,
};

const FavoriteContext = createContext<State>({
  ...defaultValue,
});

export const FavoriteProvider: React.FC = ({ children }) => {
  const [status, setStatus] = useState(defaultValue.status);
  const [favorites, setFavorites] = useState(defaultValue.favorites);

  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      setStatus("idle");
      FavoriteService.getFavorites()
        .then((results) => {
          setFavorites(results);
          setStatus("success");
        })
        .catch(() => setStatus("error"));
    }
  }, [currentUser]);

  const toggleFavorite = async (project: Project) => {
    await FavoriteService.toggleFavorite(project.id);
    const isAlreadyFavorited = favorites.some(
      (favorite) => favorite.id === project.id
    );
    if (isAlreadyFavorited) {
      const filterFavorites = favorites.filter(
        (favorite) => favorite.id !== project.id
      );
      setFavorites(filterFavorites);
    } else {
      setFavorites([...favorites, project]);
    }
  };

  return (
    <FavoriteContext.Provider value={{ status, favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);
