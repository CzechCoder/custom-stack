import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';

import { App } from '~/app';

import './globals.css';

ReactDOM.hydrate(<App />, document.getElementById('root'));
