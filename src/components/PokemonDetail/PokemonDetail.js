import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PokemonDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.pokemon) {
    return <p>Invalid Pokémon data. Please go back to the homepage.</p>;
  }

  const { name, height, weight, base_experience, types, abilities, sprites } = state.pokemon;

  const pokemonTypeColors = {
    fire: '#FF6347',
    water: '#20B2AA',
    grass: '#228B22',
    electric: '#FFD700',
    psychic: '#8A2BE2',
    ghost: '#8B008B',
    bug: '#32CD32',
    fairy: '#FF1493',
    dragon: '#8B0000',
    ice: '#00CED1',
    normal: '#D3D3D3',
    rock: '#C6A500',
    poison: '#6A0DAD',
    ground: '#D2691E',
    fighting: '#B22222',
    steel: '#C0C0C0',
    dark: '#2F4F4F',
  };

  const primaryType = types[0]?.type.name || 'normal';
  const backgroundColor = pokemonTypeColors[primaryType] || '#D3D3D3';

  return (
    <div
      className="pokemon-detail"
      style={{
        backgroundColor,
        color: primaryType === 'electric' ? '#000' : '#fff',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
        maxWidth: '500px',
        margin: '20px auto',
      }}
    >
      <h1 className="capitalize">{name}</h1>
      <img src={sprites.front_default} alt={name} className="pokemon-image" />
      <p>Height: {height} decimetres</p>
      <p>Weight: {weight} hectograms</p>
      <p>Base XP: {base_experience}</p>
      <h3>Abilities:</h3>
      <ul>
        {abilities.map((ability) => (
          <li key={ability.ability.name}>{ability.ability.name}</li>
        ))}
      </ul>
      <button className="btn btn-primary" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};

export default PokemonDetail;
