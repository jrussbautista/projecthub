import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import { HomeService } from 'services/home-service';
import { HomeData } from 'interfaces/HomeData';
import Link from 'next/link';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ProjectList from 'components/project/ProjectList';
import Button from '@material-ui/core/Button';
import Intro from 'components/home/Intro';
import Meta from 'components/core/Meta';
import HomeDataSkeleton from 'components/home/HomeDataSkeleton/HomeDataSkeleton';

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

const Home = () => {
  const classes = useStyles();

  const [homeData, setHomeData] = useState<HomeData>({
    featuredProjects: [],
    latestProjects: [],
  });
  const [homeDataStatus, setHomeDataStatus] = useState('loading');

  const { formatMessage } = useIntl();

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const results = await HomeService.getHomeData();
        setHomeData(results);
        setHomeDataStatus('succeed');
      } catch (error) {
        setHomeDataStatus('failed');
      }
    };
    fetchHomeData();
  }, []);

  return (
    <>
      <Meta title='Home' />
      <Intro />
      <Container>
        {homeDataStatus === 'loading' && <HomeDataSkeleton />}

        {homeDataStatus === 'succeed' && (
          <>
            <div className={classes.section}>
              <Typography variant='h5' gutterBottom>
                {formatMessage({ id: 'Featured Projects' })}
              </Typography>
              <ProjectList projects={homeData.featuredProjects} />
            </div>
            <div className={classes.section}>
              <Typography variant='h5' gutterBottom>
                {formatMessage({ id: 'Latest Projects' })}
              </Typography>
              <ProjectList projects={homeData.latestProjects} />
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
          </>
        )}
      </Container>
    </>
  );
};

export default Home;
