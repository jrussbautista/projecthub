import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Project } from "interfaces/Project";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

interface Props {
  project: Project;
}

const ProjectCard: React.FC<Props> = ({ project }) => {
  const classes = useStyles();

  return (
    <Link href={`/projects/${project.id}`}>
      <a>
        <Card>
          <CardMedia
            className={classes.media}
            image={project.image_url}
            title={project.title}
          />
          <CardContent>
            <div className={classes.info}>
              <Typography variant="body1" color="textSecondary" component="p">
                {project.title}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
};

export default ProjectCard;
