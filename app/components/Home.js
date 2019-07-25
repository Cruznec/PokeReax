// @flow
import React, { Component } from 'react';
import styles from './Home.css';
import Cards from './Cards';
import logo from '../public/pokeball.png';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container} data-tid="container">
        {/* <Link to={routes.COUNTER}>to Counter</Link> */}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to PokeReax</h1>
        </header>
        <Cards/>
      </div>
    );
  }
}
