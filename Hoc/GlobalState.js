import { createContext, useState, useEffect } from "react"
import ErrorPage from "../components/Spinner/ErrorPage/ErrorPage";
import { POPULAR, UPCOMING, NEW } from '../utils/actions'
import axios, { popularGames, newGames, upcomingGames } from '../pages/api/axios';

export const Context = createContext(null);
export const ErrorContext = createContext(null)
export const currentGameContext = createContext(null)

const GlobalState = ({children}) => {
    
    const initialState = {
        popular: [],
        newGames: [],
        upcoming: [],
        searched: [],
    };
      const getGames = (action) => {
        switch (action) {
          case POPULAR:
            axios
              .get(popularGames)
              .then((res) => {
                setError(false);
                setGames((prevState) => ({ ...prevState, popular: res.data.results }));
              })
              .catch((err) => {
                setError(true);
                console.log(err);
              });
            break;
          case UPCOMING:
            axios
              .get(upcomingGames)
              .then((res) => {
                setError(false);
                setGames((prevState) => ({ ...prevState, upcoming: res.data.results }));
              })
              .catch((err) => {
                setError(true);
                console.log(err);
              });
          case NEW:
            axios
              .get(newGames)
              .then((res) => {
                setError(false);
                setGames((prevState) => ({ ...prevState, newGames: res.data.results }));
              })
              .catch((err) => {
                setError(true);
                console.log(err);
              });
            break;
        }
      };

  useEffect(() => {
        getGames(UPCOMING);
        getGames(POPULAR);
        getGames(NEW);
      }, []);
    
    
    const [games, setGames] = useState(initialState)
    const [error, setError] = useState(false)
    const [currentGame, setCurrentGame] = useState({
      game: {
        id: null,
        name: null,
      },
      screenshots: null,
      showGameDetail: false
    });

    
  
    return (
      <Context.Provider value={[games, setGames]}>
        <currentGameContext.Provider value={[currentGame, setCurrentGame]}>
          <ErrorContext.Provider value={[error, setError]}>
            {error ? <ErrorPage /> : children}
          </ErrorContext.Provider>
        </currentGameContext.Provider>
      </Context.Provider>
    );
}

export default GlobalState