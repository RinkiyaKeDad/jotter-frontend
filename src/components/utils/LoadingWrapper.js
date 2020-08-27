import React, { useState } from 'react';

export default LoadingWrapper = (WrappedComponent, loadingMessage) => {
  const HOC = props => {
    const [isLoading, setLoading] = useState(true);
    const setLoadingState = isComponentLoading => {
      setLoading(isComponentLoading);
    };

    return (
      <>
        {isLoading && <div style={{ color: 'red' }}>{loadingMessage}</div>}
        <WrappedComponent {...props} setLoading={setLoadingState} />
      </>
    );
  };

  return HOC;
};
