import React, { useState } from 'react';
import Modal from 'components/modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { AddProject, Project } from 'interfaces/Project';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import MenuItem from '@material-ui/core/MenuItem';
import useCategories from 'hooks/use-categories';

interface Props {
  isVisible: boolean;
  project: Project;
  onClose(): void;
  onSubmit(project: AddProject): void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      marginTop: 40,
    },
    formContent: {
      maxHeight: 500,
      overflow: 'auto',
    },
    btnCreateContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
      marginTop: 30,
    },
    spinner: {
      marginBottom: 20,
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

const ProjectEditModal: React.FC<Props> = ({
  isVisible,
  onClose,
  project,
  onSubmit,
}) => {
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    errors,
    control,
    setValue,
  } = useForm<AddProjectForm>({
    defaultValues: {
      title: project?.title,
      description: project?.description,
      website_link: project?.website_link,
      github_link: project?.website_link,
      category: project?.category,
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null | ArrayBuffer>(
    project.image_url || null
  );

  const { categories } = useCategories();

  const submit = (data: AddProject) => {
    onSubmit(data);
  };

  const handleFileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal open={isVisible} onClose={onClose} title='Edit Project'>
      <form className={classes.form} onSubmit={handleSubmit(submit)}>
        <div className={classes.formContent}>
          <TextField
            id='standard-full-width'
            label='Title'
            name='title'
            placeholder='Input title...'
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
            id='standard-full-width'
            label='Description'
            name='description'
            style={{ margin: 8 }}
            placeholder='Input description...'
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
            id='standard-full-width'
            label='Website'
            name='website_link'
            placeholder='Input Website...'
            fullWidth
            margin='normal'
            inputRef={register}
          />
          <TextField
            id='standard-full-width'
            label='Github Link'
            name='github_link'
            placeholder='Input Github Link...'
            fullWidth
            margin='normal'
            inputRef={register}
          />

          <Controller
            control={control}
            name='category'
            rules={{ required: 'Category is required field' }}
            as={
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel id='category'>Category</InputLabel>
                <Select
                  onChange={(e) =>
                    setValue('category', e.target.value, {
                      shouldValidate: true,
                    })
                  }
                  value={project.category}
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
            ref={register}
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
              Upload Image
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
        </div>

        <div className={classes.btnCreateContainer}>
          <Button
            variant='contained'
            color='primary'
            size='large'
            disableElevation
            type='submit'
          >
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProjectEditModal;
