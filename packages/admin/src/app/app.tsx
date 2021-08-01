import React from 'react';
import {NavLink, Route, Switch} from 'react-router-dom';

import {About} from '../pages/about';
import {Home} from '../pages/home';

import styles from './app.module.css';

const PAGES = [
  {title: 'Home', path: '/', component: Home},
  {title: 'About', path: '/about', component: About},
];

export function App(): JSX.Element {
  return (
    <div>
      <nav className={styles.nav}>
        {PAGES.map(({title, path}) => (
          <NavLink key={path} to={path} exact>
            {title}
          </NavLink>
        ))}
      </nav>
      <main className={styles.main}>
        <Switch>
          {PAGES.map(({path, component}) => (
            <Route key={path} path={path} component={component} exact />
          ))}
        </Switch>
      </main>
    </div>
  );
}
