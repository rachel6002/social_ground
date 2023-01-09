import React from 'react';
import LoadingIcon from '../icons/loadingcircle.gif';

function Loading() {
  return <img src={LoadingIcon} alt="loading" id="loading" data-testid="loading" />;
}

export default Loading;
