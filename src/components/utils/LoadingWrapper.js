import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';

import './LoadingSpinner.css';
export const LoadingWrapper = (WrappedComponent, loadingMessage) => {
  const HOC = props => {
    const [isLoading, setLoading] = useState(true);
    const setLoadingState = isComponentLoading => {
      setLoading(isComponentLoading);
    };

    return (
      <>
        <WrappedComponent {...props} setLoading={setLoadingState} />
        {isLoading && (
          <div id='mainCont'>
            <Typography variant='h2' component='h2' gutterBottom>
              {loadingMessage}
            </Typography>
            <div id='loadingSpin'></div>
          </div>
        )}
      </>
    );
  };

  return HOC;
};

export default LoadingWrapper;
