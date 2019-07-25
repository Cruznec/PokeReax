// @flow
import React, { Component } from 'react';
import styles from './Card.css';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import { pokemonDetails } from '../actions/call-pokemon-api.js';

type Props = {};

export default class Card extends Component<Props>{
    props: Props;

    constructor(props) {
        super(props);
        this.state = {
        results: [],
        isLoading: false,
        error: null,
        };
    }

    symbolType(type){
        const typeSymbol = {
            "Bug" : "🐛",
            "Water" : "💧",
            "Grass" : "☘️",
            "Fire" : "🔥",
            "Electric" : "⚡",
            "Normal" : "❤️",
            "Poison" : "🐍"
        };
        return typeSymbol[type];
    }
    componentDidMount() {
        const {url} = this.props.location.state;
        this.setState({
        isLoading: true
        });
        this.setState({
            isLoading: true
          });
          pokemonDetails(url)
            .then((singlePokemonInfo) =>
              this.setState({
                pokemon: singlePokemonInfo,
                isLoading: false
              })
            )
            .catch(error => this.setState({
                error,
                isLoading: false
            }));
    }

    render() {
        const {
            pokemon,
            isLoading,
            error
        } = this.state;
        // console.log(this.bgType("Grass"));
        return(
            <div className={styles.cardHolder} data-tid="container">
                <Link to={routes.HOME}>
                    <i className="fa fa-arrow-left fa-3x" />
                </Link>
                { pokemon &&
                <div className={`card offset-3 col-5 bg-secondary ${styles.pokemonCard} ${styles[pokemon.type]}`}>
                    <div className="row">
                        <h5 className="card-title col-8 text-left">
                            <img className={styles.pokeball} 
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dream-world/poke-ball.png"/>
                            &nbsp;
                            <SpanText className="" text={pokemon.name} />
                        </h5>
                        <div className="poke-details col-4 text-right">
                            <SpanText className="" text={`${this.symbolType(pokemon.type)} ${pokemon.hp}`}/>
                        </div>
                    </div>
                    <div className="row col-12 text-center">
                        <img className={styles.pokemonImg} src={pokemon.img} />
                    </div>
                    <div className="card-body">
                        <div className={styles.pokestats}>
                            <div className="row">
                                <SpanText className="text-center col-4" text={pokemon.height} />
                                <SpanText className="text-center col-4" text={pokemon.type} />
                                <SpanText className="text-center col-4" text={pokemon.weight} />
                            </div>
                            <div className="row">
                                <SpanText className="text-center col-4" text="Height" />
                                <SpanText className="text-center col-4" text="Type" />
                                <SpanText className="text-center col-4" text="Weight" />
                            </div>
                        </div>
                        <p className="card-text">{pokemon.info}</p>
                    </div>
                </div>
                }
            </div>
        );
    }
}

class SpanText extends React.Component {
    render() {
        return <span className={this.props.className}>{this.props.text}</span>;
    }
}  