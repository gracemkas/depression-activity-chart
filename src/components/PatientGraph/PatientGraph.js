import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import Nav from '../../components/Nav/Nav';
import TherapistNav from '../TherapistNav/TherapistNav';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { VictoryBar, VictoryChart } from 'victory';

const moment = require('moment');

const mapStateToProps = state => ({
    user: state.user,
    dataList: state.dataList,
    therapistPatientGraph: state.therapistPatientGraph,
    therapistPatientId: state.therapistPatientId
});

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    center: {
        margin:'1em 0em 0em 0em'
    }
});
class PatientGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newChoosenDate: {
                choosenDate: ''
            },
            currentActivity: {
                activity: ''
            },
            therapistDate: {
                choosenTherapistDate: '',
                patientId: this.props.therapistPatientId
            },
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER })
        this.props.dispatch({ type: 'GET_DATA' })


    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    handleChangeForTherapist = (propertyName) => {
        return (event) => {
            this.setState({
                therapistDate: {
                    ...this.state.therapistDate,
                    [propertyName]: event.target.value
                }
            })

        }
    }

    handleChangeFor = (propertyName) => {
        return (event) => {
            this.setState({
                newChoosenDate: {
                    ...this.state.newChoosenDate,
                    [propertyName]: event.target.value
                }
            })
        }
    }

    changeActivity = (activity) => {
        return this.setState({
            currentActivity: {
                activity: activity
            }
        })
    }

    update = () => {
        this.props.history.push('patientGraphUpdate');
    }

    changeDate = () => {
        this.props.dispatch({
            type: 'CHANGE_DATE',
            payload: this.state.newChoosenDate.choosenDate.split(':', 1)
        })
    }

    therapistChangeDate = () => {
        this.props.dispatch({
            type: 'CHANGE_THERAPIST_DATE',
            payload: this.state.therapistDate
        })
    }

    render() {
        let content = null;
        if (this.props.user.userName) {
            if (this.props.user.role === 'patient') {
                const date = moment().format().split('T', 1);
                const data = this.props.dataList;
                content = (
                    <div>
                        <Nav />
                        <Typography className='centerHeadings' variant="display1">Graph of Daily Mood</Typography>
                        <Typography className={this.props.classes.center} variant="title">Activity: {this.state.currentActivity.activity}</Typography>
                        <VictoryChart
                            maxDomain={{ y: 10 }}
                            minDomain={{ y: 0 }}
                            domainPadding={{ x: 15 }}
                        >
                            <VictoryBar data={data}
                                style={{ data: { fill: "#3F4045" } }}
                                events={[{
                                    target: "data",
                                    eventHandlers: {
                                        onClick: (evt, clickedProps) => {
                                            this.changeActivity(clickedProps.datum.activity);
                                            this.props.dispatch({
                                                type: 'UPDATE_LOG_ID', payload: clickedProps.datum.id
                                            })
                                            return [
                                                {
                                                    target: "data",
                                                    mutation: (props) => {
                                                        const fill = props.style && props.style.fill;
                                                        return fill === "black" ? null : { style: { fill: "black" } };
                                                    }
                                                }
                                            ];
                                        }
                                    }
                                }]}
                                x="time"
                                y="depression_rating"
                            />
                        </VictoryChart>
                        <p>Click on a bar and then click the update button to edit or delete it</p>
                        <Grid container justify="center" id="welcome">
                            <Button className="right" variant="raised" onClick={this.update}>Update</Button>
                        </Grid>
                        <form className={this.props.classes.container} noValidate>
                            <TextField
                                id="date"
                                label="Choose a Date"
                                type="date"
                                defaultValue={date}
                                onChange={this.handleChangeFor("choosenDate")}
                            />
                        </form>
                        <Grid container justify="center" id="welcome">
                            <Button className="buttonMargin" variant="raised" onClick={this.changeDate}>Set New Date</Button>
                        </Grid>
                        <Grid item xs={4}></Grid>
                    </div>
                );
            } else {
                const date = moment().format().split('T', 1);
                const data = this.props.therapistPatientGraph;
                content = (
                    <div>
                        <TherapistNav />
                        <h3>Graph of Daily Mood</h3>
                        <h4>Activity: {this.state.currentActivity.activity}</h4>
                        <VictoryChart
                            maxDomain={{ y: 10 }}
                            minDomain={{ y: 0 }}
                            domainPadding={{ x: 15 }}
                        >
                            <VictoryBar data={data}
                                style={{ data: { fill: "#392F5A" } }}
                                events={[{
                                    target: "data",
                                    eventHandlers: {
                                        onClick: (evt, clickedProps) => {
                                            this.changeActivity(clickedProps.datum.activity);
                                            this.props.dispatch({
                                                type: 'UPDATE_LOG_ID', payload: clickedProps.datum.id
                                            })
                                            return [
                                                {
                                                    target: "data",
                                                    mutation: (props) => {
                                                        const fill = props.style && props.style.fill;
                                                        return fill === "black" ? null : { style: { fill: "black" } };
                                                    }
                                                }
                                            ];
                                        }
                                    }
                                }]}
                                x="time"
                                y="depression_rating"
                            />
                        </VictoryChart>
                        <form className={this.props.classes.container} noValidate>
                            <TextField
                                id="date"
                                label="Choose a Date"
                                type="date"
                                defaultValue={date}
                                onChange={this.handleChangeForTherapist("choosenTherapistDate")}
                            />
                        </form>
                        <Grid container justify="center" id="welcome">
                            <Button className="right" variant="raised" onClick={this.therapistChangeDate}>Set New Date</Button>
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
const styleGraph = withStyles(styles)(PatientGraph)

export default connect(mapStateToProps)(styleGraph);