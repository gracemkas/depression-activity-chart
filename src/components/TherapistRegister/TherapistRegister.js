import React, { Component } from 'react';
import { connect } from 'react-redux';
// import TherapistNav from '../../components/TherapistNav/TherapistNav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
    user: state.user,
    therapistName: state.therapistName
});

class TherapistRegister extends Component {

    constructor(props) {
        super(props)

        this.state = {
            newName: {
                first_name: '',
                last_name: ''
            }
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        // this.props.dispatch({ type: 'GET_CURRENT_THERAPIST' })
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    // home = () => {
    //     this.props.history.push('patientHome');
    // }

    handleChangeFor = (propertyName) => {
        return (event) => {
            this.setState({
                newName: {
                    ...this.state.newName,
                    [propertyName]: event.target.value
                }
            })
        }
    }

    addName = () => {
        this.props.dispatch({
            type: 'POST_THERAPIST_NAME',
            payload: this.state.newName
        })
        // this.setState({
        //     newLog: {
        //         depression_rating: '',
        //         activity: ''
        //     }
        // });
        console.log('PROPS:', this.props.history)
        // this.props.dispatch({ type: 'GET_THERAPIST_NAME' });
    }

    render() {
        let content = null;
        console.log('PROPS:', this.props.history)
        if (this.props.user.userName) {
            content = (
                <div>
                    {console.log('PROPS:', this.props.history)}
                    <h1>Enter your first and last name:</h1>
                    <p>First Name</p>
                    <input placeholder="First Name" onChange={this.handleChangeFor("first_name")} />
                    <p>Last Name</p>
                    <input placeholder="Last Name" onChange={this.handleChangeFor("last_name")} />
                    <Button variant="raised" onClick={this.addName}>Submit</Button>
                    {/* <Button variant="raised" onClick={this.home}>Back</Button> */}
                </div>
            );
        }

        return (
            <div>
                {/* <TherapistNav /> */}
                {content}
            </div>
        );
    }
}

export default withRouter(
    connect(mapStateToProps)(TherapistRegister)
  );

// let Routed = withRouter(TherapistRegister)
// export default connect(mapStateToProps)(Routed);
