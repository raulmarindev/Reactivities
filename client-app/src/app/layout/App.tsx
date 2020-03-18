import './App.css';
import { LoadingComponent } from './LoadingComponent';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
import { NavBar } from '../../features/nav/NavBar';
import { RootState } from '../../store';
import { fetchActivities, openCreateForm, selectActivity } from '../../store/activityDashboard';
import agent from '../api/agent';
import { IActivity } from '../models/IActivity';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Container } from 'semantic-ui-react';

const App: React.FC = () => {
  const activities = useSelector<RootState, IActivity[]>(({ activityDashboardReducer }) => activityDashboardReducer.activities);
  console.log(activities);
  const loading = useSelector<RootState, boolean>(({ activityDashboardReducer }) => activityDashboardReducer.isFetching);
  const [activities2, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity2, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode2, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
    setSubmitting(true);
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));
  };

  const handleDeleteActivity = (activityId: string) => {
    setSubmitting(true);
    agent.Activities.delete(activityId).then(() => {
      setActivities([...activities.filter(a => a.id !== activityId)]);
      setSelectedActivity(null);
      setEditMode(false);
    }).then(() => setSubmitting(false));
  };

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(a => a.id !== activity.id), activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));
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
          setEditMode={setEditMode}
          selectActivity={handleSelectActivity}
          submitting={submitting} />
      </Container>
    </>
  );
};

export default App;