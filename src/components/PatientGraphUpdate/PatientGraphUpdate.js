import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Button from '@material-ui/core/Button';
import { Delete, Save } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';

const mapStateToProps = state => ({
    user: state.user,
    updatedData: state.updatedData
});

class GraphUpdate extends Component {

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

    graph = () => {
        this.props.history.push('patientGraph');
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
            this.props.history.push('patientGraph');
        }
    }


    saveEdit = () => {
        console.log('edit submit', this.state.updateLog)
        this.props.dispatch({
            type: 'UPDATE_LOG_DEPRESSION',
            payload: this.state.updateLog
        })
        this.props.history.push('patientGraph');
    }

    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    <Grid container justify="center">
                        <Grid item xs={12}>
                            <h2>Edit or Delete Log</h2>
                        </Grid>
                        <Grid item xs={12}>
                            <p>Edit your depressed mood rating from 0 (none) to 10 (severe) </p>
                        </Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <input placeholder="Depressed Mood Rating" onChange={this.handleChangeFor("depression_rating")} />
                        </Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={12}>
                            <p>Edit the activity</p>
                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={9}>
                            <input placeholder="Current Activity" onChange={this.handleChangeFor("activity")} />
                            <Button variant="raised" onClick={this.saveEdit}><Save /></Button>
                            <Button variant="raised" onClick={this.deleteLog}><Delete /></Button>
                            {/* <Button variant="raised" onClick={this.graph}>Back</Button> */}
                        </Grid>
                        <Grid item xs={1}></Grid>

                    </Grid>
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

export default connect(mapStateToProps)(GraphUpdate);