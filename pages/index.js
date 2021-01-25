import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import Head from 'next/head'
import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import Game from '../components/Game/Game';
import GameDetail from '../components/Game/GameDetail';
import { Context, currentGameContext } from '../Hoc/GlobalState';


export default function Home () {

  const [{ popular, newGames, upcoming, searched }] = useContext(Context)
  const [ currentGame ] = useContext(currentGameContext)

  useEffect(() => {
    document.body.style.overflow = currentGame.showGameDetail
      ? "hidden"
      : "auto";
  }, [currentGame.showGameDetail])

  return (
    <div>
      <Head>
        <title>Ignite</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GameList>
        <AnimateSharedLayout type="crossfade">
          <AnimatePresence>
            {currentGame.showGameDetail &&
              currentGame.game &&
              currentGame.game.id &&
              currentGame.screenshots && (
                <GameDetail key={`${currentGame.game.name}-gamedetail`} />
              )}
          </AnimatePresence>
          {searched.length > 0 && (
            <div>
              <h2>Searched games</h2>
              <Games layout>
                {searched.map((game) => (
                  <Game
                    key={game.id}
                    id={game.id}
                    name={game.name}
                    released={game.released}
                    image={game.background_image}
                  />
                ))}
              </Games>
            </div>
          )}
          <h2>Upcoming games</h2>
          <Games layout>
            {upcoming.map((game) => (
              <Game
                key={game.id}
                id={game.id}
                name={game.name}
                released={game.released}
                image={game.background_image}
              />
            ))}
          </Games>
          <h2>Popular games</h2>
          <Games layout>
            {popular.map((game) => (
              <Game
                key={game.id}
                id={game.id}
                name={game.name}
                released={game.released}
                image={game.background_image}
              />
            ))}
          </Games>
          <h2>New games</h2>
          <Games layout>
            {newGames.map((game) => (
              <Game
                key={game.id}
                id={game.id}
                name={game.name}
                released={game.released}
                image={game.background_image}
              />
            ))}
          </Games>
        </AnimateSharedLayout>
      </GameList>
    </div>
  );
}

//css
const GameList = styled(motion.div)`
  padding: 1rem 5rem;
  h2 {
    margin-bottom: 2rem;
  }
  @media (max-width: 600px) {
    padding: 1rem;
  }
`
const Games = styled(motion.div)`
  margin: 0 0 3rem 0;
  min-height: 80vh;
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));     
  grid-gap: 3rem;
`;

