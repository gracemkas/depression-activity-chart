import React, { Component } from 'react';
import { connect } from 'react-redux';
import TherapistNav from '../../components/TherapistNav/TherapistNav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button';
import {Delete, InsertChartOutlined} from '@material-ui/icons';
import TherapistRegister from '../../components/TherapistRegister/TherapistRegister';


const mapStateToProps = state => ({
    user: state.user,
    showpatientList: state.showpatientList,
    therapistNameRegister: state.therapistNameRegister
});

// let therapistListArray: [];

class TherapistUpdate extends Component {

    // constructor(props) {
    //     super(props)

        // this.state = {
        //     therapistSearch: {
        //         first_name: '',
        //         last_name: ''
        //     }
        // }
    // }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: 'GET_PATIENT_LIST' });
        this.props.dispatch({ type: 'GET_THERAPIST_NAME' });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    // currentTherapist = () => {
    //     this.props.foundTherapist.first_name = '';
    //     this.props.foundTherapist.last_name = '';
    //     this.props.history.push('patientCurrentTherapist');
    // }

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


    // findTherapist = () => {
    //     console.log('find', this.state.therapistSearch)
    //     this.props.dispatch({
    //         type: 'FIND_THERAPIST',
    //         payload: this.state.therapistSearch
    //     })
    // }

    // updateTherapist = () => {
    //     console.log('edit', this.props.foundTherapist)
    //     this.props.dispatch({
    //         type: 'UPDATE_THERAPIST',
    //         payload: this.props.foundTherapist
    //     })
    //     // therapistListArray = [];
    //     this.props.history.push('patientCurrentTherapist');
    // }

    handleDelete = (item) => {
        console.log('delete', item.id)
          this.props.dispatch({
            type: 'DELETE_PATIENT', payload: item.id
          })
        }

    patientGraph = (item) => {
        console.log('graph', item.person_id)
        this.props.dispatch({
            type: 'THERAPIST_PATIENT_GRAPH', payload: item.person_id
          })
        this.props.history.push('patientGraph');
    }



    render() {
        let content = null;
        
        let therapistListArray = this.props.showpatientList.map((item, index) => {
            return <TableRow key={index}>
                <TableCell>
                    {item.username}
                </TableCell>
                <TableCell>
                    <InsertChartOutlined variant="raised" onClick={() => this.patientGraph(item)}/>
                </TableCell>
                <TableCell>
                    <Delete variant="raised" onClick={() => this.handleDelete(item)}/>
                </TableCell>
            </TableRow>

        })

        if (this.props.user.userName) {
            // console.log('$$$$$$$$', this.props.therapistNameRegister)
            if (this.props.therapistNameRegister.first_name === undefined) {
                content = (
                    <div>


                        <TherapistRegister />
                    </div>
                )
            } else {
            content = (
                <div>
                    <TherapistNav />
                    <h2>Patient List</h2>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Username
                            </TableCell>
                                    <TableCell>
                                        Graph
                                </TableCell>
                                    <TableCell>
                                        Delete
                            </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {therapistListArray}
                            </TableBody>
                        </Table>
                    </Paper>
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

export default connect(mapStateToProps)(TherapistUpdate);