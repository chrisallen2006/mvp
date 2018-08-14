import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles"
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Loading = () => <div>Loading...</div>;

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#594fbe',
      main: '#3023AE',
      dark: '#211879',
      contrastText: '#fff',
    },
    secondary: {
      light: '#e88946',
      main: '#E36C18',
      dark: '#9e4b10',
      contrastText: '#fff',
    },
    typography: {
      fontFamily: [
        'proxima-nova-condensed', 'Roboto', 'Arial', 'sans-serif'
      ]
    }
  },
});

const Home = Loadable({
  loader: () => import('./routes/Home'),
  loading: Loading,
});

const Driver = Loadable({
  loader: () => import('./routes/Driver'),
  loading: Loading,
});

const Vehicle = Loadable({
  loader: () => import('./routes/Vehicle'),
  loading: Loading,
});

const Quote = Loadable({
  loader: () => import('./routes/Quote'),
  loading: Loading,
});

const Payment = Loadable({
  loader: () => import('./routes/Payment'),
  loading: Loading,
});

const Thankyou = Loadable({
  loader: () => import('./routes/Thankyou'),
  loading: Loading,
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Router>
      <TransitionGroup>
        <CSSTransition
          timeout={500}
          classNames='fade'
        >
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/driver" component={Driver}/>
            <Route path="/vehicle" component={Vehicle}/>
            <Route path="/quote" component={Quote}/>
            <Route path="/payment" component={Payment}/>
            <Route path="/thankyou" component={Thankyou}/>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </Router>
  </MuiThemeProvider>
);

export default App;
