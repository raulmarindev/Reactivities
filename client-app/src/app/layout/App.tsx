import './App.css';
import { LoadingComponent } from './LoadingComponent';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
import { NavBar } from '../../features/nav/NavBar';
import { RootState } from '../../store';
import {
  createActivity,
  deleteActivity,
  fetchActivities,
  openCreateForm,
  selectActivity,
  updateActivity
  } from '../../store/activityDashboard';
import { IActivity } from '../models/IActivity';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Container } from 'semantic-ui-react';

const App: React.FC = () => {
  const loading = useSelector<RootState, boolean>(({ activityDashboardReducer }) => activityDashboardReducer.isFetching);

  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, Action>>();
  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  const handleSelectActivity = (id: string) => {
    dispatch(selectActivity(id));
  };

  const handleOpenCreateForm = () => {
    dispatch(openCreateForm());
  };

  const handleCreateActivity = (activity: IActivity) => {
    dispatch(createActivity(activity));
  };

  const handleDeleteActivity = (activityId: string) => {
    dispatch(deleteActivity(activityId));
  };

  const handleEditActivity = (activity: IActivity) => {
    dispatch(updateActivity(activity));
  };

  if (loading) return (<LoadingComponent content="Loading activities..." />);

  return (
    <>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          createActivity={handleCreateActivity}
          deleteActivity={handleDeleteActivity}
          editActivity={handleEditActivity}
          selectActivity={handleSelectActivity} />
      </Container>
    </>
  );
};

export default App;