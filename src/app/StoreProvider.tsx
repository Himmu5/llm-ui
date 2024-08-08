'use client';

import store from '@/store/store';
import React, { FC } from 'react';
import { Provider } from 'react-redux';

interface P {
    children: React.ReactNode
}

const ReduxProvider:FC<P> =({ children }) => {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;