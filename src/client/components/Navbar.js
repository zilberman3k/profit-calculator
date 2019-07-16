import React from 'react'
import {NavLink} from 'react-router-dom'
import Signout from './Auth/Signout'

const GuessNavbar = () => (
    <address>
        <ul className="topnav">
            <li>
                <NavLink to="/" exact={true}>Home</NavLink>
            </li>
            <li className="right">
                <NavLink to="/signin">Login</NavLink>
            </li>
            <li className="right">
                <NavLink to="/signup">Register</NavLink>
            </li>
            <li className="right">
                <NavLink to="/about">About</NavLink>
            </li>
        </ul>
    </address>
);

const AuthNavbar = () => (
    <address>
        <ul className="topnav">
            <li>
                <NavLink to="/" exact={true}>Home</NavLink>
            </li>
            <li className="right">
                <Signout/>
            </li>
            <li className="right">
                <NavLink to="/about">About</NavLink>
            </li>
            <li className="right">
                <NavLink to="/add-entry">Add Entry</NavLink>
            </li>
        </ul>
    </address>
);

const Navbar = ({session}) => {
    return (session && session.getCurrentUser) ? <AuthNavbar/> : <GuessNavbar/>
};


export default Navbar