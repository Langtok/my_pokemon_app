import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <form className="search-bar d-flex align-items-center" role="search">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search Pokémon..."
        aria-label="Search"
        value={query}
        onChange={handleInputChange}
      />
      <button className="btn btn-outline-success" type="button">
        <i className="bi bi-search"></i>
      </button>
    </form>
  );
};

export default SearchBar;