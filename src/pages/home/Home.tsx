import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { ProjectList } from "components/project";
import Button from "@material-ui/core/Button";
import { useAuth, useModal } from "contexts";
import Hero from "components/hero";
import { HomeData } from "types/HomeData";
import { HomeService } from "services/home-service";
import CircularProgress from "@material-ui/core/CircularProgress";
import Meta from "components/meta";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  loadMoreContainer: {
    marginTop: 40,
    textAlign: "center",
  },
  btnJoin: {
    marginTop: 30,
  },
  section: {
    marginTop: 30,
    marginBottom: 30,
  },
  loadingContainer: {
    marginTop: 20,
    textAlign: "center",
  },
}));

const Home = () => {
  const classes = useStyles();
  const history = useHistory();

  const { isAuthenticated } = useAuth();
  const { openModal } = useModal();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [homeData, setHomeData] = useState<HomeData | null>(null);

  const latestProjects = homeData?.latestProjects ?? [];
  const featuredProjects = homeData?.featuredProjects ?? [];

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const results = await HomeService.getHomeData();
        setHomeData(results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const handleClickPostProject = () => {
    if (isAuthenticated) {
      return history.push("/create");
    }
    openModal("SIGN_UP_VIEW");
  };

  return (
    <>
      <Meta title="Home" />
      <Hero
        heading="Discover The Best New Dev Projects"
        description="ProjectHub is a community of developers to share & 
        discuss the latest projects and ideas. It is a place to discover and get  
        access to  new projects."
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          disableElevation
          className={classes.btnJoin}
          onClick={handleClickPostProject}
        >
          Post your project
        </Button>
      </Hero>
      <Container>
        {error && (
          <Alert severity="error">
            Something went wrong. Please try again later.
          </Alert>
        )}
        {loading || error ? (
          <div className={classes.loadingContainer}>
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className={classes.section}>
              <Typography variant="h5" gutterBottom>
                Featured Projects
              </Typography>
              <ProjectList projects={featuredProjects} />
            </div>
            <div className={classes.section}>
              <Typography variant="h5" gutterBottom>
                Latest Projects
              </Typography>
              <ProjectList projects={latestProjects} />
            </div>
            <div className={classes.loadMoreContainer}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                disableElevation
                component={Link}
                to="/projects"
              >
                View All Projects
              </Button>
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default Home;
