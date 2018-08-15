import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => ({
    user: state.user,
    therapistName: state.therapistName
});

class CurrentTherapist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // time: '',
            // depression_rating: ''
        }
    }

    componentDidMount() {
        //screen will start at the top
        window.scrollTo(0,0);
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER })
        this.props.dispatch({ type: 'GET_CURRENT_THERAPIST' })
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

    changeTherapist = () => {
        this.props.history.push('therapistUpdate');
    }
    

    render() {
        let content = null;
        // console.log('therapistName', this.props.therapistName[0].first_name);
        

        // let therapistListArray = this.props.therapistName.map((item, index) => {
        //     return <p key={index}>
        //         {item.first_name} {item.last_name}
        //     </p>
        //   })

        if (this.props.user.userName) {
            let firstName = this.props.therapistName;
            content = (
                <div>
                    <h2>Current Therapist</h2>
                    <p>Therapist Name: {firstName.first_name} {firstName.last_name}</p>
                    <Button variant="raised" onClick={this.changeTherapist}>Change Therapist</Button>
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

export default connect(mapStateToProps)(CurrentTherapist);