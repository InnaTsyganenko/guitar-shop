import React from 'react';
import {Link} from 'react-router-dom';

function NotFoundScreen() {
  return (
    <div className="wrapper">
      <main className="page-content">
        <div className="container">
          <p>Oooops!</p>
          <h2>404. The page does not exist.</h2>
          <h3>Go to <Link to="/" style={{opacity: '50%', textDecoration: 'underline'}}> main page</Link>?</h3>
        </div>
      </main>
    </div>
  );
}

export default NotFoundScreen;
