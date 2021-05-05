import { useState } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteButton from 'components/favorite/FavoriteButton';
import { Project } from 'interfaces/Project';
import Link from 'next/link';
import ProjectCardMoreMenu from './ProjectCardMoreMenu';
import ProjectCardShareMenu from './ProjectCardShareMenu';
import formatDate from 'utils/formatDate';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '60%', // 16:9
    backgroundSize: 'contain',
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  space: {
    flex: 1,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    color: theme.palette.common.black,
  },
}));

interface Props {
  project: Project;
  hasMenu?: boolean;
  onDelete?(project: Project): void;
  onEdit?(project: Project): void;
}

interface AnchorEl {
  shareEl: HTMLElement | null;
  moreEl: HTMLElement | null;
}

const ProjectCard: React.FC<Props> = ({
  project,
  hasMenu,
  onDelete,
  onEdit,
}) => {
  const classes = useStyles();

  const initialAnchorlEl = {
    shareEl: null,
    moreEl: null,
  };

  const [anchorEl, setAnchorEl] = useState<AnchorEl>(initialAnchorlEl);

  const handleClick = (
    name: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl({ ...anchorEl, [name]: event.currentTarget });
  };

  const handleClose = () => {
    setAnchorEl(initialAnchorlEl);
  };

  return (
    <Card>
      <Link href={`/projects/${project.slug}`}>
        <a>
          <CardMedia
            className={classes.media}
            image={project.image_url}
            title={project.title}
          />
          <CardContent>
            <Typography
              className={classes.title}
              gutterBottom
              variant='body1'
              component='h2'
            >
              {project.title}
            </Typography>
          </CardContent>
        </a>
      </Link>
      <CardActions disableSpacing>
        <FavoriteButton project={project} />
        <IconButton
          aria-label='share'
          onClick={(event) => handleClick('shareEl', event)}
        >
          <ShareIcon />
        </IconButton>

        <div className={classes.space} />
        {hasMenu && (
          <IconButton
            aria-label='more'
            onClick={(event) => handleClick('moreEl', event)}
          >
            <MoreVertIcon />
          </IconButton>
        )}
      </CardActions>

      <ProjectCardShareMenu
        project={project}
        onClose={handleClose}
        anchorEl={anchorEl.shareEl}
      />

      {hasMenu && (
        <ProjectCardMoreMenu
          onClose={handleClose}
          anchorEl={anchorEl.moreEl}
          onEdit={onEdit}
          onDelete={onDelete}
          project={project}
        />
      )}
    </Card>
  );
};

export default ProjectCard;
