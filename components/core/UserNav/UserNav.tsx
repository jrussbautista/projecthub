import { useState } from 'react';
import { useAuth, useModal } from 'contexts';
import Link from 'next/link';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Dropdown from './Dropdown';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { useIntl } from 'react-intl';

const useStyles = makeStyles((theme) => ({
  headerLink: {
    marginRight: 10,
  },
  avatarBackgroundColor: {
    backgroundColor: theme.palette.primary.main,
    cursor: 'pointer',
  },
  avatarButtonContainer: {
    backgroundColor: 'transparent',
    border: 'transparent',
  },
  list: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
  },
  searchIconContainer: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}));

interface Props {
  toggleSearchBar(): void;
}

const UserNav: React.FC<Props> = ({ toggleSearchBar }) => {
  const classes = useStyles();

  const { formatMessage } = useIntl();

  const { currentUser } = useAuth();

  const { openModal } = useModal();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDropDown = () => {
    setAnchorEl(null);
  };

  return (
    <nav>
      <ul className={classes.list}>
        <li className={classes.headerLink}>
          <div className={classes.searchIconContainer}>
            <IconButton aria-label='search' onClick={toggleSearchBar}>
              <SearchIcon />
            </IconButton>
          </div>
        </li>
        {currentUser ? (
          <>
            <li className={classes.headerLink}>
              <Link href='/projects/create' passHref>
                <Button
                  color='primary'
                  disableElevation
                  variant='contained'
                  startIcon={<AddIcon />}
                >
                  {formatMessage({ id: 'Project' })}
                </Button>
              </Link>
            </li>
            <li className={classes.headerLink}>
              <button
                type='button'
                onClick={handleOpenDropdown}
                className={classes.avatarButtonContainer}
              >
                {currentUser.photo_url ? (
                  <Avatar src={currentUser.photo_url} alt={currentUser.name} />
                ) : (
                  <Avatar className={classes.avatar}>
                    {currentUser?.name?.charAt(0)}
                  </Avatar>
                )}
              </button>
              <Dropdown onClose={handleCloseDropDown} anchorEl={anchorEl} />
            </li>
          </>
        ) : (
          <li>
            <Button
              color='primary'
              variant='contained'
              onClick={() => openModal('LOGIN_VIEW')}
            >
              {formatMessage({ id: 'Sign In' })}
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default UserNav;
