import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FavoriteButton from 'components/favorite/FavoriteButton';
import { Project } from 'interfaces/Project';
import Link from 'next/link';
import ProjectCardMenu from './ProjectCardMenu';
import { useIntl } from 'react-intl';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  space: {
    flex: 1,
  },
}));

interface Props {
  project: Project;
  hasMenu?: boolean;
  onDelete(project: Project): void;
  onEdit(project: Project): void;
}

const ProjectCard: React.FC<Props> = ({
  project,
  hasMenu,
  onDelete,
  onEdit,
}) => {
  const classes = useStyles();

  const { formatMessage } = useIntl();

  return (
    <Card>
      <Link href={`/projects/${project.id}`}>
        <a>
          <CardMedia
            className={classes.media}
            image={project.image_url}
            title={project.title}
          />

          <CardContent>
            <div className={classes.info}>
              <Typography variant='body1' color='textSecondary' component='p'>
                {project.title}
              </Typography>
            </div>
          </CardContent>
        </a>
      </Link>
      <CardActions disableSpacing>
        <FavoriteButton project={project} />
        <Link href={`/projects/${project.id}`} passHref>
          <Button size='small' color='primary'>
            {formatMessage({ id: 'Learn More' })}
          </Button>
        </Link>
        <div className={classes.space} />
        {hasMenu && (
          <ProjectCardMenu
            project={project}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        )}
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
