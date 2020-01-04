import React from 'react';
import { RouterEvent, RouterContext, RouterState } from '../../machines/plan-machine'
import { Link } from 'react-router-dom'
import { State } from 'xstate';

interface Props {
    current: State<RouterContext, RouterEvent, RouterState>,
    send: Function
  }

const Nav = (props: Props) => {
    return (
        <ul>
            <li>
                <div>Home</div>
            </li>
            <li>
                <Link to="/plan" onClick={() => props.send('CHANGE_ROUTE_PLAN')}>Plan</Link>
            </li>
        </ul>
    );
};

export default Nav;
