import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

// import { fetchUser } from '../../redux/actions/userActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => ({
    user: state.user,
});

class AddItemPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            newItem: {
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

    home = () => {
        this.props.history.push('patientHome');
    }

    handleChangeFor = (propertyName) => {
        return (event) => {
            this.setState({
                newItem: {
                    ...this.state.newItem,
                    [propertyName]: event.target.value
                }
            })
        }
    }

    addItem = () => {
        this.props.dispatch({
            type: 'POST_ITEM',
            payload: this.state.newItem
        })
    }

    render() {
        let content = null;

        console.log('state', this.state.newItem)

        if (this.props.user.userName) {
            content = (
                <div>
                    <h1>Record Your Mood</h1>
                    <p>Rate the severity of your depressed mood from 0 (none) to 10 (severe) </p>
                    <input placeholder="Depressed Mood Rating" onChange={this.handleChangeFor("depression_rating")} />
                    <p>What are you doing right now?</p>
                    <input placeholder="Current Activity" onChange={this.handleChangeFor("activity")} />
                    <Button variant="raised" onClick={this.addItem}>Submit</Button>

                    <Button variant="raised" onClick={this.home}>
                        Back
          </Button>
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

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AddItemPage);