import React from 'react';

const Search: React.FC = () => {
  return (
    <div>
      <h1>Search Page</h1>
      <form>
        <input type="text" placeholder="Search..." />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;