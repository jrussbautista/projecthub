import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { ProjectList } from "components/Project";
import { PROJECTS } from "data/mock-data";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Hero from "components/Hero";

const useStyles = makeStyles(() => ({
  loadMoreContainer: {
    marginTop: 40,
    textAlign: "center",
  },
  section: {
    marginTop: 30,
    marginBottom: 30,
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <Hero
        heading="Discover The Best New Dev Projects"
        description="ProjectHub is a community of developers to share & 
        discuss the latest projects and ideas. It is a place to discover and get  
        access to  new projects."
      />
      <Container>
        <div className={classes.section}>
          <Typography variant="h5" gutterBottom>
            Featured Projects
          </Typography>
          <ProjectList projects={PROJECTS.slice(0, 2)} />
        </div>
        <div className={classes.section}>
          <Typography variant="h5" gutterBottom>
            Latest Projects
          </Typography>
          <ProjectList projects={PROJECTS} />
        </div>
        <div className={classes.loadMoreContainer}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            disableElevation
          >
            Load More
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Home;
