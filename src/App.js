import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import PokemonList from './components/PokemonList/PokemonList';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [error, setError] = useState(null);
  const [fetchedOffsets, setFetchedOffsets] = useState(new Set());

  const LIMIT = 20;

  const fetchPokemonList = useCallback(async (newOffset) => {
    if (fetchedOffsets.has(newOffset)) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${newOffset}&limit=${LIMIT}`
      );

      const detailedPokemon = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const detailResponse = await axios.get(pokemon.url);
          const speciesResponse = await axios.get(detailResponse.data.species.url);
          return {
            ...detailResponse.data,
            url: pokemon.url,
            species: speciesResponse.data,
          };
        })
      );

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setPokemons((prev) => {
        const newPokemons = [...prev, ...detailedPokemon];
        const uniquePokemons = Array.from(
          new Map(newPokemons.map((p) => [p.id, p])).values()
        );
        return uniquePokemons;
      });

      setFilteredPokemons((prev) => {
        const newFiltered = [...prev, ...detailedPokemon];
        const uniqueFiltered = Array.from(
          new Map(newFiltered.map((p) => [p.id, p])).values()
        );
        return uniqueFiltered;
      });

      setFetchedOffsets((prev) => new Set(prev).add(newOffset));

      detailedPokemon.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCount((prev) => prev + 1);
        }, 2000 * index);
      });
    } catch (error) {
      if (!navigator.onLine) {
        setError('No internet connection. Please check your network and try again.');
      } else {
        setError('Failed to fetch Pokémon data. Please try again later.');
      }
      console.error('Error fetching Pokémon:', error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchedOffsets, LIMIT]); // Dependencies for useCallback

  useEffect(() => {
    fetchPokemonList(offset);
  }, [offset, fetchPokemonList]); // Now safe to include fetchPokemonList

  const handleSearch = (searchQuery) => {
    if (!searchQuery.trim()) {
      setFilteredPokemons(pokemons);
      setVisibleCount(pokemons.length);
    } else {
      const filtered = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPokemons(filtered);
      setVisibleCount(filtered.length);
    }
  };

  const handleLoadMore = () => {
    if (isLoading) return;
    setOffset((prevOffset) => prevOffset + LIMIT);
    setVisibleCount(0);
  };

  if (error) {
    return (
      <div className="container text-center mt-5">
        <p className="text-danger">{error}</p>
        <button className="btn btn-primary" onClick={() => fetchPokemonList(offset)}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PokemonList
              pokemonList={filteredPokemons.slice(0, visibleCount)}
              onSearch={handleSearch}
              onLoadMore={handleLoadMore}
              isLoading={isLoading}
            />
          }
        />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
};

export default App;