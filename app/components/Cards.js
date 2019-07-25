// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Cards.css';
import routes from '../constants/routes.json';
import { pokemonList } from '../actions/call-pokemon-api.js';
import SearchInput, { createFilter } from 'react-search-input';

type Props = {};

const KEYS_TO_FILTERS = ['name'];

const randomTheme = () => {
  const themes = ['primary', 'success' , 'secondary' , 'warning', 'danger', 'info'];
  return themes[Math.floor(Math.random() * themes.length)]
}


export default class Cards extends Component < Props > {
  props: Props;

  constructor(props) {
    super(props);
    this.searchUpdated = this.searchUpdated.bind(this);
    this.state = {
      searchTerm: '',
      results: [],
      sprites: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    pokemonList()
      .then(({
          results
        }) =>
        this.setState({
          results,
          isLoading: false
        })
      )
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }

  searchUpdated(term) {
    this.setState({
      searchTerm: term
    });
  }

  DivBreak(i) {
    if (props.i % 3 === 0){
      return <div className="w-100"></div>;
    }
  }

  render() {
    const {
      results,
      isLoading
    } = this.state;    
    const pokemons = results;
    const filteredPokemons = pokemons.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    // console.log(randomTheme());
    if (isLoading) {
      return <p > Loading... </p>
    }
    return (
      <div className={styles.cardHolder} data-tid="container">
        <SearchInput className="search-input form-group" onChange={this.searchUpdated} />
        <div className="row">
          {filteredPokemons.map((card , i) =>
            <div className="col-sm-6" key={i}>
              <Link className={`card bg-${randomTheme()} ${styles.spacing}`} to={{
                pathname: routes.CARD,
                state: { url: card.url }
              }}>{card.name}</Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}
