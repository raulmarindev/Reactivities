import 'app/layout/App.css';
import { LoadingComponent } from 'app/layout/LoadingComponent';
import { ActivityDashboard } from 'features/activities/dashboard/ActivityDashboard';
import { ActivityDetails } from 'features/activities/dashboard/ActivityDetails';
import { ActivityForm } from 'features/activities/form/ActivityForm';
import { HomePage } from 'features/activities/home/HomePage';
import { NavBar } from 'features/nav/NavBar';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
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
      <NavBar>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/activities" component={ActivityDashboard} />
        <Route exact path="/activities/:id" component={ActivityDetails} />
        <Route exact path="/createActivity" component={ActivityForm} />
      </NavBar>
    </>
  );
};

export default App;