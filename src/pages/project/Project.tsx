import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProjectService } from "services/project-service";
import { FavoriteService } from "services/favorites-service";
import { Project } from "types/Project";
import { useAuth, useModal, useNotification } from "contexts";
import { Status } from "types/Status";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import FavoriteButton from "components/favorite/FavoriteButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import UserDetails from "./UserDetails";
import RelatedProjects from "./RelatedProjects";
import { makeStyles } from "@material-ui/core/styles";

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
    marginTop: 30,
  },
  description: {
    marginBottom: 20,
  },
}));

interface Params {
  id: string;
}

const ProjectView = () => {
  const classes = useStyles();

  const { id } = useParams<Params>();

  const [projectStatus, setProjectStatus] = useState<Status>("idle");
  const [relatedProjectsStatus, setRelatedProjectsStatus] = useState<Status>(
    "idle"
  );
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const { isAuthenticated } = useAuth();
  const { openModal } = useModal();
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setProject(null);
        setProjectStatus("idle");
        const result = await ProjectService.getProject(id);
        setIsFavorite(Boolean(result.is_favorite));
        setProject(result);
        setProjectStatus("success");
      } catch (error) {
        setProjectStatus("error");
      }
    };
    fetchProject();
  }, [id]);

  useEffect(() => {
    const fetchRelatedProjects = async (labels: string[]) => {
      try {
        setRelatedProjectsStatus("idle");
        const results = await ProjectService.getRelatedProjects(labels);
        setRelatedProjects(results);
        setRelatedProjectsStatus("success");
      } catch (error) {
        setRelatedProjectsStatus("error");
      }
    };

    if (project) {
      fetchRelatedProjects(project.labels);
    }
  }, [project]);

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      return openModal("LOGIN_VIEW");
    }
    if (!project) return;

    try {
      setIsFavorite(!isFavorite);
      await FavoriteService.toggleFavorite(id);
      const favoriteMessage = isFavorite
        ? "Removed to favorites!"
        : "Added to favorites";
      showNotification("success", favoriteMessage);
    } catch (error) {
      showNotification(
        "error",
        "Unable to toggle favorite right now. Please try again later."
      );
    }
  };

  if (projectStatus === "idle") {
    return (
      <Container className={classes.container}>
        <div className={classes.loadingContainer}>
          <CircularProgress />
        </div>
      </Container>
    );
  }

  if (projectStatus === "error" || !project) {
    return (
      <Container className={classes.container}>
        <Alert severity="error">
          Unable to get project details right now. Please try again later.
        </Alert>
      </Container>
    );
  }

  const renderRelatedProjectsSection = () => {
    if (relatedProjectsStatus === "idle") {
      return (
        <div className={classes.loadingContainer}>
          <CircularProgress />
        </div>
      );
    }

    if (relatedProjectsStatus === "error") {
      return (
        <Alert severity="error">
          Unable to get related project details right now. Please try again
          later.
        </Alert>
      );
    }

    return <RelatedProjects projects={relatedProjects} />;
  };

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
            <Typography gutterBottom variant="h5">
              {project.title}
            </Typography>

            <UserDetails user={project.user} />

            <Typography
              gutterBottom
              variant="h6"
              color="textSecondary"
              className={classes.description}
            >
              {project.description}
            </Typography>

            {project.website_link && (
              <Button
                href={project.website_link}
                className={classes.button}
                variant="contained"
                color="primary"
                disableElevation
              >
                Website
              </Button>
            )}

            {project.github_link && (
              <Button
                href={project.github_link}
                variant="contained"
                color="default"
                disableElevation
              >
                Github
              </Button>
            )}
          </div>
          <div>
            <FavoriteButton
              isFavorite={isFavorite}
              onClick={handleToggleFavorite}
            />
          </div>
        </div>
      </Card>
      {renderRelatedProjectsSection()}
    </Container>
  );
};

export default ProjectView;
