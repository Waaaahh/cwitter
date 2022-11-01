import AppRouter from 'components/Router'
import {useState} from 'react'
import { authService } from 'myBase'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn}/>
      <footer>&copy; {new Date().getFullYear()} Cwitter</footer>
    </>
  );
}

export default App;
