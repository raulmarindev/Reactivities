import './App.css';
import { LoadingComponent } from './LoadingComponent';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
import { NavBar } from '../../features/nav/NavBar';
import agent from '../api/agent';
import { IActivity } from '../models/IActivity';
import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';

const App: React.FC = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(a => a.id === id) || null);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
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

  useEffect(() => {
    agent.Activities.list()
      .then(activities => {
        setActivities(
          activities.map(a => {
            return {
              ...a,
              date: a.date.split('.')[0]
            };
          }));
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return (<LoadingComponent content="Loading activities..." />);

  return (
    <>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          createActivity={handleCreateActivity}
          deleteActivity={handleDeleteActivity}
          editActivity={handleEditActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          submitting={submitting} />
      </Container>
    </>
  );
};

export default App;