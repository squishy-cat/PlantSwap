import './App.css';
import Header from './components/Header';
import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);
          setIsAuthenticated(true);
        });
      }
    });
  }, []);

  if (!isAuthenticated) {
    return (
    <div>
      <Header />
      <body>
        <Button>
          Please log in!
        </Button>
      </body>
    </div>
    );
  }

  return (
    <div className="App">
      <Router>{false ? <LoggedIn /> : <LoggedOut />}</Router>
      <header className="App-header">
        <Header />
      </header>
      <body>
        <Button>
          You're logged in!
        </Button>
      </body>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossorigin="anonymous"
      />
    </div>
  );
}

export default App;
