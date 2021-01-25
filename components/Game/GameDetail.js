import { motion } from "framer-motion";
import { useContext, useEffect } from "react"
import styled from "styled-components";
import { currentGameContext } from "../../Hoc/GlobalState"
import { customImg } from "../../utils/actions";

const GameDetail = () => {
    
  const [currentGame, setCurrentGame] = useContext(currentGameContext);

  const { game, screenshots } = currentGame;

  const closeGameDetail = (e) => {

    (e.target === e.currentTarget || e.key === "Escape") &&
      setCurrentGame((prevState) => ({
        ...prevState,
        showGameDetail: false,
      }));
  }

  //for getting platform images src depending on platform name
  const getPlatform = (platform) => {
    switch (platform) {
      case "PC":
        return "/img/steam.svg";
      case "PlayStation 4":
        return "/img/playstation.svg";
      case "PlayStation 5":
        return "/img/playstation.svg";
      case "Xbox Series S/X":
        return "/img/xbox.svg";
      case "Xbox One":
        return "/img/xbox.svg";
      case "Nintendo Switch":
        return "/img/nintendo.svg";
      case "iOS":
        return "/img/apple.svg";
      case "Android":
        return "/img/android.png";
      case "PSP":
        return "/img/playstation.svg";
      case "PS Vita":
        return "/img/playstation.svg";
      case "Linux":
        return "/img/linux.svg";
      case "macOS":
        return "/img/mac.png";
      default: "img/gamepad.svg"
    }
  }

  //get stars
  const getStars = () => {
    const stars = []
    const rating = Math.floor(game.rating);
    for (let i = 1; i <= 5; i++) {
      i <= rating
        ? stars.push({src: 'img/star-full.png', id: i})
        : stars.push({src: 'img/star-empty.png', id: i})
    }
    return stars.map(star => <img src={star.src} key={star.id}/> )
  }

  useEffect(() => {

    document.addEventListener('keyup', closeGameDetail)
    return () => {
      setCurrentGame((prevState) => ({
        ...prevState,
        game: { ...prevState.game, id: null },
      }));
      document.removeEventListener('keypress', closeGameDetail)
    }
  }, [])

  return (
    <CardShadow
      onClick={closeGameDetail}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <Detail layout layoutId={game.id} animate={{ opacity: 1 }}>
        <Stats>
          <Rating>
            <motion.h4 layoutId={`title ${game.id}`} animate={{ opacity: 1 }}>
              {game.name}
            </motion.h4>
            <h5>Rating: {game.rating}</h5>
            <Stars>{getStars()}</Stars>
          </Rating>
          <Info>
            <h4>Platforms</h4>
            <Platforms>
              {game.platforms.map((item) => (
                <img
                  key={item.platform.id}
                  src={getPlatform(item.platform.name)}
                />
              ))}
            </Platforms>
          </Info>
        </Stats>
        <Media>
          <motion.img
            animate={{ opacity: 1 }}
            layoutId={`image ${game.id}`}
            src={customImg(game.background_image, 640)}
            alt={game.name}
          />
        </Media>
        <Description>
          <p>{game.description_raw}</p>
        </Description>
        <Gallery>
          {screenshots.results.map((result) => (
            <img
              src={customImg(result.image, 640)}
              alt={game.name}
              key={result.id}
            />
          ))}
        </Gallery>
      </Detail>
    </CardShadow>
  );
}

export default GameDetail

//css

const CardShadow = styled(motion.div)`
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  :hover {
    cursor: pointer;
  }
  background: rgba(0, 0, 0, 0.5);
  &::-webkit-scrollbar {
    width: .5rem;
    background-color: white;
  }
  &::-webkit-scrollbar-thumb {
    background-color: dodgerblue;
  }
`;

const Detail = styled(motion.div)`
  width: 80%;
  margin: 1rem auto;
  position: absolute;
  top: 0;
  left: 10%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: white;
  :hover {
    cursor: default;
  }
  img {
    width: 100%;
  }
  @media (max-width: 900px) {
    padding: 2rem 1rem;
  }
`;

const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 900px) {
    display: block;
  }
`
const Rating = styled.div`
  h5 {
    margin-top: 7px;
  }
`

const Info = styled(motion.div)`
  max-width: 70%;
  @media (max-width: 900px) {
    margin-top: 1rem;
  }
`
const Platforms = styled(motion.div)`
 
  display: flex;
  flex-wrap: wrap;
  img {
    margin: .5rem;
    height: 2rem;
    width: 2rem;
  };
`
const Media = styled(motion.div)`
  margin-top: 2rem; 
`
const Description = styled(motion.div)`
  margin: 5rem 0;
`
const Gallery = styled(motion.div)``

const Stars = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  img {
    margin: .5rem .5rem .5rem 0;
    height: 2rem;
    width: 2rem;
  }
`