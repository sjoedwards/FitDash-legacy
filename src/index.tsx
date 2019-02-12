import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Nav from './components/nav/nav';
import ReactRouter from './react-router';
import './myStyles.scss';;

import configureStore, { history } from './configureStore';

const store = configureStore(/* provide initial state if any */);

const App = () => (
    <Fragment>
        <Provider store={store}>
            <ReactRouter>
                <Nav />
            </ReactRouter>
        </Provider>
    </Fragment>

);

ReactDOM.render(<App />, document.getElementById('app'));
