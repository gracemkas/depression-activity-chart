// import ReactChartkick, { LineChart } from 'react-chartkick'
// import Chart from 'chart.js'
import { VictoryBar, VictoryChart } from 'victory';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Button from '@material-ui/core/Button';

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

    //   handleDelete = (item) => {
    //     if (!this.props.user.isLoading && this.props.user.userName === null) {
    //       alert('You must be logged in to delete!')
    //     } else {
    //       this.props.dispatch({
    //         type: 'DELETE_ITEM', payload: item.id

    //       })
    //     }
    //   }


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

    // patientGraph = () => {
    //     this.props.history.push('patientGraphUpdate');
    // }

    render() {
        let content = null;
        // let dataArray = {};


        // let myLineChart = new Chart(ctx, {
        //     type: 'line',
        //     data: data,
        //     options: options
        // });




        // this.props.dataList.map((item, index) => {
        //   return () => {            
        //   this.setState({
        //         ...this.state,
        //         time: item.time,
        //         depression_rating: item.depression_rating
        // })

        // }


        // })


        if (this.props.user.userName) {
            console.log('state', this.state);
            const data = this.props.dataList;
            content = (
                <div>
                    <p>Graph of Today's Mood</p>
                    {/* <LineChart messages={{empty: "No data"}} xtitle="Time" ytitle="Depression Rating"  data={this.state} /> */}
                    <VictoryChart
                        // theme={VictoryTheme.material}
                        maxDomain={{ y: 10 }}
                        minDomain={{ y: 0 }}
                        domainPadding={{ x: 15 }}
                        >
                        <VictoryBar data={data}
                            // data accessor for x values
                            style={{ data: { fill: "#DF744A" } }}
                            events={[{
                                target: "data",
                                eventHandlers: {
                                  onClick: () => {
                                      console.log('clicked')   
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
                                }
                            }
                        }]}
                            x="time"
                            // data accessor for y values
                            y="depression_rating"
                        />
                    </VictoryChart>
                    <p>Click on a bar to edit or delete it</p>
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

// ReactChartkick.addAdapter(Chart)
// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(PatientGraph);