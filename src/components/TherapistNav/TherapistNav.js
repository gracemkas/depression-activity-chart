import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Menu as MenuIcon } from '@material-ui/icons';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const mapStateToProps = state => ({
  user: state.user
});
class TherapistNav extends Component {

  constructor(props) {
    super(props)

    this.state = {
      anchorEl: null
    }
  }


  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  // componentDidUpdate() {
  //   if (!this.props.user.isLoading && this.props.user.userName === null) {
  //     this.props.history.push('home');
  //   }
  // }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

//   logMood = () => {
//     this.props.history.push('logMood');
// }

// patientGraph = () => {
//     this.props.history.push('patientGraph');
// }

// currentTherapist = () => {
//     this.props.history.push('patientCurrentTherapist');
// }

  render() {
    const { anchorEl } = this.state;
    return (
      <div>
            <MenuIcon aria-owns={anchorEl ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick} />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.logout}>Logout</MenuItem>
            </Menu>
      </div>
    )
  }
};

export default connect(mapStateToProps)(TherapistNav);