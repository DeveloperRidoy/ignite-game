import axios, { gamescreenshots, gameDetails } from "../../pages/api/axios";
import { motion } from "framer-motion";
import { useContext } from "react";
import styled from "styled-components";
import { currentGameContext } from "../../Hoc/GlobalState";
import { customImg } from "../../utils/actions";



const Game = ({ id, name, image, released }) => {

  const [, setCurrentGame] = useContext(currentGameContext) 
  
  const getGameDetail = (e) => {
    axios.get(gameDetails(id))
        .then(res => setCurrentGame(prevState => ({...prevState, game: res.data, showGameDetail: true})))
        .catch(err => console.log(err))
    
    axios.get(gamescreenshots(id))
        .then(res => setCurrentGame(prevState => ({...prevState, screenshots: res.data, showGameDetail: true})))
        .catch(err => console.log(err))
    }

    return (
      <GAME
        initial={{opacity: 0, scale: .5}}
        animate={{opacity: 1, scale: 1, transition: {duration: .5}}}
        layout
        layoutId={id}
        onClick={getGameDetail}
        onKeyPress={getGameDetail}
        tabIndex={0}
      >
            <motion.h4 layoutId={`title ${id}`}>{name}</motion.h4>
            <p>{released}</p>
            <motion.img layoutId={`image ${id}`} src={customImg(image, 420)} alt={name}/>
        </GAME>
    )
}

export default Game;


const GAME = styled(motion.div)`
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: .5rem;
  overflow: hidden;
  :focus {
    outline: none;

  }
  :hover {
    cursor: pointer;
  }
  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
  h4 {
    margin: 10px 15px;
    font-weight: bold;
    font-size: 1rem;
  }
`;