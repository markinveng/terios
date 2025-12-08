import React from 'react';
import { appStrings } from "@terios/ui-config";


const Topic: React.FC = () => {
  return (
    <div>
      <h1>{appStrings.header.topics}</h1>
      <p>Welcome to the Topic page!</p>
      <h2>注目の目標</h2>
      <ul>
        <li>Topic</li>
        <li>Topic</li>
        <li>Topic</li>
      </ul>
      <h2>注目のユーザー</h2>
      <ul>
        <li>User</li>
        <li>User</li>
        <li>User</li>
      </ul>
    </div>
  );
};

export default Topic;