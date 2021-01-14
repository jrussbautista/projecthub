import { useEffect, useState } from "react";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FavoriteService } from "services/favorites-service";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { Project } from "types/Project";
import { ProjectList } from "components/project";

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
}));

const Favorites = () => {
  const classes = useStyles();

  const [status, setStatus] = useState("idle");
  const [favorites, setFavorites] = useState<Project[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setStatus("idle");
        const results = await FavoriteService.getFavorites();
        setFavorites(results);
        setStatus("success");
      } catch (error) {
        setStatus("error");
        console.error(error);
      }
    };
    fetchFavorites();
  }, []);

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
          Unable to load user details right now. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className={classes.container}>
      <Typography variant="h6" className={classes.heading}>
        My Favorites
      </Typography>
      <ProjectList projects={favorites} />
    </Container>
  );
};

export default Favorites;
