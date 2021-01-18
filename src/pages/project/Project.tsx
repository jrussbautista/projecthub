import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PROJECTS } from "data/mock-data";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { ProjectList } from "components/project";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FavoriteButton from "components/favorite/FavoriteButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { ProjectService } from "services/project-service";
import { FavoriteService } from "services/favorites-service";
import { Project } from "types/Project";
import { useAuth, useModal } from "contexts";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 30,
    marginTop: 30,
  },
  cardImgContainer: {
    width: "100%",
  },
  media: {
    height: 0,
    paddingTop: "40%",
  },
  section: {
    marginTop: 30,
    marginBottom: 30,
  },
  cardDetails: {
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    marginRight: 15,
  },
  loadingContainer: {
    textAlign: "center",
  },
}));

interface Params {
  id: string;
}

const ProjectView = () => {
  const classes = useStyles();

  const { id } = useParams<Params>();

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState(null);

  const { isAuthenticated } = useAuth();
  const { openModal } = useModal();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setProject(null);
        setLoading(true);
        const result = await ProjectService.getProject(id);
        setProject(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setError(null);
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      return openModal("LOGIN_VIEW");
    }
    if (!project) return;
    setProject({ ...project, is_favorite: !project.is_favorite });
    await FavoriteService.toggleFavorite(id);
  };

  if (loading) {
    return (
      <Container className={classes.container}>
        <div className={classes.loadingContainer}>
          <CircularProgress />
        </div>
      </Container>
    );
  }

  if (error || !project) {
    return (
      <Container className={classes.container}>
        <Alert severity="error">
          Unable to get project details right now. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className={classes.container}>
      <Card>
        <div className={classes.cardImgContainer}>
          <CardMedia
            className={classes.media}
            image={project.image_url}
            title={project.title}
          />
        </div>
        <div className={classes.cardDetails}>
          <div>
            <Typography gutterBottom variant="h4">
              {project.title}
            </Typography>
            <Typography gutterBottom variant="h5" color="textSecondary">
              {project.description}
            </Typography>
            <div></div>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              disableElevation
            >
              Website
            </Button>
            <Button variant="contained" color="default" disableElevation>
              Github
            </Button>
          </div>
          <div>
            <FavoriteButton
              isFavorite={Boolean(project.is_favorite)}
              onClick={handleToggleFavorite}
            />
          </div>
        </div>
      </Card>
      <div className={classes.section}>
        <Typography variant="h5" gutterBottom>
          Related Projects
        </Typography>
        <ProjectList projects={PROJECTS.slice(0, 4)} />
      </div>
    </Container>
  );
};

export default ProjectView;
