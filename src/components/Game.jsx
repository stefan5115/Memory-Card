
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import Card from "./Card";
import {Howl} from 'howler'
import correct from '/src/sound/correct.mp3'
import lose from '/src/sound/lose.mp3'
import win from '/src/sound/win.mp3'

function shuffle(array) {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function Game({items, handleLevelUp,difficulty,handleQuit,sound}) {

  const [isFlipped, setIsFlipped] = useState(false);
  const [list, setList] = useState(items);
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [levelScore, setLevelScore] = useState(0)
  const [clickedCards, setClickedCards] = useState([])
  const [isGameOver, setIsGameOver] = useState(false)
  const [isGameWon, setIsGameWon] = useState(false)

  const soundCorrect = new Howl({
    src:[correct]
  })

  const soundLose = new Howl({
    src:[lose]
  })

  const soundWin = new Howl({
    src:[win]
  })

  useEffect(() => {
    const mountArray = shuffle(items);
    setList(mountArray);

  }, [items]);

  const handleCardClick = (item) => {
    setIsFlipped(true);
    setTimeout(() => {
      const changes = shuffle([...list]);
      setList(changes);
      console.log("Shuffle", items, changes);

      setTimeout(() => {

        setIsFlipped(false);

        if(clickedCards.includes(item)){
          setIsGameOver(true)
          setIsGameWon(false)
          setClickedCards([])
          soundLose.play()
        }else{
          setClickedCards([...clickedCards,item])
          setScore(score + 1)
          setLevelScore(levelScore + 1)
          setHighScore(Math.max(score + 1, highScore))
          soundCorrect.play()
          if(clickedCards.length + 1 === items.length){
            setIsGameWon(true)
            setLevelScore(0)
            soundWin.play()
          }
        }
      }, 1000);
    }, 1000);
  }

  const handlePlayAgain = () => {
    setIsGameOver(false);
    setIsGameWon(false);
    setClickedCards([]);
    setScore(0);
    setLevelScore(0)
    setList(shuffle(items));
    sound.play()
  };

  const handleNextDifficulty = () => {
    setIsGameWon(false)
    handleLevelUp()
    sound.play()
  }

  return (
    <div>
      {
        isGameWon && (
          <div className="flex flex-row bg-modal w-screen h-screen z-10 fixed top-0 left-0 justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-5">
              <p className="text-4xl">You Win!</p>
              <img className="max-w-[250px] max-h-[150px]" src="/src/image/chicken.gif" alt="" />
              <p>Your final score is {score}</p>
              <div className="flex flex-col gap-2">
                {difficulty !== 'hard' && <button onClick={handleNextDifficulty} className="activeButton">Keep Playing</button>}
                <button onClick={handlePlayAgain} className="activeButton">Play again</button>
                <button onClick={handleQuit} className="activeButton">Quit</button>
              </div>
            </div>
          </div>
        )
      }

      {
        isGameOver && (
          <div className="flex flex-row bg-modal w-screen h-screen z-10 fixed top-0 left-0 justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-5">
              <p className="text-4xl">Game Over!</p>
              <img className="max-w-[250px] max-h-[150px]" src="/src/image/strider.gif" alt="" />
              <p>Your final score is {score}</p>
              <div className="flex flex-col gap-2">
                <button onClick={handlePlayAgain}  className="activeButton">Play Again</button>
                <button onClick={handleQuit} className="activeButton">Quit</button>
              </div>
            </div>
          </div>
        ) 
      }

      <div className="flex flex-col justify-center items-center " >
        <img src="/src/image/logo.png" alt="logo" className="w-[300px] h-[100px] mt-[10px]" onClick={handleQuit}/>
        <div className="flex gap-[24px] justify-center text-2xl m-[20px]">
          <p>Score: {score}</p>
          <p>High Score: {highScore}</p>
        </div>
      </div>
      
      


      <div className="flex flex-col justify-center items-center ">
        <p className="m-[20px]">{levelScore}/{items.length}</p>
        <div className="card-deck flex flex-wrap gap-[18px] justify-center">
          {list.map((item,index) => (
            <Card
              key={index}
              item={item}
              isFlipped={isFlipped}
              onClick={() => handleCardClick(item)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Game
