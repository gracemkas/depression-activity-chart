// import ReactChartkick, { LineChart } from 'react-chartkick'
// import Chart from 'chart.js'
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

{/* <canvas id="myChart" width="400" height="400"></canvas>
let ctx = document.getElementById("myChart"); */}

const mapStateToProps = state => ({
    user: state.user,
    dataList: state.dataList
});

// const data = [
//     { quarter: 1, earnings: 13000 },
//     { quarter: 2, earnings: 16500 },
//     { quarter: 3, earnings: 14250 },
//     { quarter: 4, earnings: 19000 }
// ];



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