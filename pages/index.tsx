import Router from "next/router";
import Link from "next/link";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import ProjectList from "components/project/ProjectList";
import Button from "@material-ui/core/Button";
import { useAuth, useModal } from "contexts";
import Hero from "components/hero";
import { HomeService } from "services/home-service";
import Meta from "components/meta";
import { makeStyles } from "@material-ui/core/styles";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";

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

const Home = ({
  latestProjects,
  featuredProjects,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const classes = useStyles();

  const { isAuthenticated } = useAuth();
  const { openModal } = useModal();

  const handleClickPostProject = () => {
    if (isAuthenticated) {
      return Router.push("/projects/create");
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
          <Link href="/projects" passHref>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disableElevation
            >
              View All Projects
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await HomeService.getHomeData();

  const latestProjects = res?.latestProjects ?? [];
  const featuredProjects = res?.featuredProjects ?? [];

  return {
    props: {
      latestProjects,
      featuredProjects,
    },
  };
};
