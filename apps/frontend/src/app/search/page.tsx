import React from 'react';
import { appStrings } from "@terios/ui-config";
import styles from './page.module.scss';

const Search: React.FC = () => {
  return (
    <div>
      <h1>{appStrings.header.search}</h1>
      <form>
        <input type="text" placeholder={appStrings.header.search} />
        <button type="submit">{appStrings.header.search}</button>
      </form>
      <nav>
        <ul>
          <li>Users</li>
          <li>Goals</li>
          <li>Posts</li>
        </ul>
      </nav>
      <div className={styles.searchResults}>
        {/* Search results will be displayed here */}
      </div>
    </div>
  );
};

export default Search;