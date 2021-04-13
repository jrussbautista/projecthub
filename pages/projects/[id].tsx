import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProjectService } from 'services/project-service';
import { Project } from 'interfaces/Project';
import { Status } from 'interfaces/Status';
import { makeStyles } from '@material-ui/core/styles';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import ProjectList from 'components/project/ProjectList';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import FavoriteButton from 'components/favorite/FavoriteButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import Meta from 'components/meta';
import { useIntl } from 'react-intl';

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 30,
    marginTop: 30,
  },
  cardImgContainer: {
    width: '100%',
  },
  media: {
    height: 0,
    paddingTop: '40%',
  },
  section: {
    marginTop: 30,
    marginBottom: 30,
  },
  cardDetails: {
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    marginRight: 15,
  },
  loadingContainer: {
    textAlign: 'center',
    marginTop: 30,
  },
  description: {
    marginBottom: 20,
  },
  relatedProjectContainer: {
    marginTop: 30,
  },
  userDetails: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  avatar: {
    marginRight: 10,
    backgroundColor: theme.palette.primary.main,
  },
  emptyText: {
    textAlign: 'center',
  },
}));

const ProjectPage = ({
  project,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const classes = useStyles();

  const { formatMessage } = useIntl();

  const [relatedProjectsStatus, setRelatedProjectsStatus] = useState<Status>(
    'idle'
  );
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchRelatedProjects = async (category: string) => {
      try {
        setRelatedProjectsStatus('idle');
        const results = await ProjectService.getRelatedProjects(category);
        setRelatedProjects(results);
        setRelatedProjectsStatus('success');
      } catch (error) {
        setRelatedProjectsStatus('error');
      }
    };

    if (project) {
      fetchRelatedProjects(project.category);
    }
  }, [project]);

  return (
    <Container className={classes.container}>
      <Meta title={project.title} />
      <Card>
        <div className={classes.cardImgContainer}>
          <CardMedia
            className={classes.media}
            image={project.image_url}
            title={project.title}
          />
        </div>
        <div className={classes.cardDetails}>
          <div>
            <Typography gutterBottom variant='h5'>
              {project.title}
            </Typography>
            <Link href={`/user/${project.user.id}`}>
              <a>
                <div className={classes.userDetails}>
                  {project.user.photo_url ? (
                    <Avatar
                      alt={project.user.name}
                      src={project.user.photo_url}
                      className={classes.avatar}
                    />
                  ) : (
                    <Avatar className={classes.avatar}>
                      {project.user.name.charAt(0)}
                    </Avatar>
                  )}
                  <Typography gutterBottom variant='body1' color='textPrimary'>
                    {project.user.name}
                  </Typography>
                </div>
              </a>
            </Link>
            <Typography
              gutterBottom
              variant='h6'
              color='textSecondary'
              className={classes.description}
            >
              {project.description}
            </Typography>

            {project.website_link && (
              <Button
                href={project.website_link}
                className={classes.button}
                variant='contained'
                color='primary'
                disableElevation
              >
                {formatMessage({ id: 'Website' })}
              </Button>
            )}

            {project.github_link && (
              <Button
                href={project.github_link}
                variant='contained'
                color='default'
                disableElevation
              >
                {formatMessage({ id: 'Github' })}
              </Button>
            )}
          </div>
          <div>
            <FavoriteButton project={project} />
          </div>
        </div>
      </Card>
      <div className={classes.relatedProjectContainer}>
        {relatedProjectsStatus === 'idle' ? (
          <div className={classes.loadingContainer}>
            <CircularProgress />
          </div>
        ) : (
          <div>
            <Typography variant='h5' gutterBottom>
              {formatMessage({ id: 'Related Projects' })}
            </Typography>
            {relatedProjects.length > 0 ? (
              <ProjectList projects={relatedProjects} />
            ) : (
              <Typography
                variant='h6'
                gutterBottom
                className={classes.emptyText}
              >
                {formatMessage({ id: 'No related projects' })}
              </Typography>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default ProjectPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;

  const project = await ProjectService.getProject(id as string);

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project,
    },
  };
};
