import React from 'react';
import Home from './components/pages/home';
import Plan from './components/pages/plan';
import Diary from './components/pages/progress';
import Record from './components/pages/record'
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
                <Route path="/plan/" component={Plan} />
                <Route path="/progress/" component={Diary} />
                <Route path="/record/" component={Record} />
                <Route component={PageNotFound} />
            </Switch>
        </div>

    </Router>
);

export default ReactRouter;
