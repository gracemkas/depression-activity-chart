import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';

import Nav from '../../components/Nav/Nav';

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Delete, Save } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';

const mapStateToProps = state => ({
    user: state.user,
    updatedData: state.updatedData
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
class GraphUpdate extends Component {

    constructor(props) {
        super(props)

        this.state = {
            updateLog: {
                id: this.props.updatedData.id,
                depression_rating: '',
                activity: '',
                category: ''
            }
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    graph = () => {
        this.props.history.push('patientGraph');
    }

    handleChangeFor = (propertyName) => {
        return (event) => {
            this.setState({
                updateLog: {
                    ...this.state.updateLog,
                    [propertyName]: event.target.value
                }
            })
        }
    }

    deleteLog = () => {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            alert('You must be logged in to delete!')
        } else {
            this.props.dispatch({
                type: 'DELETE_LOG', payload: this.state.updateLog.id
            })
            this.props.history.push('patientGraph');
        }
    }

    saveEdit = () => {
        console.log('edit submit', this.state.updateLog)
        this.props.dispatch({
            type: 'UPDATE_LOG_DEPRESSION',
            payload: this.state.updateLog
        })
        this.props.history.push('patientGraph');
    }

    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    <Grid container justify="center">
                        <Grid item xs={12}>
                            <Typography className='centerHeadings' variant="display1">Edit or Delete Log</Typography>
                        </Grid>
                        <Grid className='logText' item xs={12}>
                            <Typography className='centerHeadings' variant="subheading">Edit the severity of your depressed mood from 0 (none) to 10 (severe) </Typography>
                        </Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}></Grid>
                        <FormControl className={this.props.classes.formControl}>
                            <InputLabel>Rating</InputLabel>
                            <Select
                                value={this.state.updateLog.depression_rating}
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
                            <Typography className='centerHeadings' variant="subheading">Edit the category:</Typography>
                        </Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}></Grid>
                        <FormControl className={this.props.classes.formControl}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={this.state.updateLog.category}
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
                                <Typography className='centerHeadings' variant="subheading">Edit the activity:</Typography>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" id="welcome">
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <TextField
                                    className={this.props.classes.textField}
                                    label="Current Activity"
                                    value={this.state.updateLog.activity}
                                    onChange={this.handleChangeFor("activity")}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={4}></Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={5}>
                            <Button className={this.props.classes.textField} variant="raised" onClick={this.saveEdit}>Save</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button className={this.props.classes.textField} variant="raised" onClick={this.deleteLog}>Delete</Button>
                        </Grid>
                        <Grid item xs={2}></Grid>

                    </Grid>
                </div>
            );
        }

        return (
            <div>
                <Nav />
                {content}
            </div>
        );
    }
}

const styleLog = withStyles(styles)(GraphUpdate)
export default connect(mapStateToProps)(styleLog);