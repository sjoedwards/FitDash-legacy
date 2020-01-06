import React from 'react';
import Home from './pages/home';
import Plan from './pages/plan';
import { useMachine } from '@xstate/react';
import  planMachine, {RouterEvent, RouterContext, RouterState } from './machines/plan-machine'
import { State } from 'xstate';


import PageNotFound from './pages/page-not-found';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
interface Props {
    children: object,
    current: State<RouterContext, RouterEvent, RouterState>,
    send: Function
}

const ReactRouter = (props: Props) => {
    const [current, send] = useMachine(planMachine);

    return (
    <Router>
        <div>
            {props.children}
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/plan" component={() => <Plan current={current} send={(event:RouterEvent) => send(event)} />} />
                <Route component={PageNotFound} />
            </Switch>
        </div>

    </Router>
)};

export default ReactRouter;
