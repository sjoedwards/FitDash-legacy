import React from 'react';
import Home from './pages/home';
import Plan from './pages/plan';
import { useMachine } from '@xstate/react';
import  planMachine, {RouterEvent, RouterContext, RouterState } from './machines/plan-machine'

import PageNotFound from './pages/page-not-found';

import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
interface Props {
    children: object;
}

const ReactRouter = (props: Props) => {
    const [current, send] = useMachine(planMachine);

    return (
    <Router>
        <div>
            <div className="state-monitor">
                <p>State: <pre>{JSON.stringify(current.value)}</pre></p>
                <p>Context: <pre>{JSON.stringify(current.context, null, 1 )}</pre></p>
            </div>
            {props.children}
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/plan">
                    {!current.matches('plan') ? <Redirect to="/" /> : <Plan current={current} send={(event:RouterEvent) => send(event)} />}
                </Route>
                <Route component={PageNotFound} />
            </Switch>
        </div>

    </Router>
)};

export default ReactRouter;
