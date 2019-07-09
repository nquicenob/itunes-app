import 'flexboxgrid';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { Input } from 'components/form-elements';

import './podcasts.css';

function FilterInput(props) {
  const { location, history } = props;
  const [state, setState] = useState('');
  useEffect(() => {
    const qs = queryString.parse(location.search);
    setState(qs.q || '');
  }, []);

  const push = debounce(value => history.push(`/?q=${value}`), 100);

  return (
    <div className="row center-xs end-md middle-xs">
      <div className="col-xs-12 filter-input-container">
        <Input
          value={state}
          className="filter-input"
          placeholder="Filter podcasts..."
          onChange={evt => {
            const value = evt.target.value;
            setState(value);
            push(value);
          }}
          name="filter"
        />
      </div>
    </div>
  );
}

FilterInput.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(FilterInput);
