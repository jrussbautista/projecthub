import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Project } from "types/Project";
import { Link } from "react-router-dom";

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
    <Link to={`/project/${project.id}`}>
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
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProjectCard;
