import { Container, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      marginTop: 40,
    },
    btnCreateContainer: {
      display: "flex",
      justifyContent: "flex-end",
      width: "100%",
      marginTop: 30,
    },
  })
);

const CreateProject = () => {
  const classes = useStyles();

  return (
    <Container>
      <form className={classes.form}>
        <Typography variant="h4">Create a project</Typography>
        <TextField
          id="standard-full-width"
          label="Title"
          style={{ margin: 8 }}
          placeholder="Input title..."
          fullWidth
          margin="normal"
        />
        <TextField
          id="standard-full-width"
          label="Description"
          style={{ margin: 8 }}
          placeholder="Input description..."
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          id="standard-full-width"
          label="Website"
          style={{ margin: 8 }}
          placeholder="Input Website..."
          fullWidth
          margin="normal"
        />
        <TextField
          id="standard-full-width"
          label="Github Link"
          style={{ margin: 8 }}
          placeholder="Input Github Link..."
          fullWidth
          margin="normal"
        />
        <div className={classes.btnCreateContainer}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            disableElevation
          >
            Create
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default CreateProject;
