import 'app/layout/App.css';
import { LoadingComponent } from 'app/layout/LoadingComponent';
import { NavBar } from 'features/nav/NavBar';
import { Container, makeStyles } from 'material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RenderRoute, Routes } from 'routes';
import { AppDispatch, useTypedSelector } from 'store';
import { fetchActivities, } from 'store/activityDashboard';

const useStyles = makeStyles(theme => ({
  root: {
  },
}));

const App: React.FC = () => {
  const classes = useStyles();

  const loading = useTypedSelector<boolean>(({ activityDashboardReducer }) => activityDashboardReducer.isFetching);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  if (loading) return (<LoadingComponent content="Loading activities..." />);

  return (
    <>
      <NavBar>
        <Container className={classes.root}>
          {
            Array.from(Routes).map(r => <RenderRoute key={r[0]} {...r[1]} />)
          }
        </Container>
      </NavBar>
    </>
  );
};

export default App;