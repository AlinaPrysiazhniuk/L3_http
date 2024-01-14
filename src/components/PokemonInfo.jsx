import { Component } from 'react';

export class PokemonInfo extends Component {
  state = {
    pokemon: null,
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pokemonName;
    const nextName = this.props.pokemonName;

    //тут завжди робити перевірку
    if (prevName !== nextName) {
      console.log('name changed');

      this.setState({ loading: true });
      setTimeout(() => {
        fetch(`http://pokeapi.co/api/v2/pokemon/${nextName}`)
          .then(response => {
            if (response.ok) {
              return response.json();
            }

            return Promise.reject(new Error(`No name ${nextName}`));
          })

          .then(pokemon => this.setState({ pokemon })) //передаємо в активний стейт імя покемона
          .catch(error => this.setState({ error }))
          .finally(() => this.setState({ loading: false }));
      }, 1000);
    }
  }

  render() {
    const { pokemon, loading, error } = this.state;
    const { pokemonName } = this.props;

    return (
      <div>
        {error && <h1>{error.message}</h1>}
        {loading && <div>Loading...</div>}
        {!pokemonName && <div>Enter pokemon name</div>}
        {pokemon && (
          <div>
            <p>{pokemon.name}</p>
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              width="240"
            />
          </div>
        )}
      </div>
    );
  }
}