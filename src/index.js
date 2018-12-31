import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import Nav from './components/nav';
import ReactRouter from './react-router';

const App = () => (
    <Fragment>
        <ReactRouter>
            <Nav />
        </ReactRouter>
    </Fragment>

);

ReactDOM.render(<App />, document.getElementById('app'));
