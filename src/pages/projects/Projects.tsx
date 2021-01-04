import React from "react";
import { Container, Typography, makeStyles } from "@material-ui/core";
import ProjectList from "components/project/ProjectList";
import { PROJECTS } from "data/mock-data";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 30,
    marginBottom: 30,
  },
  heading: {
    marginBottom: 20,
  },
}));

const Projects = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography variant="h5" className={classes.heading}>
        Search results for
      </Typography>
      <ProjectList projects={PROJECTS.slice(0, 2)} />
    </Container>
  );
};

export default Projects;
