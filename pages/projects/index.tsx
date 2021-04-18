import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, makeStyles, Button } from '@material-ui/core';
import ProjectList from 'components/project/ProjectList';
import { Project } from 'interfaces/Project';
import { ProjectService } from 'services/project-service';
import { CircularProgress } from '@material-ui/core';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import useCategories from 'hooks/use-categories';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Meta from 'components/meta';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 30,
    marginBottom: 30,
  },
  loadingContainer: {
    marginTop: 30,
    textAlign: 'center',
  },
  heading: {
    marginBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
  },
  loadMoreContainer: {
    textAlign: 'center',
    marginTop: 30,
  },
  categoryContainer: {
    marginBottom: 20,
  },
}));

const Projects = ({
  projects: initialProjects,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const [isViewingMore, setIsViewingMore] = useState(false);
  const [hasViewMore, setHasViewMore] = useState(true);
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  const { categories } = useCategories();

  const { query } = useRouter();
  const classes = useStyles();
  const { search: searchText } = query;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const results = await ProjectService.getProjects({
          category: selectedTab as string,
        });
        setProjects(results);
      } catch (error) {
        console.log(error);
      }
    };
    if (selectedTab) {
      fetchProjects();
    }
  }, [selectedTab]);

  const handleViewMore = async () => {
    try {
      const lastProject = projects[projects.length - 1];

      if (!hasViewMore) {
        return setHasViewMore(false);
      }

      setIsViewingMore(true);

      const results = await ProjectService.getMoreProjects({
        search: searchText as string,
        lastProject,
      });

      if (!results) {
        return setHasViewMore(false);
      }

      setProjects([...projects, ...results]);
    } catch (error) {
      console.log(error);
      alert('Unable to view more projects. Please try again later.');
    } finally {
      setIsViewingMore(false);
    }
  };

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedTab(newValue);
  };

  return (
    <Container className={classes.container}>
      <Meta title='Projects' />
      {searchText && (
        <Typography variant='h5' className={classes.heading}>
          Search results for <strong>{searchText}</strong>
        </Typography>
      )}
      <Typography variant='h5' className={classes.heading}>
        Categories
      </Typography>
      <Paper square className={classes.categoryContainer}>
        <Tabs
          value={selectedTab || false}
          indicatorColor='primary'
          textColor='primary'
          onChange={handleChange}
          aria-label='category tabs'
        >
          {categories.map((category) => (
            <Tab
              label={category.name}
              key={category.id}
              value={category.name}
            />
          ))}
        </Tabs>
      </Paper>

      {projects.length > 0 ? (
        <>
          <ProjectList projects={projects} />
          <div className={classes.loadMoreContainer}>
            {hasViewMore ? (
              <Button
                type='button'
                variant='contained'
                color='primary'
                onClick={handleViewMore}
                disabled={isViewingMore}
              >
                {isViewingMore ? <CircularProgress size={30} /> : 'View More'}
              </Button>
            ) : (
              <Typography color='error'> You reached the end. </Typography>
            )}
          </div>
        </>
      ) : (
        <Typography color='error' className={classes.emptyText}>
          No projects yet.
        </Typography>
      )}
    </Container>
  );
};

export default Projects;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { search } = query;

  const results = await ProjectService.getProjects({
    search: search as string,
  });

  return {
    props: {
      projects: results || [],
    },
  };
};
