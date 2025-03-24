import React from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';
import SearchBar from '../SearchBar/SearchBar';

const PokemonList = ({ pokemonList, onSearch, onLoadMore, isLoading }) => {
  return (
    <div className="pokemon-list container">
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
          className="btn btn-primary"
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
