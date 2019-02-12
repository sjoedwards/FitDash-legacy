import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/plan">Plan</Link>
            </li>
            <li>
                <Link to="/progress">Progress</Link>
            </li>
            <li>
                <Link to="/record">Record</Link>
            </li>
        </ul>
    );
};

export default Nav;
