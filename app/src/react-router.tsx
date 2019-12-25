import React from 'react';
import Home from './pages/home';
import Plan from './pages/plan';

import PageNotFound from './pages/page-not-found';

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
                <Route path="/plan/" component={Plan} />
                <Route component={PageNotFound} />
            </Switch>
        </div>

    </Router>
);

export default ReactRouter;
