import { VictoryBar, VictoryChart } from 'victory';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
const moment = require('moment');

const mapStateToProps = state => ({
    user: state.user,
    dataList: state.dataList,
    therapistPatientGraph: state.therapistPatientGraph
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
            }
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER })
        this.props.dispatch({ type: 'GET_DATA' })
        console.log('user', this.props.user.id);

    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
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

        if (this.props.user.userName) {
            console.log('state', this.state);
            console.log('date', moment().format());

            const date = moment().format().split('T', 1);
            console.log('new date', date);
            // const data = this.props.dataList;
            const data = this.props.therapistPatientGraph;
            content = (
                <div>
                    <h3>Graph of Daily Mood</h3>
                    <h3>Activity: {this.state.currentActivity.activity}</h3>
                    <VictoryChart
                        maxDomain={{ y: 10 }}
                        minDomain={{ y: 0 }}
                        // maxDomain={{ x: '10:00' }}
                        // minDomain={{ x: '9:00' }}
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
                                                //     patientGraph: () => {
                                                // this.props.history.push('patientGraphUpdate');
                                                // }

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
        }

        return (
            <div>
                <Nav />
                {content}
            </div>
        );

    }
}
const styleGraph = withStyles(styles)(PatientGraph)

export default connect(mapStateToProps)(styleGraph);