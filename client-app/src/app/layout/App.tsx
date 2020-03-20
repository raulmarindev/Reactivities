import 'app/layout/App.css';
import { LoadingComponent } from 'app/layout/LoadingComponent';
import { ActivityDashboard } from 'features/activities/dashboard/ActivityDashboard';
import { HomePage } from 'features/activities/home/HomePage';
import { NavBar } from 'features/nav/NavBar';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { AppDispatch, useTypedSelector } from 'store';
import { fetchActivities, } from 'store/activityDashboard';

const App: React.FC = () => {
  const loading = useTypedSelector<boolean>(({ activityDashboardReducer }) => activityDashboardReducer.isFetching);

  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  if (loading) return (<LoadingComponent content="Loading activities..." />);

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <Route path="/" component={HomePage} />
          <ActivityDashboard />
      </Container>
    </>
  );
};

export default App;