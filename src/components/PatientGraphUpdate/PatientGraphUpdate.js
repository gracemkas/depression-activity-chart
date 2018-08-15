import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => ({
    user: state.user
});

class GraphUpdate extends Component {

    constructor(props) {
        super(props)

        this.state = {
            updateLog: {
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
                newLog: {
                    ...this.state.newLog,
                    [propertyName]: event.target.value
                }
            })
        }
    }


  saveEdit = () => {
    console.log('edit submit', this.state.editItem)
    this.props.dispatch({
      type: 'UPDATE_ITEM',
      payload: this.state.editItem,
      id: this.state.id
    })
  }

    render() {
        let content = null;

        console.log('state', this.state.newItem)

        if (this.props.user.userName) {
            content = (
                <div>
                    <h1>Edit or Delete Log</h1>
                    <p>Edit your depressed mood rating from 0 (none) to 10 (severe) </p>
                    <input placeholder="Depressed Mood Rating" onChange={this.handleChangeFor("depression_rating")} />
                    <p>Edit the activity</p>
                    <input placeholder="Current Activity" onChange={this.handleChangeFor("activity")} />
                    <Button variant="raised" onClick={this.saveEdit}>Save</Button>
                    <Button variant="raised" onClick={this.deleteLog}>Delete</Button>
                    <Button variant="raised" onClick={this.graph}>Back</Button>
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