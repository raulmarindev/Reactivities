import './App.css';
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

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(a => a.id === id) || null);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    });
  };

  const handleDeleteActivity = (activityId: string) => {
    agent.Activities.delete(activityId).then(() => {
      setActivities([...activities.filter(a => a.id !== activityId)]);
      setSelectedActivity(null);
      setEditMode(false);
    });
  };

  const handleEditActivity = (activity: IActivity) => {
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(a => a.id !== activity.id), activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    });
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
      });
  }, []);

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
          selectActivity={handleSelectActivity} />
      </Container>
    </>
  );
};

export default App;