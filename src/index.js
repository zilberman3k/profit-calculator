import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Client from './client'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Client/>, document.getElementById('root'));

serviceWorker.unregister();
