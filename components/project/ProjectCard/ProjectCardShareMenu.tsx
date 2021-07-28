import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Project } from 'interfaces/Project';
import socialShare from 'utils/socialShare';
import { useIntl } from 'react-intl';

interface Props {
  project: Project;
  anchorEl: Element | null;
  onClose(): void;
}

const ProjectCardMoreMenu: React.FC<Props> = ({
  anchorEl,
  onClose,
  project,
}) => {
  const { formatMessage } = useIntl();

  const handleShare = (provider: 'fb' | 'twitter') => {
    const url = `${window.location.origin}/projects/${project.slug}`;
    socialShare(provider, url);
  };

  return (
    <>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        <MenuItem onClick={() => handleShare('fb')}>
          {formatMessage({ id: 'Share to facebook' })}
        </MenuItem>
        <MenuItem onClick={() => handleShare('twitter')}>
          {formatMessage({ id: 'Share to twitter' })}
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProjectCardMoreMenu;
