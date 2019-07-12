import 'flexboxgrid';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { H1 } from 'components/texts';

import './navbar.css';

function Header({ loading }) {
  return (
    <div className="row center-xs start-sm between-xs middle-xs navbar">
      <div className="col-xs-6">
        <H1>
          <Link to="/" className="link">
            Podcaster
          </Link>
        </H1>
      </div>
      {loading && <div className="col-xs-6 end-xs">loading</div>}
    </div>
  );
}

Header.propType = {
  loading: PropTypes.bool.isRequired
};

export default Header;
