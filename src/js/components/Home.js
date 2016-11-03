import React from 'react';
import { Link } from 'react-router';

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <h1>Cards for Humanity</h1>
        <Link to='/signup'>Sign up</Link>
      </div>
    )
  }
};
