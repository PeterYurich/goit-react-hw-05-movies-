import React from 'react';

import { NavLink } from 'react-router-dom';
import css from './Navbar.module.css';

export function Navbar() {
  return (
    <div className={css.Header}>
      <div className={css.logo}>💻</div>
      <nav>
        <ul className={css.nav_list}>
          <li className={css.nav_item}>
            <NavLink className={css.nav_link} to="/" end>
              Home
            </NavLink>
          </li>
          <li className={css.nav_item}>
            <NavLink className={css.nav_link} to="/movies">
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
