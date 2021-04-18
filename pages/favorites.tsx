import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import FavoriteCard from 'components/favorite/FavoriteCard';
import Image from 'next/image';
import { useFavorites } from 'contexts';
import { useIntl } from 'react-intl';
import Meta from 'components/meta';

const useStyles = makeStyles(() => ({
  container: {
    marginBottom: 20,
    marginTop: 20,
  },
  heading: {
    marginBottom: 20,
  },
  loadingContainer: {
    textAlign: 'center',
    marginTop: 20,
  },
  emptyText: {
    marginTop: 40,
  },
  emptyContainer: {
    textAlign: 'center',
  },
  emptyImage: {
    maxWidth: 300,
  },
  errorContainer: {
    marginBottom: 20,
  },
}));

const Favorites = () => {
  const classes = useStyles();
  const { favorites, status } = useFavorites();
  const { formatMessage } = useIntl();

  if (status === 'idle') {
    return (
      <Container className={classes.container}>
        <div className={classes.loadingContainer}>
          <CircularProgress size={30} />
        </div>
      </Container>
    );
  }

  if (status === 'error') {
    return (
      <Container className={classes.container}>
        <Alert severity='error'>
          Unable to load your favorites right now. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className={classes.container}>
      <Meta title='Favorites' />
      <Typography variant='h6' className={classes.heading}>
        {formatMessage({ id: 'My Favorites' })}
      </Typography>
      {favorites.length > 0 ? (
        favorites.map((favorite) => (
          <FavoriteCard key={favorite.id} project={favorite} />
        ))
      ) : (
        <div className={classes.emptyContainer}>
          <Image
            alt='empty favorites'
            src='/images/empty.svg'
            width='300'
            height='300'
            className={classes.emptyImage}
          />

          <Typography variant='body1' className={classes.emptyText}>
            Your favorites is empty :(
          </Typography>
        </div>
      )}
    </Container>
  );
};

export default Favorites;
