import { PROJECTS } from "data/mock-data";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { ProjectList } from "components/Project";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    marginBottom: 30,
    marginTop: 30,
  },
  cardImgContainer: {
    width: "100%",
  },
  media: {
    height: 0,
    paddingTop: "40%",
  },
  section: {
    marginTop: 30,
    marginBottom: 30,
  },
  title: {},
  cardDetails: {
    padding: 10,
  },
  button: {
    marginRight: 15,
  },
}));

const Project = () => {
  const project = PROJECTS[0];

  const classes = useStyles();

  return (
    <Container>
      <Card className={classes.cardContainer}>
        <div className={classes.cardImgContainer}>
          <CardMedia
            className={classes.media}
            image={project.image_url}
            title={project.title}
          />
        </div>
        <div className={classes.cardDetails}>
          <Typography className={classes.title} gutterBottom variant="h4">
            {project.title}
          </Typography>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            color="textSecondary"
          >
            {project.description}
          </Typography>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            disableElevation
          >
            Website
          </Button>
          <Button variant="contained" color="default" disableElevation>
            Github
          </Button>
        </div>
      </Card>
      <div className={classes.section}>
        <Typography variant="h4" gutterBottom>
          Related Projects
        </Typography>
        <ProjectList projects={PROJECTS.slice(0, 4)} />
      </div>
    </Container>
  );
};

export default Project;
