import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return(
    <div>
      <h1>Home component</h1>
      <Link to="/organizations">
        Organizations
      </Link>
    </div>
  );
}

export default Home;
