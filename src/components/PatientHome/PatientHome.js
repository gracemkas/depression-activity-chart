import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import Button from '@material-ui/core/Button';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
  user: state.user
});

class PatientHome extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }

  logMood = () => {
    this.props.history.push('logMood');
  }

  patientGraph = () => {
      this.props.history.push('patientGraph');
  }

  currentTherapist = () => {
      this.props.history.push('patientCurrentTherapist');
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h4 id="welcome">
            Welcome, { this.props.user.userName }!
          </h4>
          <Button variant="raised" onClick={this.logMood}>
            Log Mood
          </Button>
          <Button variant="raised" onClick={this.patientGraph}>
            Daily Mood Graph
          </Button>
          <Button variant="raised" onClick={this.currentTherapist}>
            Therapist
          </Button>
          <Button variant="raised" onClick={this.logout}>
            Log Out
          </Button>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}

export default connect(mapStateToProps)(PatientHome);