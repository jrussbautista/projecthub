import { Project } from "types/Project";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";

interface Props {
  project: Project;
  onRemove(id: string): void;
  removing: boolean;
}

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: 20,
    [theme.breakpoints.up("md")]: {
      display: "flex",
      flexWrap: "wrap",
    },
  },
  cardAction: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 100,
      alignItems: "center",
      justifyContent: "center",
    },
  },
  image: {
    paddingTop: "56.25%", // 16:9
    height: 0,
    [theme.breakpoints.up("md")]: {
      width: 250,
      height: 150,
      paddingTop: 0,
    },
  },
  content: {
    flex: 1,
  },
  removing: {
    opacity: 0.5,
    pointerEvents: "none",
  },
}));

const FavoriteItem: React.FC<Props> = ({ project, onRemove, removing }) => {
  const classes = useStyles();

  return (
    <Card className={`${classes.card} ${removing ? classes.removing : ""}`}>
      <Link to={`/project/${project.id}`}>
        <CardMedia
          image={project.image_url}
          title={project.title}
          className={classes.image}
        />
      </Link>
      <CardContent className={classes.content}>
        <Link to={`/project/${project.id}`}>
          <Typography variant="h6" color="textPrimary" component="p">
            {project.title}
          </Typography>
        </Link>
        <Typography variant="body1" color="textSecondary" component="p">
          {project.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardAction}>
        <IconButton
          aria-label="Remove to favorites"
          onClick={() => onRemove(project.id)}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default FavoriteItem;
