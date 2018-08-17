import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import Button from '@material-ui/core/Button';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import Grid from '@material-ui/core/Grid';
import PatientChooseTherapist from '../PatientChooseTherapist/PatientChooseTherapist';


const mapStateToProps = state => ({
    user: state.user,
    therapistName: state.therapistName
});

class PatientHome extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: 'GET_CURRENT_THERAPIST' })
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
        console.log('therapist', this.props.therapistName.first_name)

        if (this.props.user.userName) {
            if (this.props.therapistName.first_name === undefined){
            content = 
                <div>
                    <PatientChooseTherapist />
                </div>
            } else {
                content = 
                <div>
                    <Nav />
                    <Grid container justify="center" id="welcome">
                        <Grid item xs={8}>
                            Welcome, {this.props.user.userName}!
                    </Grid>
                        <Grid item xs={4}>
                            <Button variant="raised" onClick={this.logout}>
                                Log Out
                            </Button>
                        </Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={8}>
                            <Button variant="raised" onClick={this.logMood}>
                                Log Mood
                            </Button>
                        </Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={9}>
                            <Button variant="raised" onClick={this.patientGraph}>
                                Daily Mood Graph
                        </Button>
                        </Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={8}>
                            <Button variant="raised" onClick={this.currentTherapist}>
                                Therapist
                        </Button>
                        </Grid>
                        

                    </Grid>
                </div>
            }
            // );
        }

        return (
            <div>
                
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(PatientHome);