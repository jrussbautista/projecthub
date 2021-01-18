import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, makeStyles } from "@material-ui/core";
import ProjectList from "components/project/ProjectList";
import { Status } from "types/Status";
import { Project } from "types/Project";
import { ProjectService } from "services/project-service";
import { CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import queryString from "query-string";
import ProjectsLabel from "./ProjectsLabel";
import useLabels from "hooks/use-labels";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 30,
    marginBottom: 30,
  },
  loadingContainer: {
    marginTop: 30,
    textAlign: "center",
  },
  heading: {
    marginBottom: 20,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 30,
  },
}));

const Projects = () => {
  const [projectStatus, setProjectStatus] = useState<Status>("idle");
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const { labels, status: labelsStatus } = useLabels();
  const location = useLocation();
  const classes = useStyles();
  const { search: searchText } = queryString.parse(location.search);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setProjectStatus("idle");
        const results = await ProjectService.getProjects({
          labels: selectedLabels,
        });
        setProjects(results);
        setProjectStatus("success");
      } catch (error) {
        setProjectStatus("error");
      }
    };
    fetchProjects();
  }, [selectedLabels]);

  const handleSelectLabel = (selectedLabel: string) => {
    const isAlreadySelected = selectedLabels.some(
      (label) => label === selectedLabel
    );
    if (isAlreadySelected) {
      const filterSelectedLables = selectedLabels.filter(
        (label) => label !== selectedLabel
      );
      setSelectedLabels(filterSelectedLables);
    } else {
      setSelectedLabels([...selectedLabels, selectedLabel]);
    }
  };

  const renderProjectsSection = () => {
    if (projectStatus === "idle") {
      return (
        <div className={classes.loadingContainer}>
          <CircularProgress />
        </div>
      );
    }
    if (projectStatus === "error") {
      return (
        <Alert severity="error">
          Unable to get project details right now. Please try again later.
        </Alert>
      );
    }
    if (projects.length === 0) {
      return (
        <Typography variant="h6" className={classes.emptyText}>
          Projects is still empty.
        </Typography>
      );
    }
    return <ProjectList projects={projects} />;
  };

  return (
    <Container className={classes.container}>
      {searchText && (
        <Typography variant="h5" className={classes.heading}>
          Search results for <strong>{searchText}</strong>
        </Typography>
      )}

      {labelsStatus === "success" && (
        <ProjectsLabel
          labels={labels}
          onSelectLabel={handleSelectLabel}
          selectedLabels={selectedLabels}
        />
      )}

      {renderProjectsSection()}
    </Container>
  );
};

export default Projects;
