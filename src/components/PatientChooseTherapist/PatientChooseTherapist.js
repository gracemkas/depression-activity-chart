import React, { Component } from 'react';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

class ChooseTherapist extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          therapist: {
            first_name : '',
            last_name: '',
          }
        }
      }
  
    componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  handleChangeFor = (propertyName) => {
    return (event ) => {
      this.setState({
        therapist : {
          ...this.state.newItem,
          [propertyName] : event.target.value
        }
      })
    }
  }

  findTherapist = () => {
    this.props.dispatch({
      type: 'GET_THERAPIST',
      payload: this.state.newItem
    })
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <p>
            Look up your therapist by name:
          </p>
          <input placeholder="First Name" onChange={this.handleChangeFor("first_name")}/>
          <input placeholder="Last Name" onChange={this.handleChangeFor("last_name")}/>
          <button onClick={this.findTherapist}>Submit</button>
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
                            
                        </TableBody>
                    </Table>
                </Paper>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ChooseTherapist);