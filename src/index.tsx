import React from 'react';
import ReactDOM from 'react-dom';
import Application from './application';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Application />
    </PersistGate>
  </Provider>,
  rootElement
);
