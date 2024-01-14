import { Component } from 'react';

export class PokemonInfo extends Component {
  state = {
    pokemon: null,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pokemonName;
    const nextName = this.props.pokemonName;

    //тут завжди робити перевірку
    if (prevName !== nextName) {
      this.setState({ status: 'pending' });

      setTimeout(() => {
        fetch(`http://pokeapi.co/api/v2/pokemon/${nextName}`)
          .then(response => {
            if (response.ok) {
              return response.json();
            }

            return Promise.reject(new Error(`No name ${nextName}`));
          })

          .then(pokemon => this.setState({ pokemon, status: 'resolved' })) //передаємо в активний стейт імя покемона
          .catch(error => this.setState({ error, status: 'rejected' }));
      }, 1000);
    }
  }

  render() {
    const { pokemon, error, status } = this.state;

    if (status === 'idle') {
      return <div>Enter pokemon name</div>;
    }

    if (status === 'pending') {
      return <div>Loading...</div>;
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }

    if (status === 'resolved') {
      return (
        <div>
          <p>{pokemon.name}</p>
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            width="240"
          />
        </div>
      );
    }
  }
}
