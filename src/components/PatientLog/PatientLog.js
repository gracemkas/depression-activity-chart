import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import Nav from '../../components/Nav/Nav';
import PatientChooseTherapist from '../PatientChooseTherapist/PatientChooseTherapist';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


const mapStateToProps = state => ({
    user: state.user,
    therapistName: state.therapistName
});

const styles = {
    textField: {
        margin: '0em 0em 0em 0.5em',
        width: "7em"
    },
    dropDown: {
        width: "10em"
    },
    formControl: {
        margin: '0em 0em 0.5em 0em',
        width: "6em"
    },
    selectEmpty: {
        marginTop: '0em 0em 0.5em 0em' * 2,
    },
    button: {
        margin: '1em 5em 0em 1.5em'
    }
}

class PatientLog extends Component {

    constructor(props) {
        super(props)

        this.state = {
            newLog: {
                depression_rating: '',
                activity: '',
                category: ''
            }
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: 'GET_CURRENT_THERAPIST' });
        console.log('role', this.props.user.role)
        if (this.props.user.role === 'therapist') {
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

    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    addLog = () => {
        this.props.dispatch({
            type: 'POST_LOG',
            payload: this.state.newLog
        })
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
                            <Grid item xs={12}>
                                <Typography className='centerHeadings' variant="display1">How are you feeling?</Typography>
                            </Grid>
                            <Grid item xs={2}></Grid>
                            <Grid className='logText' item xs={12}>
                                <Typography className='centerHeadings' variant="subheading">Rate the severity of your depressed mood from 0 (none) to 10 (severe) </Typography>
                            </Grid>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}></Grid>
                            <FormControl className={this.props.classes.formControl}>
                                <InputLabel>Rating</InputLabel>
                                <Select
                                    value={this.state.newLog.depression_rating}
                                    onChange={this.handleChangeFor("depression_rating")}
                                // id='SLODrop'
                                >
                                    <MenuItem value="0">
                                        <em>0</em>
                                    </MenuItem>
                                    <MenuItem value="1">
                                        <em>1</em>
                                    </MenuItem>
                                    <MenuItem value="2">
                                        <em>2</em>
                                    </MenuItem>
                                    <MenuItem value="3">
                                        <em>3</em>
                                    </MenuItem>
                                    <MenuItem value="4">
                                        <em>4</em>
                                    </MenuItem>
                                    <MenuItem value="5">
                                        <em>5</em>
                                    </MenuItem>
                                    <MenuItem value="6">
                                        <em>6</em>
                                    </MenuItem>
                                    <MenuItem value="7">
                                        <em>7</em>
                                    </MenuItem>
                                    <MenuItem value="8">
                                        <em>8</em>
                                    </MenuItem>
                                    <MenuItem value="9">
                                        <em>9</em>
                                    </MenuItem>
                                    <MenuItem value="10">
                                        <em>10</em>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <Grid className='logText' item xs={12}>
                                <Typography className='centerHeadings' variant="subheading">Choose the most relevant category for your current activity:</Typography>
                            </Grid>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                            </Grid>
                            <Grid item xs={4}></Grid>
                            <FormControl className={this.props.classes.formControl}>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={this.state.newLog.category}
                                    onChange={this.handleChangeFor("category")}
                                // id='SLODrop'
                                >
                                    <MenuItem value="School">
                                        <em>School</em>
                                    </MenuItem>
                                    <MenuItem value="Work">
                                        <em>Work</em>
                                    </MenuItem>
                                    <MenuItem value="Work">
                                        <em>Home</em>
                                    </MenuItem>
                                    <MenuItem value="Friends">
                                        <em>Friends</em>
                                    </MenuItem>
                                    <MenuItem value="Family">
                                        <em>Family</em>
                                    </MenuItem>
                                    <MenuItem value="Family">
                                        <em>Other</em>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <Grid className='logText' item xs={12}>
                                <Typography className='centerHeadings' variant="subheading">What are you doing right now?</Typography>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" id="welcome">
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <TextField
                                    className={this.props.classes.textField}
                                    label="Current Activity"
                                    value={this.state.newLog.activity}
                                    onChange={this.handleChangeFor("activity")}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <Button className={this.props.classes.button} variant="raised" onClick={this.addLog}>Submit</Button>
                            </Grid>
                            <Grid item xs={4}></Grid>
                        </Grid>
                    </div>
                );
            }
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}

const styleLog = withStyles(styles)(PatientLog)
export default connect(mapStateToProps)(styleLog);