import React, { Component } from 'react';

import PokemonCard from './PokemonCard';
import Loading from '../layout/Loading';
import axios from 'axios';

export default class PokemonList extends Component {
  state = {
    url: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=300',
    pokemon: null
  };

  componentDidMount() {
    const app = this;
    axios.get(this.state.url).then(function(res){
      app.setState({ pokemon: res.data['results'] });
    })
  }

  render() {
    return (
      <div>
        {this.state.pokemon ? (
          <div className="row">
            {this.state.pokemon.filter(el => {
              if(typeof el.name === typeof undefined || typeof this.props.search !== typeof "string"){
                return false;
              }
                return el.name.toLowerCase().includes(this.props.search.toLowerCase().trim());
            }).map(pokemon => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
              />
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}