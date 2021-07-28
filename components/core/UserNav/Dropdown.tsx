import Router from 'next/router';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useAuth } from 'contexts';
import { useIntl } from 'react-intl';

interface Props {
  onClose(): void;
  anchorEl: null | HTMLElement;
}

const Dropdown: React.FC<Props> = ({ onClose, anchorEl }) => {
  const { currentUser, logout } = useAuth();
  const { formatMessage } = useIntl();

  const handleNavigateDropDownMenu = (value: string) => {
    onClose();
    switch (value) {
      case 'logout':
        logout();
        break;
      case 'settings':
        Router.push('/settings');
        break;
      case 'profile':
        Router.push(`/user/${currentUser?.id}`);
        break;
      case 'favorites':
        Router.push('/favorites');
        break;
    }
  };

  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <MenuItem onClick={() => handleNavigateDropDownMenu('profile')}>
        {formatMessage({ id: 'My Profile' })}
      </MenuItem>
      <MenuItem onClick={() => handleNavigateDropDownMenu('favorites')}>
        {formatMessage({ id: 'My Favorites' })}
      </MenuItem>
      <MenuItem onClick={() => handleNavigateDropDownMenu('settings')}>
        {formatMessage({ id: 'My Settings' })}
      </MenuItem>
      <MenuItem onClick={() => handleNavigateDropDownMenu('logout')}>
        <Button color='primary'>{formatMessage({ id: 'Log Out' })}</Button>
      </MenuItem>
    </Menu>
  );
};

export default Dropdown;
