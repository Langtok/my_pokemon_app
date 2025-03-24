import React, { useState, useEffect } from 'react';
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

  const LIMIT = 20;

  const fetchPokemonList = async (newOffset) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${newOffset}&limit=${LIMIT}`
      );

      const detailedPokemon = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const detailResponse = await axios.get(pokemon.url);
          return { ...detailResponse.data, url: pokemon.url };
        })
      );

      
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setPokemons((prev) => [...prev, ...detailedPokemon]);
      setFilteredPokemons((prev) => [...prev, ...detailedPokemon]);

      
      detailedPokemon.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCount((prev) => prev + 1);
        }, 2000 * index);
      });
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    
    fetchPokemonList(offset);
  }, [offset]);

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
    setOffset((prevOffset) => prevOffset + LIMIT);
    setVisibleCount(0);
  };

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