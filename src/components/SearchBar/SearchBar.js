import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Pass the search query to the parent component
  };

  return (
    <form className="d-flex align-items-center" role="search">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search Pokemon..."
        aria-label="Search"
        value={query}
        onChange={handleInputChange}
      />
      <button className="btn btn-outline-success" type="button">
        <i className="bi bi-search"></i> {/* Bootstrap Search Icon */}
      </button>
    </form>
  );
};

export default SearchBar; // Ensure SearchBar is exported correctly
