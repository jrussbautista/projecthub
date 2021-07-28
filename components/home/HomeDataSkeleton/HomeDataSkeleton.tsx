import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  section: {
    marginTop: 30,
    marginBottom: 30,
  },
}));

const SkeletonGrid = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton variant='rect' height={200} />
        <Skeleton />
        <Skeleton width='60%' />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton variant='rect' height={200} />
        <Skeleton />
        <Skeleton width='60%' />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton variant='rect' height={200} />
        <Skeleton />
        <Skeleton width='60%' />
      </Grid>
    </Grid>
  );
};

const HomeDataSkeleton = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.section}>
        <Skeleton width={200} height={40} />
        <SkeletonGrid />
      </div>
      <div className={classes.section}>
        <Skeleton width={200} height={40} />
        <SkeletonGrid />
      </div>
    </>
  );
};

export default HomeDataSkeleton;
