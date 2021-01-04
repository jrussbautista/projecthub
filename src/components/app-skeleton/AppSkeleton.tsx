import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#fff",
    color: "#3d3d3d",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  siteTitle: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  headerLink: {
    marginRight: 20,
  },
  mainContainer: {
    marginTop: 100,
    textAlign: "center",
  },
}));

const AppSkeleton = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <p className={classes.siteTitle}>ProjectHub</p>
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.mainContainer}>
        <CircularProgress />
      </div>
    </>
  );
};

export default AppSkeleton;
