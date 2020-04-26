import React from 'react';
import classes from './Navigation.module.css';
import {NavLink} from 'react-router-dom';

console.log(classes)
const Navigation = () => {
    return (
        <ul className={classes.ul}>
          <li><NavLink to='/profile' activeClassName={classes.activeLink}>
            Profile
            </NavLink>
          </li>
          <li><NavLink to='/dialogs' activeClassName="selected">Dialogs</NavLink></li>
          <li>News</li>
          <li>Music</li>
          <li>Settings</li>
          <li><NavLink to='/workplaces'>
            workplace
            </NavLink></li>
        </ul>
    )
};

export default Navigation;