import React from 'react';

export default ({ search, handleSearch, setSearch }) => (
  <div>
    <input value={search.searchText} onChange={e => setSearch({...search, searchText: e.target.value})} />
    <button onClick={handleSearch}>Search</button>
  </div>
);
