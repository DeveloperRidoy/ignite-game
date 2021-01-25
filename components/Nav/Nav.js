import { motion } from "framer-motion"
import { useState, useContext } from "react";
import styled from "styled-components"
import { Context } from "../../Hoc/GlobalState";
import Axios, { searchGames } from "../../pages/api/axios";

export default function Nav () {

    const [searchInput, setSearchInput] = useState('');

    const [, setGames] = useContext(Context)
 
    const searchGamesHandler = (e) => {
        e.preventDefault();
        Axios.get(searchGames(searchInput))
            .then(res => {
                setGames(prevState => ({...prevState, searched: res.data.results}))
            })
            .catch(err => console.log(err))
        setSearchInput('')
    }

    return (
      <StyledNav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: .5 } }}
        exit={{ opacity: 0, transition: { duration: .5 } }}
      >
        <Logo onClick={() => setGames(prevState => ({...prevState, searched: []}))}>
          <img src="/img/logo.svg" alt="ignite" />
          <p>Ignite</p>
        </Logo>
        <Search>
          <form onSubmit={searchGamesHandler}>
            <input type="text" onInput={(e) => setSearchInput(e.target.value)} value={searchInput}/>
            <button type="submit">Search</button>
          </form>
        </Search>
      </StyledNav>
    );
}



//css
const StyledNav = styled(motion.div)`
    padding: 2rem 0 1rem 0;
    display: flex;
    flex-flow: column;
    align-items: center;
`

const Logo = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    :hover {
        cursor: pointer;
    }
    img {
        height: 2rem;
        width: 2rem;
    }
    p {
        margin: 0;
        font-weight: bold;
        font-size: 1.5rem;
    }
`;

const Search = styled(motion.div)`
  margin: 1rem 0;
  input {
    width: 21rem;
    border: none;
    outline: none;
    box-shadow: 0 0 30px rgb(0, 0, 0, 0.3);
    padding: 7px;
    font-weight: bold;
  }
  button {
    border: none;
    background: #4e4949;
    color: white;
    border-radius: 0 4px 4px 0;
    padding: 7px 9px;
    :active {
      background: #292626;
    }
  }
  @media (max-width: 800px) {
    input {
      width: 15rem;
    }
  }
`;