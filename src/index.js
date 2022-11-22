import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import 'semantic-ui-css/semantic.min.css';

const customHistory = createBrowserHistory();


ReactDOM.render(

<Router history={customHistory}>
        <App />
</Router>,
  document.getElementById('root')
);
