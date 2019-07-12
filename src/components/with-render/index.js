import React from 'react';

const withConditionalRender = Component => ({ loading, error, ...rest }) => {
  if (loading) {
    return <h1>loading ...</h1>;
  }
  if (error) {
    return null;
  }

  return <Component {...rest} />;
};

export default withConditionalRender;
