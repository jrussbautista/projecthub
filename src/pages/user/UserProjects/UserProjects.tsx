import { Typography } from "@material-ui/core";
import { ProjectList } from "components/project";
import { Project } from "types/Project";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 20,
    marginTop: 20,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 30,
  },
  heading: {
    marginBottom: 20,
  },
}));

interface Props {
  projects: Project[];
}

const UserProjects: React.FC<Props> = ({ projects }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h5" className={classes.heading}>
        Projects
      </Typography>
      {projects.length > 0 ? (
        <ProjectList projects={projects} />
      ) : (
        <Typography variant="h6" className={classes.emptyText}>
          Projects is still empty.
        </Typography>
      )}
    </div>
  );
};

export default UserProjects;
