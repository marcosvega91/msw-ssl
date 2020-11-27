import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {worker} from './mocks/browser'

worker.start({
  serviceWorker: {
    url: `${process.env.PUBLIC_URL}/mockServiceWorker.js`,
  },
}).then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
})

