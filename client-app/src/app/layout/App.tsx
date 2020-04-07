import { NavBar } from 'features/nav/NavBar';
import { Container, makeStyles } from 'material';
import React from 'react';
import { RenderRoute, Routes, routesKeys } from 'routes';

const useStyles = makeStyles(theme => ({
  root: {
  },
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <RenderRoute {...(Routes.get(routesKeys.Home))!} />
      <RenderRoute {...(Routes.get(routesKeys.InternalArea))!} render={() =>
        <NavBar>
          <Container className={classes.root}>
            {
              Array.from(Routes).filter(r => r[0] !== routesKeys.Home).map(r => <RenderRoute key={r[0]} {...r[1]} />)
            }
          </Container>
        </NavBar>
      } />
    </>
  );
};

export default App;