import React from 'react';
import { PlanContext } from '../../machines/plan-machine'
import { Link } from 'react-router-dom'
import { State } from 'xstate';

const Nav = () => {
    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/plan">Plan</Link>
            </li>
        </ul>
    );
};

export default Nav;
