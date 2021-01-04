import { Project } from "types/Project";
import Grid from "@material-ui/core/Grid";
import ProjectCard from "../ProjectCard";

interface Props {
  projects: Project[];
}

const ProjectList: React.FC<Props> = ({ projects }) => {
  return (
    <Grid container spacing={3}>
      {projects.map((project) => (
        <Grid item xs={12} sm={3} key={project.id}>
          <ProjectCard project={project} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectList;
