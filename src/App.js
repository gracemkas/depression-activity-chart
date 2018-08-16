import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
// import UserPage from './components/UserPage/UserPage';
// import InfoPage from './components/InfoPage/InfoPage';
import PatientHome from './components/PatientHome/PatientHome';
import ChooseTherapist from './components/PatientChooseTherapist/PatientChooseTherapist';
import LogMood from './components/PatientLog/PatientLog';
import PatientGraph from './components/PatientGraph/PatientGraph';
import GraphUpdate from './components/PatientGraphUpdate/PatientGraphUpdate';
import CurrentTherapist from './components/PatientCurrentTherapist/PatientCurrentTherapist';
import TherapistUpdate from './components/PatientUpdateTherapist/PatientUpdateTherapist';

import './styles/main.css';

const App = () => (
  <div className="grid-container">
    <Header title="Project Base" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/logMood"
          component={LogMood}
        />
        <Route
          path="/chooseTherapist"
          component={ChooseTherapist}
        />
        <Route
          path="/patientHome"
          component={PatientHome}
        />
        <Route
          path="/patientGraph"
          component={PatientGraph}
        />
        <Route
          path="/patientGraphUpdate"
          component={GraphUpdate}
        />
        <Route
          path="/patientCurrentTherapist"
          component={CurrentTherapist}
        />
        <Route
          path="/therapistUpdate"
          component={TherapistUpdate}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
