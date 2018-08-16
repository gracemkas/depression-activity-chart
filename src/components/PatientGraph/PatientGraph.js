import { VictoryBar, VictoryChart } from 'victory';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
const moment = require('moment');

const mapStateToProps = state => ({
    user: state.user,
    dataList: state.dataList
});

class PatientGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // time: '',
            // depression_rating: ''
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
                editItem: {
                    ...this.state.editItem,
                    [propertyName]: event.target.value
                }
            })
        }
    }

    home = () => {
        this.props.history.push('patientHome');
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
                    <h2>Graph of Today's Mood</h2>
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
                            style={{ data: { fill: "#DF744A" } }}
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
                    <p>Click on a bar to edit or delete it</p>
                    <Button variant="raised" onClick={this.home}>Back</Button>
                    <TextField
                        id="date"
                        label="Day"
                        type="date"
                        defaultValue={date}
                    />
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

export default connect(mapStateToProps)(PatientGraph);