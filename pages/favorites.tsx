import { useEffect, useState } from "react";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FavoriteService } from "services/favorite-service";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { Project } from "interfaces/Project";
import FavoriteItem from "components/favorite/FavoriteCard";
import Image from "next/image";
import { useNotification, useAuth } from "contexts";
import Meta from "components/meta";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 20,
    marginTop: 20,
  },
  heading: {
    marginBottom: 20,
  },
  loadingContainer: {
    textAlign: "center",
    marginTop: 20,
  },
  emptyText: {
    marginTop: 40,
  },
  emptyContainer: {
    textAlign: "center",
  },
  emptyImage: {
    maxWidth: 300,
  },
  errorContainer: {
    marginBottom: 20,
  },
}));

const Favorites = () => {
  const classes = useStyles();

  const [status, setStatus] = useState("idle");
  const [favorites, setFavorites] = useState<Project[]>([]);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const { showNotification } = useNotification();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setStatus("idle");
        const results = await FavoriteService.getFavorites();
        setFavorites(results);
        setStatus("success");
      } catch (error) {
        console.log(error);
        setStatus("error");
      }
    };
    if (currentUser) {
      fetchFavorites();
    }
  }, [currentUser]);

  const handleRemove = async (id: string) => {
    try {
      setRemovingId(id);
      await FavoriteService.toggleFavorite(id);
      const filterFavorites = favorites.filter(
        (favorite) => favorite.id !== id
      );
      setFavorites(filterFavorites);
      showNotification("success", "Removed to favorites.");
    } catch (error) {
      showNotification(
        "error",
        "Unable to remove your favorite right now. Please try again later."
      );
      setRemovingId(null);
    }
  };

  if (status === "idle") {
    return (
      <Container className={classes.container}>
        <div className={classes.loadingContainer}>
          <CircularProgress size={30} />
        </div>
      </Container>
    );
  }

  if (status === "error") {
    return (
      <Container className={classes.container}>
        <Alert severity="error">
          Unable to load your favorites right now. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className={classes.container}>
      <Meta title="Favorites" />
      <Typography variant="h6" className={classes.heading}>
        My Favorites
      </Typography>
      {favorites.length > 0 ? (
        favorites.map((favorite) => (
          <FavoriteItem
            key={favorite.id}
            project={favorite}
            onRemove={handleRemove}
            removing={removingId === favorite.id}
          />
        ))
      ) : (
        <div className={classes.emptyContainer}>
          <Image
            alt="empty favorites"
            src="/images/empty.svg"
            width="300"
            height="300"
            className={classes.emptyImage}
          />

          <Typography variant="body1" className={classes.emptyText}>
            Your favorites is empty :(
          </Typography>
        </div>
      )}
    </Container>
  );
};

export default Favorites;
