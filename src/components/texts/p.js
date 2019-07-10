import factoryText from './factory';

export default factoryText('p');

// import './texts.css'
// import React from 'react';
// import PropTypes from 'prop-types';
// import classnames from 'classnames';

// const P = (props) => {
//   const cssClass = classnames('p', {
//     'upper-case': props.upper,
//     'lh-higth': props.lnhigth,
//     italic: props.italic,
//     'no-margin-top': props.nmarginTop,
//     'no-margin-bottom': props.nmarginBottom,
//   });
//   return <p className={cssClass} {...props}/>;
// }

// P.propTypes = {
//   children: PropTypes.node.isRequired,
//   upper: PropTypes.bool,
//   lnhigth: PropTypes.bool,
//   italic: PropTypes.bool,
//   nmarginTop: PropTypes.bool,
//   nmarginBottom: PropTypes.bool,
// };

// export default P;
