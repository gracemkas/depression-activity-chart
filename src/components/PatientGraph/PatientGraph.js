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
    dataList: state.dataList
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
            }
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

    home = () => {
        this.props.history.push('patientHome');
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
            const data = this.props.dataList;
            content = (
                <div>
                    <h3>Graph of Daily Mood</h3>
                    <h3>Activity</h3>
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
                                        // return [
                                        //   {
                                        //     target: "data",
                                        //     // mutation: (props) => {
                                        //     //   const fill = props.style && props.style.fill;
                                        //     //   return fill === "black" ? null : { style: { fill: "black" } };
                                        //     // }
                                        //     patientGraph: () => {
                                        this.props.history.push('patientGraphUpdate');
                                        // }
                                        //   }
                                        // ];


                                        this.props.dispatch({
                                            type: 'UPDATE_LOG_ID', payload: clickedProps.datum.id
                                        })
                                    }
                                }
                            }]}
                            x="time"
                            y="depression_rating"
                        />
                    </VictoryChart>
                    {/* className={this.props.classes.} */}
                    <p>Click on a bar to edit or delete it</p>
                    <form className={this.props.classes.container} noValidate>
                    <TextField 
                        id="date"
                        label="Choose a Date"
                        type="date"
                        defaultValue={date}
                        onChange={this.handleChangeFor("choosenDate")}
                    />
                    </form>
                    <Button variant="raised" onClick={this.changeDate}>Submit</Button>
                    <Button variant="raised" onClick={this.home}>Back</Button>
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

export default  connect(mapStateToProps)(styleGraph);