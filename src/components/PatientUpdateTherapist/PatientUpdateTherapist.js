import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => ({
    user: state.user,
    updatedData: state.updatedData
});

class TherapistUpdate extends Component {

    constructor(props) {
        super(props)

        this.state = {
            updateLog: {
                id: this.props.updatedData.id,
                depression_rating: '',
                activity: ''
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

    currentTherapist = () => {
        this.props.history.push('patientCurrentTherapist');
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
        }
    }


    saveEdit = () => {
        console.log('edit submit', this.state.updateLog)
        this.props.dispatch({
            type: 'UPDATE_LOG_DEPRESSION',
            payload: this.state.updateLog
        })
    }

    render() {
        let content = null;

        // let therapistListArray = this.props.therapistName.map((item, index) => {
        //     return <p key={index}>
        //         {item.first_name} {item.last_name}
        //     </p>
        // })

        if (this.props.user.userName) {
            content = (
                <div>
                    <h2>Choose a New Therapist</h2>
                    <p>Look up your therapist by first and last name: </p>
                    <input placeholder="First Name" onChange={this.handleChangeFor("first_name")} />
                    <input placeholder="Last Name" onChange={this.handleChangeFor("last_name")} />
                    <Button variant="raised" onClick={this.findTherapist}>Search</Button>
                    <Button variant="raised" onClick={this.currentTherapist}>Back</Button>

                              <p>
            Results:
          </p>
          <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    First Name
                            </TableCell>
                                <TableCell>
                                    Last Name
                                </TableCell>
                                <TableCell>
                                    Add Therapist
                            </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {feedbackMapArray} */}
                            <TableRow>
                                <TableCell>
                                    Test
                            </TableCell>
                                <TableCell>
                                    Test
                                </TableCell>
                                <TableCell>
                                    <Button variant="raised">Add</Button>
                            </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
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

export default connect(mapStateToProps)(TherapistUpdate);