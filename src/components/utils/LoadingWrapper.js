import React, { useState } from 'react';

export const LoadingWrapper = (WrappedComponent, loadingMessage) => {
  const HOC = props => {
    const [isLoading, setLoading] = useState(true);
    const setLoadingState = isComponentLoading => {
      setLoading(isComponentLoading);
    };

    return (
      <>
        {isLoading && (
          <div style={{ backgroundColor: 'blue', color: 'red' }}>
            {loadingMessage}
          </div>
        )}
        <WrappedComponent {...props} setLoading={setLoadingState} />
      </>
    );
  };

  return HOC;
};

export default LoadingWrapper;
