import React from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';
import SearchBar from '../SearchBar/SearchBar';
import './PokemonList.css';

const PokemonList = ({ pokemonList, onSearch, onLoadMore, isLoading }) => {
  return (
    <div className="pokemon-list container">
      <h1 className="pokedex-title">Pokédex</h1>
      <SearchBar onSearch={onSearch} />
      <div className="row mt-4">
        {pokemonList.length > 0 ? (
          pokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <p className="text-center">No Pokémon found.</p>
        )}
      </div>
      <div className="text-center mt-4">
        <button
          className="btn btn-primary load-more-btn"
          onClick={onLoadMore}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  );
};

export default PokemonList;