import { Project } from "types/Project";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { ProjectList } from "components/project";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 30,
  },
}));

interface Props {
  projects: Project[];
}

const RelatedProjects: React.FC<Props> = ({ projects }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h5" gutterBottom>
        Related Projects
      </Typography>
      {projects.length > 0 ? (
        <ProjectList projects={projects} />
      ) : (
        <Typography variant="h5" gutterBottom>
          No related projects.
        </Typography>
      )}
    </div>
  );
};

export default RelatedProjects;
