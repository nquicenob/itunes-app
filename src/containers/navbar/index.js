
import 'flexboxgrid';
import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.css';

function Header() {
  return (
    <div className="row center-xs start-sm between-xs middle-xs navbar">
      <div className="col-xs-6">
        <Link to="/" className="link">
          <h1 className="h1">Podcaster</h1>
        </Link>
      </div>
      <div className="col-xs-6 end-xs">
        Indicator
      </div>
    </div>
  );
}

export default Header;


