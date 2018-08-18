import React from 'react';
import { Link } from 'react-router-dom';
import {Home} from '@material-ui/icons';


const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/patientHome">
            <Home />
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
