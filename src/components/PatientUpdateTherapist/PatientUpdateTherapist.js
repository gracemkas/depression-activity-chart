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
import {Search} from '@material-ui/icons';

const mapStateToProps = state => ({
    user: state.user,
    foundTherapist: state.findTherapist
});

// let therapistListArray: [];

class TherapistUpdate extends Component {

    constructor(props) {
        super(props)

        this.state = {
            therapistSearch: {
                first_name: '',
                last_name: ''
            }
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        console.log('therapist', this.props);

    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    currentTherapist = () => {
        this.props.foundTherapist.first_name = '';
        this.props.foundTherapist.last_name = '';
        this.props.history.push('patientCurrentTherapist');
    }

    handleChangeFor = (propertyName) => {
        return (event) => {
            this.setState({
                therapistSearch: {
                    ...this.state.therapistSearch,
                    [propertyName]: event.target.value
                }
            })
        }
    }


    findTherapist = () => {
        console.log('find', this.state.therapistSearch)
        this.props.dispatch({
            type: 'FIND_THERAPIST',
            payload: this.state.therapistSearch
        })
    }

    updateTherapist = () => {
        console.log('edit', this.props.foundTherapist)
        this.props.dispatch({
            type: 'UPDATE_THERAPIST',
            payload: this.props.foundTherapist
        })
        // therapistListArray = [];
        this.props.history.push('patientCurrentTherapist');
    }

    render() {
        let content = null;
        
        let therapistListArray = this.props.foundTherapist.map((item, index) => {
            return <TableRow key={index}>
                <TableCell>
                    {item.first_name}
                </TableCell>
                <TableCell>
                    {item.last_name}
                </TableCell>
                <TableCell>
                    <Button variant="raised" onClick={() => this.updateTherapist(this.props.item)}>Add</Button>
                </TableCell>
            </TableRow>

        })

        if (this.props.user.userName) {
            content = (
                <div>
                    <h2>Choose a New Therapist</h2>
                    <p>Look up your therapist by first and last name: </p>
                    <input placeholder="First Name" onChange={this.handleChangeFor("first_name")} />
                    <input placeholder="Last Name" onChange={this.handleChangeFor("last_name")} />
                    <Button variant="raised" onClick={this.findTherapist}><Search /></Button>
                    

                    <h3>
                        Results:
                    </h3>
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
                                {therapistListArray}
                            </TableBody>
                        </Table>
                    </Paper>
                    {/* <Button variant="raised" onClick={this.currentTherapist}>Back</Button> */}
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