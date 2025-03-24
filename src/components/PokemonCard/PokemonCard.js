import React from 'react';
import { Link } from 'react-router-dom';

const PokemonCard = ({ pokemon }) => {
  const { id, name, types, sprites } = pokemon;

  const fetchBackgroundColor = () => {
    if (!types || types.length === 0) return '#f8f9fa';

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

    const primaryType = types[0].type.name;
    return pokemonTypeColors[primaryType] || '#f8f9fa';
  };

  return (
    <div className="col-lg-2 col-md-3 col-sm-6 mb-4">
      <div className="card h-100 text-center" style={{ backgroundColor: fetchBackgroundColor() }}>
        <img
          src={sprites.front_default}
          className="card-img-top img-fluid"
          alt={name}
        />
        <div className="card-body">
          <h5 className="card-title text-capitalize">{name}</h5>
          <Link to={`/pokemon/${id}`} state={{ pokemon }} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
