import './texts.css';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const factoryText = Component => {
  const Text = props => {
    const {
      upper,
      lnhigth,
      italic,
      nmarginTop,
      nmarginBottom,
      left,
      bold,
      ...rest
    } = props;
    const cssClass = classnames(Component, {
      'upper-case': upper,
      'lh-higth': lnhigth,
      italic: italic,
      'no-margin-top': nmarginTop,
      'no-margin-bottom': nmarginBottom,
      'text-align-left': left,
      bold: bold
    });
    return <Component className={cssClass} {...rest} />;
  };

  Text.propTypes = {
    children: PropTypes.node,
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
