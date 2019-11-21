import React from 'react';
import Home from './components/pages/home';
import Cycles from './components/pages/cycles';

import PageNotFound from './components/pages/page-not-found';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
interface Props {
    children: object;
}

const ReactRouter = (props: Props) => (
    <Router>
        <div>
            {props.children}
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/cycles/" component={Cycles} />
                <Route component={PageNotFound} />
            </Switch>
        </div>

    </Router>
);

export default ReactRouter;
