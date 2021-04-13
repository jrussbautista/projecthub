import React, { useState } from 'react';
import Router from 'next/router';
import { Container, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { useForm, Controller } from 'react-hook-form';
import { AddProject } from 'interfaces/Project';
import { ProjectService } from 'services/project-service';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import MenuItem from '@material-ui/core/MenuItem';
import useCategories from 'hooks/use-categories';
import Meta from 'components/meta';
import { useIntl } from 'react-intl';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      marginTop: 40,
    },
    btnCreateContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
      marginTop: 30,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      flexDirection: 'column',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
      display: 'none',
    },
    errorText: {
      fontSize: '0.75rem',
    },
    imageContainer: {
      marginTop: 10,
    },
    image: {
      width: 200,
      height: 200,
      backgroundSize: 'cover',
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundPosition: 'center',
    },
    formControl: {
      marginTop: 16,
      marginBottom: 8,
    },
  })
);

interface AddProjectForm extends AddProject {
  image: string;
}

const CreateProject = () => {
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    errors,
    control,
    setValue,
  } = useForm<AddProjectForm>();

  const { formatMessage } = useIntl();

  const [posting, setPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null | ArrayBuffer>(
    null
  );
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { categories } = useCategories();

  const onSubmit = async (project: AddProject) => {
    try {
      setError(null);
      setPosting(true);
      const newProject = {
        ...project,
        image_file: imageFile as File,
      };
      const result = await ProjectService.addProject(newProject);
      setPosting(false);
      setSuccess(true);
      const url = `/projects/${result.slug}`;
      Router.push(url);
    } catch (error) {
      console.log(error);
      setError('Unable to create project right now. Please try again later.');
      setPosting(false);
    }
  };

  const handleFileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container>
      <Meta title='Create Project' />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={success}
        onClose={() => setSuccess(false)}
        message=''
        key='top center'
      >
        <Alert
          className={classes.alert}
          onClose={() => setSuccess(false)}
          severity='success'
        >
          Successfully project posted.
        </Alert>
      </Snackbar>
      {posting && (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color='primary' className={classes.spinner} />
          <Typography variant='h5'>Posting your project...</Typography>
        </Backdrop>
      )}
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant='h4'>
          {formatMessage({ id: 'Post a project' })}
        </Typography>
        {error && (
          <Alert className={classes.errorContainer} severity='error'>
            {error}
          </Alert>
        )}
        <TextField
          id='standard-full-width'
          label={formatMessage({ id: 'Title' })}
          name='title'
          placeholder={formatMessage({ id: 'Title' })}
          fullWidth
          margin='normal'
          inputRef={register({
            required: 'Title is required field',
            minLength: {
              value: 6,
              message: 'Title must be at least 6 characters long',
            },
            maxLength: {
              value: 100,
              message: 'Title must not be greater than 100',
            },
          })}
          error={Boolean(errors.title)}
          helperText={errors.title && errors.title.message}
        />
        <TextField
          id='description'
          label={formatMessage({ id: 'Description' })}
          name='description'
          style={{ margin: 8 }}
          placeholder={formatMessage({ id: 'Description' })}
          fullWidth
          margin='normal'
          multiline
          rows={4}
          inputRef={register({
            required: 'Description is required field',
            minLength: {
              value: 6,
              message: 'Description must be at least 6 characters long',
            },
          })}
          error={Boolean(errors.description)}
          helperText={errors.description && errors.description.message}
        />
        <TextField
          id='website'
          label={formatMessage({ id: 'Website' })}
          name='website_link'
          placeholder={formatMessage({ id: 'Website' })}
          fullWidth
          margin='normal'
          inputRef={register}
        />
        <TextField
          id='github_link'
          label={formatMessage({ id: 'Github link' })}
          name='github_link'
          placeholder={formatMessage({ id: 'Github link' })}
          fullWidth
          margin='normal'
          inputRef={register}
        />

        <Controller
          control={control}
          name='category'
          defaultValue=''
          rules={{ required: 'Category is required field' }}
          as={
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel id='category'>
                {formatMessage({ id: 'Category' })}
              </InputLabel>
              <Select
                onChange={(e) =>
                  setValue('category', e.target.value, { shouldValidate: true })
                }
                defaultValue=''
              >
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          }
        />

        {errors.category && (
          <Typography
            variant='inherit'
            className={classes.errorText}
            component='p'
            color='error'
          >
            {errors.category.message}
          </Typography>
        )}

        <input
          accept='image/*'
          className={classes.inputUploadImg}
          id='icon-button-file'
          name='image'
          type='file'
          ref={register({
            required: 'Image is required field',
          })}
          onChange={handleFileImageChange}
        />
        <label htmlFor='icon-button-file'>
          <IconButton
            color='primary'
            aria-label='upload picture'
            component='span'
          >
            <PhotoCamera />
          </IconButton>
          <Typography variant='body1' component='span'>
            {formatMessage({ id: 'Upload Image' })}
          </Typography>
        </label>

        {errors.image && (
          <Typography
            variant='inherit'
            className={classes.errorText}
            component='p'
            color='error'
          >
            {errors.image.message}
          </Typography>
        )}

        {imagePreview && (
          <div className={classes.imageContainer}>
            <div
              className={classes.image}
              style={{ backgroundImage: `url(${imagePreview})` }}
            ></div>
          </div>
        )}

        <div className={classes.btnCreateContainer}>
          <Button
            variant='contained'
            color='primary'
            size='large'
            disableElevation
            type='submit'
          >
            {formatMessage({ id: 'Post' })}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default CreateProject;
