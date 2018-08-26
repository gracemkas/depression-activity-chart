import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Button from '@material-ui/core/Button';
import PatientChooseTherapist from '../PatientChooseTherapist/PatientChooseTherapist';
import Grid from '@material-ui/core/Grid';

const mapStateToProps = state => ({
    user: state.user,
    therapistName: state.therapistName
});

class PatientLog extends Component {

    constructor(props) {
        super(props)

        this.state = {
            newLog: {
                depression_rating: '',
                activity: ''
            }
        }
    }

    

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: 'GET_CURRENT_THERAPIST' });
        console.log('role', this.props.user.role)
        if (this.props.user.role === 'therapist'){
            this.props.history.push('therapistHome');
        }
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');

        }
    }

    home = () => {
        this.props.history.push('patientHome');
    }

    handleChangeFor = (propertyName) => {
        return (event) => {
            this.setState({
                newLog: {
                    ...this.state.newLog,
                    [propertyName]: event.target.value
                }
            })
        }
    }

    addLog = () => {
        this.props.dispatch({
            type: 'POST_LOG',
            payload: this.state.newLog
        })
        // this.setState({
        //     newLog: {
        //         depression_rating: '',
        //         activity: ''
        //     }
        // });
        this.props.history.push('patientGraph');
    }

    render() {
        
        let content = null;
        if (this.props.user.userName && this.props.user.role === 'patient') {
            if (this.props.therapistName.first_name === undefined) {
                content =
                    <div>
                        <PatientChooseTherapist />
                    </div>
            } else {
            content = (
                <div>
                    <Grid container justify="center" id="welcome">
                    <Grid item xs={12}>
                    <Nav />
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                    <h2>Record Your Mood</h2>
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={12}>
                    <p>Rate the severity of your depressed mood from 0 (none) to 10 (severe) </p>
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                    <input placeholder="Depressed Mood Rating" onChange={this.handleChangeFor("depression_rating")} />
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={12}>
                    <p>What are you doing right now?</p>
                    </Grid>
                    <input placeholder="Current Activity" onChange={this.handleChangeFor("activity")} />
                    <Button variant="raised" onClick={this.addLog}>Submit</Button>
                    {/* <Button variant="raised" onClick={this.home}>Back</Button> */}
                    </Grid>
                </div>
            );
        }} 

        return (
            <div>
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(PatientLog);