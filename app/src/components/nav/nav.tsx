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
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/plan">Plan</Link>
            </li>
        </ul>
    );
};

export default Nav;
