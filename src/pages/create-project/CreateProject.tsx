import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import { useForm } from "react-hook-form";
import { AddProject } from "types/Project";
import { ProjectService } from "services/projectService";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Autocomplete from "@material-ui/lab/Autocomplete";

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
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      flexDirection: "column",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    spinner: {
      marginBottom: 20,
    },
    errorContainer: {
      marginTop: 20,
    },
    alert: {
      minWidth: 350,
      marginTop: 60,
    },
    inputUploadImg: {
      display: "none",
    },
    errorText: {
      fontSize: "0.75rem",
      paddingLeft: 15,
    },
  })
);

const labels = [{ title: "React" }, { title: "Angular" }, { title: "Vue" }];

const CreateProject = () => {
  const classes = useStyles();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm<AddProject>();
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (project: AddProject) => {
    try {
      setError(null);
      setPosting(true);
      await ProjectService.addProject(project);
      setPosting(false);
      setSuccess(true);
      history.push("/my-projects");
    } catch (error) {
      console.log(error);
      setError("Unable to create project right now. Please try again later.");
      setPosting(false);
    }
  };

  return (
    <Container>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={success}
        onClose={() => setSuccess(false)}
        message=""
        key="top center"
      >
        <Alert
          className={classes.alert}
          onClose={() => setSuccess(false)}
          severity="success"
        >
          Successfully project posted.
        </Alert>
      </Snackbar>
      {posting && (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="primary" className={classes.spinner} />
          <Typography variant="h5">Posting your project...</Typography>
        </Backdrop>
      )}
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4">Post a project</Typography>
        {error && (
          <Alert className={classes.errorContainer} severity="error">
            {error}
          </Alert>
        )}
        <TextField
          id="standard-full-width"
          label="Title"
          name="title"
          style={{ margin: 8 }}
          placeholder="Input title..."
          fullWidth
          margin="normal"
          inputRef={register({
            required: "Title is required field",
            minLength: {
              value: 6,
              message: "Title must be at least 6 characters long",
            },
            maxLength: {
              value: 100,
              message: "Title must not be greater than 100",
            },
          })}
          error={Boolean(errors.title)}
          helperText={errors.title && errors.title.message}
        />
        <TextField
          id="standard-full-width"
          label="Description"
          name="description"
          style={{ margin: 8 }}
          placeholder="Input description..."
          fullWidth
          margin="normal"
          multiline
          rows={4}
          inputRef={register({
            required: "Description is required field",
            minLength: {
              value: 6,
              message: "Description must be at least 6 characters long",
            },
          })}
          error={Boolean(errors.description)}
          helperText={errors.description && errors.description.message}
        />
        <TextField
          id="standard-full-width"
          label="Website"
          name="website_link"
          style={{ margin: 8 }}
          placeholder="Input Website..."
          fullWidth
          margin="normal"
          inputRef={register}
        />
        <TextField
          id="standard-full-width"
          label="Github Link"
          name="github_link"
          style={{ margin: 8 }}
          placeholder="Input Github Link..."
          fullWidth
          margin="normal"
          inputRef={register}
        />

        <Autocomplete
          multiple
          id="tags-standard"
          options={labels}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Labels"
              placeholder="Add label"
            />
          )}
        />

        <input
          accept="image/*"
          className={classes.inputUploadImg}
          id="icon-button-file"
          name="image"
          type="file"
          ref={register({
            required: "Image is required field",
          })}
        />
        <label htmlFor="icon-button-file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
          <Typography variant="body1" component="span">
            Upload Screenshot
          </Typography>
        </label>

        {errors.image && (
          <Typography
            variant="inherit"
            className={classes.errorText}
            component="p"
            color="error"
          >
            {errors.image.message}
          </Typography>
        )}

        <div className={classes.btnCreateContainer}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            disableElevation
            type="submit"
          >
            Post
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default CreateProject;
