import { makeStyles } from '@material-ui/core/styles';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { useIntl } from 'react-intl';
import { HomeService } from 'services/home-service';
import Link from 'next/link';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ProjectList from 'components/project/ProjectList';
import Button from '@material-ui/core/Button';
import Intro from 'components/intro';
import Meta from 'components/meta';

const useStyles = makeStyles(() => ({
  loadMoreContainer: {
    marginTop: 40,
    textAlign: 'center',
  },
  section: {
    marginTop: 30,
    marginBottom: 30,
  },
  loadingContainer: {
    marginTop: 20,
    textAlign: 'center',
  },
}));

const Home = ({
  latestProjects = [],
  featuredProjects = [],
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const classes = useStyles();

  const { formatMessage } = useIntl();

  return (
    <>
      <Meta title='Home' />
      <Intro />
      <Container>
        <div className={classes.section}>
          <Typography variant='h5' gutterBottom>
            {formatMessage({ id: 'Featured Projects' })}
          </Typography>
          <ProjectList projects={featuredProjects} />
        </div>
        <div className={classes.section}>
          <Typography variant='h5' gutterBottom>
            {formatMessage({ id: 'Latest Projects' })}
          </Typography>
          <ProjectList projects={latestProjects} />
        </div>
        <div className={classes.loadMoreContainer}>
          <Link href='/projects' passHref>
            <Button
              variant='contained'
              color='primary'
              size='large'
              disableElevation
            >
              {formatMessage({ id: 'View All Projects' })}
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await HomeService.getHomeData();

  const latestProjects = res?.latestProjects ?? [];
  const featuredProjects = res?.featuredProjects ?? [];

  return {
    props: {
      latestProjects,
      featuredProjects,
    },
  };
};
