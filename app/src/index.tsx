import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { useMachine } from '@xstate/react';

import Nav from './components/nav/nav';
import ReactRouter from './react-router';
import './myStyles.scss';
import  planMachine, {RouterEvent, RouterContext, RouterState } from './machines/plan-machine'

import configureStore, { history } from './configureStore';

const store = configureStore(/* provide initial state if any */);

const App = () => {

    const [current, send] = useMachine(planMachine);
    return (
        <Fragment>
            <div className="state-monitor">
                <p>State: <pre>{JSON.stringify(current.value)}</pre></p>
                <p>Context: <pre>{JSON.stringify(current.context, null, 1 )}</pre></p>
            </div>
            <Provider store={store}>
                <ReactRouter current={current} send={send}>
                    <Nav current={current} send={(event:RouterEvent) => send(event)}/>
                </ReactRouter>
            </Provider>
        </Fragment>
    )
};

ReactDOM.render(<App />, document.getElementById('app'));
