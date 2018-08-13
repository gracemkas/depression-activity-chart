import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/patientHome">
            Patient Home
          </Link>
        </li>
        <li>
          <Link to="/chooseTherapist">
            Choose Therapist
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
