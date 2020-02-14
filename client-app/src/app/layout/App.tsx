import './App.css';
import { IActivity } from '../models/IActivity';
import React, { useEffect, useState } from 'react';
import { Header, Icon, List } from 'semantic-ui-react';
import wretch from 'wretch';

const App: React.FC = () => {
  const [activities, setActivities] = useState([] as IActivity[]);

  useEffect(() => {
    wretch('http://localhost:5000/api/activities')
      .get()
      .json((json: any) => {
        setActivities(json as IActivity[]);
      });
  }, []);

  return (
    <div>
      <Header as='h2'>
        <Icon name='users' />
        <Header.Content>Reactivities</Header.Content>
      </Header>
      <List>
        {activities.map(activity => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
};

export default App;