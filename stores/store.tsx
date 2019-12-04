import { init, RematchRootState } from '@rematch/core';
import createRematchPersist, { getPersistor } from '@rematch/persist';
import React from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import models from './models/index'
import selectPlugin from '@rematch/select'

const persistPlugin = createRematchPersist({
  version: 1,
  storage: AsyncStorage,
});

const PERSIST_DATA = true;
export const store = init({
  models,
  plugins: PERSIST_DATA ? [persistPlugin, selectPlugin()] : [],
});

export const { select } = store

// Hot fix for web support
//@ts-ignore
global.__rematch_store = store;
//@ts-ignore
global.__rematch_dispatch = store.dispatch;

export type Store = typeof store
export type Dispatch = typeof store.dispatch
export type iRootState = RematchRootState<typeof models>

class Gate extends React.Component {
  render() {
    const { children } = this.props;

    if (!PERSIST_DATA) {
      return <Provider store={store}>{children}</Provider>;
    }
    return (
      <Provider store={store}>
        <PersistGate persistor={getPersistor()}>{children}</PersistGate>
      </Provider>
    );
  }
}

export default Gate;