import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Project } from 'interfaces/Project';

interface Props {
  project: Project;
  onDelete(project: Project): void;
  onEdit(project: Project): void;
}

const ProjectCardMenu: React.FC<Props> = ({ onDelete, project, onEdit }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    onDelete(project);
    handleClose();
  };

  const handleEdit = () => {
    onEdit(project);
    handleClose();
  };

  return (
    <>
      <IconButton aria-label='menu' onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default ProjectCardMenu;
