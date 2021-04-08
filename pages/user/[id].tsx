import { useState } from 'react';
import { Container } from '@material-ui/core';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { makeStyles } from '@material-ui/core/styles';
import { UserService } from 'services/user-service';
import { AddProject, Project } from 'interfaces/Project';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ProjectCard from 'components/project/ProjectCard';
import UserDetails from 'components/user/UserDetails';
import Meta from 'components/meta';
import { useAuth, useNotification } from 'contexts';
import { ProjectService } from 'services/project-service';
import ProjectEditModal from 'components/project/ProjectEditModal';

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 20,
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
  },
  heading: {
    marginBottom: 20,
  },
}));

const UserPage = ({
  user,
  projects: initialProjects,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const classes = useStyles();

  const [projects, setProjects] = useState<Project[]>(initialProjects ?? []);
  const [isOpenEditProjectModal, setIsOpenEditProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { currentUser } = useAuth();
  const { showNotification } = useNotification();

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setIsOpenEditProjectModal(true);
  };

  const handleCloseEditProjectModal = () => {
    setIsOpenEditProjectModal(false);
  };

  const handleDeleteProject = async (projectToDelete: Project) => {
    try {
      await ProjectService.deleteProject(projectToDelete.id);
      const filterProjects = projects.filter(
        (project) => project.id !== projectToDelete.id
      );
      setProjects(filterProjects);
    } catch (error) {
      showNotification(
        'error',
        "Sorry we were'nt able to delete your project right now. Please try again later."
      );
    }
  };

  const handleEditProjectSubmit = async (projectToEdit: AddProject) => {
    try {
      if (!selectedProject) return;
      const results = await ProjectService.updateProject(
        selectedProject.id,
        projectToEdit
      );
      showNotification('success', 'Project updated successfully');
      const newProjects = projects.map((project) =>
        project.id === selectedProject.id ? { ...project, ...results } : project
      );
      setProjects(newProjects);
      handleCloseEditProjectModal();
    } catch (error) {
      showNotification(
        'error',
        "Sorry we were'nt able to update your project right now. Please try again later."
      );
    }
  };

  return (
    <>
      {selectedProject && isOpenEditProjectModal && (
        <ProjectEditModal
          project={selectedProject}
          isVisible={isOpenEditProjectModal}
          onClose={handleCloseEditProjectModal}
          onSubmit={handleEditProjectSubmit}
        />
      )}
      <Container className={classes.container}>
        <Meta title={user.name} />
        <UserDetails user={user} />
        <Typography variant='h5' className={classes.heading}>
          Projects
        </Typography>
        {projects.length > 0 ? (
          <Grid container spacing={3}>
            {projects.map((project: Project) => (
              <Grid item xs={12} sm={6} md={3} key={project.id}>
                <ProjectCard
                  project={project}
                  hasMenu={Boolean(
                    currentUser && currentUser.id === project.user.id
                  )}
                  onDelete={handleDeleteProject}
                  onEdit={handleEditProject}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant='h6' className={classes.emptyText}>
            Projects is still empty.
          </Typography>
        )}
      </Container>
    </>
  );
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;

  const user = await UserService.getUser(id as string);
  const projects = await UserService.getUserProjects(id as string);

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user,
      projects,
    },
  };
};
