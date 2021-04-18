import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useAuth, useFavorites, useModal, useNotification } from 'contexts';
import { Project } from 'interfaces/Project';

interface Props {
  project: Project;
}

const FavoriteButton = ({ project }: Props) => {
  const { currentUser } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();
  const { openModal } = useModal();
  const { showNotification } = useNotification();

  const projectInFavorites = favorites.some(
    (favorite) => favorite.id === project.id
  );

  const handleToggleFavorite = async () => {
    if (!currentUser) {
      return openModal('LOGIN_VIEW');
    }

    try {
      await toggleFavorite(project);
      const favoriteMessage = projectInFavorites
        ? 'Removed to favorites!'
        : 'Added to favorites';
      showNotification('success', favoriteMessage);
    } catch (error) {
      showNotification(
        'error',
        'Unable to toggle favorite right now. Please try again later.'
      );
    }
  };

  return (
    <IconButton aria-label='add to favorites' onClick={handleToggleFavorite}>
      {projectInFavorites ? <FavoriteIcon color='error' /> : <FavoriteIcon />}
    </IconButton>
  );
};

export default FavoriteButton;
