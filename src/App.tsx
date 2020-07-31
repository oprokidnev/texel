import React from 'react';
import ServiceForm from './components/ServiceForm';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
    },
  })
);

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ServiceForm />
    </div>
  );
}

export default App;
