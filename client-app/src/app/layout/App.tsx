import './App.css';
import React, { useEffect, useState } from 'react';
import { Header, Icon, List } from 'semantic-ui-react';
import wretch from 'wretch';

interface IValue {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const [values, setValues] = useState([] as IValue[]);

  useEffect(() => {
    wretch('http://localhost:5000/api/values')
      .get()
      .json((json: any) => {
        setValues(json as IValue[]);
      });
  }, []);

  return (
    <div>
      <Header as='h2'>
        <Icon name='users' />
        <Header.Content>Reactivities</Header.Content>
      </Header>
      <List>
        {values.map(value => (
          <List.Item key={value.id}>{value.name}</List.Item>
        ))}
      </List>
    </div>
  );
};

export default App;