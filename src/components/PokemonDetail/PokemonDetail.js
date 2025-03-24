import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PokemonDetail.css';

const PokemonDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('About');

  if (!state || !state.pokemon) {
    return <p>Invalid Pokémon data. Please go back to the homepage.</p>;
  }

  const { id, name, height, weight, stats, types, abilities, sprites, species } = state.pokemon;

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

  // Calculate gender ratio from species data
  const genderRate = species.gender_rate; // gender_rate is a number from 0 to 8
  const femalePercentage = genderRate === -1 ? 'Genderless' : `${(genderRate / 8) * 100}%`;
  const malePercentage = genderRate === -1 ? 'Genderless' : `${((8 - genderRate) / 8) * 100}%`;

  // Get egg groups and species name
  const speciesName = species.genera.find((genus) => genus.language.name === 'en')?.genus || 'Unknown';
  const eggGroups = species.egg_groups.map((group) => group.name).join(', ') || 'Unknown';
  const eggCycle = species.hatch_counter ? `${species.hatch_counter} cycles` : 'Unknown';

  const tabs = ['About', 'Base Stats', 'Evolution', 'Moves'];

  return (
    <div className="pokemon-detail-container">
      <div className="pokemon-detail-header" style={{ backgroundColor }}>
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left"></i>
        </button>
        <h1 className="pokemon-name capitalize">{name}</h1>
        <p className="pokemon-id">#{String(id).padStart(3, '0')}</p>
        <div className="pokemon-types">
          {types.map((type) => (
            <span key={type.type.name} className={`type-badge type-${type.type.name}`}>
              {type.type.name}
            </span>
          ))}
        </div>
        <img src={sprites.front_default} alt={name} className="pokemon-image" />
      </div>

      <div className="pokemon-detail-body">
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'About' && (
          <div className="tab-content">
            <h3>Species</h3>
            <p>{speciesName}</p>
            <h3>Height</h3>
            <p>{(height / 10).toFixed(1)} m ({((height / 10) * 3.281).toFixed(1)} ft)</p>
            <h3>Weight</h3>
            <p>{(weight / 10).toFixed(1)} kg ({((weight / 10) * 2.205).toFixed(1)} lbs)</p>
            <h3>Abilities</h3>
            <p>{abilities.map((ability) => ability.ability.name).join(', ')}</p>
            <h3>Breeding</h3>
            <h4>Gender</h4>
            <p>♂ {malePercentage}, ♀ {femalePercentage}</p>
            <h4>Egg Groups</h4>
            <p>{eggGroups}</p>
            <h4>Egg Cycle</h4>
            <p>{eggCycle}</p>
          </div>
        )}

        {activeTab === 'Base Stats' && (
          <div className="tab-content">
            {stats.map((stat) => (
              <div key={stat.stat.name} className="stat-row">
                <span className="stat-name">{stat.stat.name.replace('-', ' ').toUpperCase()}</span>
                <span className="stat-value">{stat.base_stat}</span>
                <div className="stat-bar">
                  <div
                    className="stat-bar-fill"
                    style={{ width: `${(stat.base_stat / 255) * 100}%`, backgroundColor }}
                  ></div>
                </div>
              </div>
            ))}
            <p><strong>Total:</strong> {stats.reduce((sum, stat) => sum + stat.base_stat, 0)}</p>
          </div>
        )}

        {activeTab === 'Evolution' && (
          <div className="tab-content">
            <p>Evolution chain not implemented yet.</p>
          </div>
        )}

        {activeTab === 'Moves' && (
          <div className="tab-content">
            <p>Moves not implemented yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonDetail;