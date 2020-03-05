import './App.css';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
import { NavBar } from '../../features/nav/NavBar';
import { IActivity } from '../models/IActivity';
import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import wretch from 'wretch';

const App: React.FC = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(a => a.id === id) || null);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  useEffect(() => {
    wretch('http://localhost:5000/api/activities')
      .get()
      .json((json: any) => {
        setActivities(json as IActivity[]);
      });
  }, []);

  return (
    <>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          editMode={editMode}
          setEditMode={setEditMode}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity} />
      </Container>
    </>
  );
};

export default App;