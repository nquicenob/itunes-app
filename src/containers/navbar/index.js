import 'flexboxgrid';
import React from 'react';
import { Link } from 'react-router-dom';
import { H1 } from 'components/texts';

import './navbar.css';

function Header() {
  return (
    <div className="row center-xs start-sm between-xs middle-xs navbar">
      <div className="col-xs-6">
        <H1>
          <Link to="/" className="link">
            Podcaster
          </Link>
        </H1>
      </div>
      <div className="col-xs-6 end-xs">Indicator</div>
    </div>
  );
}

export default Header;
