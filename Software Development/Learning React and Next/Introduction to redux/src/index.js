import React from 'react';
import ReactDOM from 'react-dom/client';

// The Provider from the react-redux
// It has a store prop to be set
// Should wrap as highest component as possible
// in the component tree 
import { Provider } from 'react-redux';

import './index.css';
import App from './App';

// Our store
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
