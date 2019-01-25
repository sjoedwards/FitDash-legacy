import React from 'react';
import PropTypes from 'prop-types'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Index = () => <h2>Home</h2>;
const Plan = () => <h2>Plan</h2>;
const Log = () => <h2>Log</h2>;
const Workout = () => <h2>Workout</h2>;
const CatchAll = () => <h2>No Route Found</h2>;

interface Props {
    children: object;
}


const ReactRouter = (props: Props) => (
    <Router>
        <div>
            {props.children}
            <Switch>
                <Route path="/" exact component={Index} />
                <Route path="/plan/" component={Plan} />
                <Route path="/log/" component={Log} />
                <Route path="/workout/" component={Workout} />
                <Route component={CatchAll} />
            </Switch>
        </div>

    </Router>
);

ReactRouter.propTypes = {
    children: PropTypes.object
};

export default ReactRouter;
