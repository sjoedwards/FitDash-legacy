import React from 'react';
import Home from './pages/home';
import Plan from './pages/plan';
import { useMachine } from '@xstate/react';
import  {RouterEvent, RouterContext, RouterState } from './machines/plan-machine'
import { State } from 'xstate';

import PageNotFound from './pages/page-not-found';

import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
interface Props {
    children: object,
    current: State<RouterContext, RouterEvent, RouterState>,
    send: Function
}

const ReactRouter = (props: Props) => {

    return (
    <Router>
        <div>
            {props.children}
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/plan">
                    {!props.current.matches('plan') ? <Redirect to="/" /> : <Plan current={props.current} send={(event:RouterEvent) => props.send(event)} />}
                </Route>
                <Route component={PageNotFound} />
            </Switch>
        </div>

    </Router>
)};

export default ReactRouter;
