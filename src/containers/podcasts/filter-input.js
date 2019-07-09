import 'flexboxgrid';
import React from 'react';
import PropTypes from 'prop-types';

import { Input } from 'components/form-elements';

import './podcasts.css';

function FilterInput({ value, onChange, podcastCount }) {
  return (
    <div className="row center-xs end-md middle-xs">
      <div className="filter-input-number">{podcastCount}</div>
      <div className="filter-input-container">
        <Input
          value={value}
          className="filter-input"
          placeholder="Filter podcasts..."
          onChange={evt => onChange(evt.target.value)}
          name="filter"
        />
      </div>
    </div>
  );
}

FilterInput.propTypes = {
  needle: PropTypes.string
};

FilterInput.defaultProps = {
  needle: ''
};

export default FilterInput;
