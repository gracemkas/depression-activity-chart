import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu as MenuIcon } from '@material-ui/icons';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const mapStateToProps = state => ({
  user: state.user
});
class Nav extends Component {

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
      // <div className="navbar">
      <div>
        {/* <Grid container > */}
          {/* <Grid item xs={8}> */}
            {/* <Link to="/patientHome">
              <Home />
            </Link> */}
          {/* </Grid> */}
          {/* <Grid item xs={4}> */}
            {/* <Button variant="extendedFab" size="small" onClick={this.logout}> */}
            <MenuIcon aria-owns={anchorEl ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick} />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <Link to="/logMood" style={{ outline: 'none' }}><MenuItem>
              Log Mood
              </MenuItem></Link>
              <Link to="/patientGraph" style={{ outline: 'none' }}><MenuItem>
              Daily Mood Graph
              </MenuItem></Link>
              <Link to="/patientCurrentTherapist" style={{ outline: 'none' }}><MenuItem>
              Therapist
              </MenuItem></Link>
              {/* <MenuItem onClick={this.patientGraph}>Daily Mood Graph</MenuItem> */}
              {/* <MenuItem onClick={this.currentTherapist}>Therapist</MenuItem> */}
              <MenuItem onClick={this.logout}>Logout</MenuItem>
            </Menu>
            {/* </Button> */}
          {/* </Grid> */}
        {/* </Grid> */}
      </div>
    )
  }
};

export default connect(mapStateToProps)(Nav);
