import { AnimatePresence, AnimateSharedLayout, motion, useViewportScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import styled from "styled-components";



const cardVariant = {
  hidden: {
    scale: 0,
    // opacity: 0,
  },

  show: {
    scale: 1,
    // opacity: 1,
  },

  exit: {
    scale: 0,
    opacity: 0,
    // transition: { duration: 1 , ease: 'easeOut'}
  },
};


const cards = {
  "circle-1": {show: false, selected: false, color: '255, 0, 0'},
  "circle-2": {show: false, selected: false, color: '0, 128, 0'},
  "circle-3": {show: false, selected: false, color: '30, 144, 255'},
  "circle-4": {show: false, selected: false, color: '255, 255, 0'},
};
export default function index() {
  
  const [showCards, toggleCards] = useState(cards);

  const toggleCardsHandler = (circle) => {
    toggleCards(prevState => {
      let newState = { ...prevState };
      newState[circle] = {...newState[circle], show: !newState[circle].show};
      return newState;
      })
    }
  
  const cardSelectingToggler = (circle) => {
    toggleCards(prevState => {
      const newState = { ...prevState }
      for (const key in newState) {
        key === circle
          ? (newState[key] = { ...newState[key], selected: !newState[key].selected })
          : (newState[key] = { ...newState[key], selected: false })
      }
      return newState
    })
  }
 
  const constrainsRef= useRef(null)
    return (
      <motion.div layout className="container py-5">
        <div className="d-flex justify-content-around mb-4">
          {Object.keys(showCards).map((circle) => (
            <Toggler
              layout
              key={circle}
              onClick={() => toggleCardsHandler(circle)}
            >
              <ToggleBackground
                animate={{
                  width: showCards[circle].show ? "120%" : "0%",
                  height: showCards[circle].show ? "120%" : "0%",
                }}
              />
              <div className="innerDiv">
                <motion.div
                  layout
                  className="toggle-button"
                  animate={{
                    x: showCards[circle].show && 18,
                    scale: showCards[circle].show ? 0.8 : 1,
                  }}
                />
              </div>
            </Toggler>
          ))}
        </div>
        <AnimateSharedLayout type="crossfade">
          <CriclesContainer layout ref={constrainsRef}>
            <AnimatePresence>
              {Object.entries(showCards).map(
                ([circle, state]) =>
                  state.show && (
                    <Circle
                      layout
                      layoutId={circle}
                      variants={cardVariant}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      key={circle}
                      onClick={() => cardSelectingToggler(circle)}
                      drag
                      dragConstraints={constrainsRef}
                    >
                      {state.selected && (
                        <OuterCircle l
                          layoutId="outercircle"
                          style={{background: `rgba(${state.color}, .3)`}}
                        />)}
                    </Circle>
                  )
              )}
            </AnimatePresence>
          </CriclesContainer>
        </AnimateSharedLayout>
      </motion.div>
    );
}

//css

const Toggler = styled(motion.button)`
  padding: 2rem 1.2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border: .5rem solid #1F1F1F;
  border-radius: 2rem;
  background: linear-gradient(40deg,#bb19c9,#ab1ed4);
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(0, 0, 0, .6);
  .innerDiv {
    background: #8E16A5;
    height: 1.4rem;
    width: 2.5rem;
    border-radius: 11px;
    display: flex;
    align-items: center;
    z-index: 1;
    .toggle-button {
      height:96%;
      width: 21px;
      border-radius: 50%;
      background: white;
    }
  }
`;

const ToggleBackground = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 2rem;
`
const CriclesContainer = styled(motion.div)`
  background: url(https://img5.goodfon.com/wallpaper/nbig/f/b6/gradient-abstraktsiia-sinii-linii-background.jpg)
    no-repeat;
  background-size: "cover";
  display: flex;
  justify-content: space-around;
  padding: 3rem;
  flex-wrap: wrap;
  border-radius: 5rem;
`;

const Circle = styled(motion.div)`
  height: 10rem;
  width: 10rem;
  border-radius: 10%;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const OuterCircle = styled(motion.div)`
  position: absolute;
  top: -1rem;
  left: -1rem;
  bottom: -1rem;
  right: -1rem; 
  border-radius: 10%;
`
