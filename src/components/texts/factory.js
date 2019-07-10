import './texts.css';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const factoryText = Component => {
  const Text = props => {
    const cssClass = classnames(Component, {
      'upper-case': props.upper,
      'lh-higth': props.lnhigth,
      italic: props.italic,
      'no-margin-top': props.nmarginTop,
      'no-margin-bottom': props.nmarginBottom,
      'text-align-left': props.left,
      bold: props.bold
    });
    return <Component className={cssClass} {...props} />;
  };

  Text.propTypes = {
    children: PropTypes.node.isRequired,
    upper: PropTypes.bool,
    lnhigth: PropTypes.bool,
    italic: PropTypes.bool,
    nmarginTop: PropTypes.bool,
    nmarginBottom: PropTypes.bool,
    left: PropTypes.bool
  };

  return Text;
};

export default factoryText;
