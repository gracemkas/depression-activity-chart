import { VictoryBar, VictoryChart } from 'victory';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import TherapistNav from '../TherapistNav/TherapistNav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
const moment = require('moment');

const mapStateToProps = state => ({
    user: state.user,
    dataList: state.dataList,
    therapistPatientGraph: state.therapistPatientGraph,
    therapistPatientId: state.therapistPatientId
    // updatedData: state.updatedData
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
            // this.changeDate();
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
        console.log('date change', this.state.newChoosenDate.choosenDate)
        this.props.dispatch({
            type: 'CHANGE_DATE',
            payload: this.state.newChoosenDate.choosenDate.split(':', 1)
        })
    }
    

    render() {
        let content = null;
        console.log('*****', this.props.therapistPatientId);
        if (this.props.user.userName) {
            if (this.props.user.role === 'patient'){
            const date = moment().format().split('T', 1);
            const data = this.props.dataList;
            content = (
                <div>
                    <Nav />
                    <h3>Graph of Daily Mood</h3>
                    <h3>Activity: {this.state.currentActivity.activity}</h3>
                    <VictoryChart
                        maxDomain={{ y: 10 }}
                        minDomain={{ y: 0 }}
                        domainPadding={{ x: 15 }}
                    // scale={{ x: "time" }}
                    >
                        {/* <VictoryAxis
                            tickFormat={(x) => new Date(x).getHours ()}
                        /> */}
                        <VictoryBar data={data}
                            style={{ data: { fill: "#392F5A" } }}
                            events={[{
                                target: "data",
                                eventHandlers: {
                                    onClick: (evt, clickedProps) => {
                                        console.log('clicked', clickedProps.datum.id)
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
                    {/* className={this.props.classes.} */}
                    <p>Click on a bar and then click the update button to edit or delete it</p>
                    <Button variant="raised" onClick={this.update}>Update</Button>
                    <form className={this.props.classes.container} noValidate>
                        <TextField
                            id="date"
                            label="Choose a Date"
                            type="date"
                            defaultValue={date}
                            onChange={this.handleChangeFor("choosenDate")}
                        />
                    </form>
                    <Button variant="raised" onClick={this.changeDate}>Set New Date</Button>
                </div>
            );
        }else{
            const date = moment().format().split('T', 1);
            const data = this.props.therapistPatientGraph;
            content = (
                <div>
                    <TherapistNav />
                    <h3>Graph of Daily Mood</h3>
                    <h3>Activity: {this.state.currentActivity.activity}</h3>
                    <VictoryChart
                        maxDomain={{ y: 10 }}
                        minDomain={{ y: 0 }}
                        domainPadding={{ x: 15 }}
                    // scale={{ x: "time" }}
                    >
                        {/* <VictoryAxis
                            tickFormat={(x) => new Date(x).getHours ()}
                        /> */}
                        <VictoryBar data={data}
                            style={{ data: { fill: "#392F5A" } }}
                            events={[{
                                target: "data",
                                eventHandlers: {
                                    onClick: (evt, clickedProps) => {
                                        console.log('clicked', clickedProps.datum.id)
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
                    {/* className={this.props.classes.} */}
                    {/* <p>Click on a bar and then click the update button to edit or delete it</p>
                    <Button variant="raised" onClick={this.update}>Update</Button> */}
                    <form className={this.props.classes.container} noValidate>
                        <TextField
                            id="date"
                            label="Choose a Date"
                            type="date"
                            defaultValue={date}
                            onChange={this.handleChangeForTherapist("choosenTherapistDate")}
                        />
                    </form>
                    <Button variant="raised" onClick={this.changeDate}>Set New Date</Button>
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