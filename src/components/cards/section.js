import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './cards.css';

function Section(props) {
  const { borderBottom, padding10, ...rest } = props;
  const className = classnames(props.className, {
    'section--border-bottom': borderBottom,
    'section--padding10': padding10
  });
  return <div {...rest} className={className} />;
}

Section.propType = {
  borderBottom: PropTypes.bool,
  padding10: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default Section;
