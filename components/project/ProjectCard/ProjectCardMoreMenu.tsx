import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Project } from 'interfaces/Project';

interface Props {
  project: Project;
  onDelete?(project: Project): void;
  onEdit?(project: Project): void;
  anchorEl: Element | null;
  onClose(): void;
}

const ProjectCardMoreMenu: React.FC<Props> = ({
  onDelete,
  project,
  onEdit,
  anchorEl,
  onClose,
}) => {
  const handleDelete = () => {
    onDelete(project);
    onClose();
  };

  const handleEdit = () => {
    onEdit(project);
    onClose();
  };

  return (
    <>
      <Menu
        id='more-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default ProjectCardMoreMenu;
