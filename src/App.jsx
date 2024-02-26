import axios from 'axios'
import {  useEffect } from 'react'
import { useState } from 'react'
import {Howl} from 'howler'
import buttonSound from '/src/sound/click.mp3'

import Game from "./components/Game"
import Modal from "./components/Modal"


function App() {
  const [activeButton, setActiveButton] = useState(null)
  const [soundPlayed, setSoundPlayed] = useState({}) 
  const [items, setItems] = useState([])
  const [random, setRandom] = useState([])
  const [difficulty, setDifficulty] = useState('')
  const sound = new Howl({
    src:[buttonSound]
  })  

  useEffect(() => {
    async function fectchItems(){
      try{
          const response = await axios.get('https://minecraft-api.vercel.app/api/items')
          const allItems = response.data
          setItems(allItems)
          console.log(allItems)
      }catch (error){
          console.error('Error fetching items:', error)
      }
    }
    fectchItems()
  },[])

 

  const randomItems = () => {
    const tempArray = [...items]
    const selectedNumbers = []

    let numItems = 0;
    switch (difficulty) {
      case 'easy':
        numItems = 5;
        break;
      case 'medium':
        numItems = 10;
        break;
      case 'hard':
        numItems = 18;
        break;
      default:
        numItems = 5;
    }

    for (let i = 0; i < [numItems]; i++){
      const randomIndex = Math.floor(Math.random() * tempArray.length)
      selectedNumbers.push(tempArray[randomIndex])
      tempArray.splice(randomIndex, 1)
    }
    setRandom(selectedNumbers)
  }

  const handleLevelUp = () => {

    switch (difficulty) {
      case 'easy':
        setDifficulty('medium');
       
        break;
      case 'medium':
        setDifficulty('hard');
        
        break;
        case 'hard':
       
        
        break;
      default:
        setDifficulty('easy');
    }
  };

  useEffect(() => {
    randomItems();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);


  

  const handleButtonClick = (buttonName) => {
    if(buttonName !== activeButton){
        sound.play()
        setSoundPlayed({...soundPlayed, [buttonName]: true})
    }
    setActiveButton(buttonName) 
    setDifficulty(buttonName)
  }


  const [showFirstChild, setShowFirstChild] = useState(true);
  const [showSecondChild, setShowSecondChild] = useState(false);

  const handleButton = () => {
    setShowFirstChild(false);
    setShowSecondChild(true);
    sound.play()
    randomItems()
  };

  const handleQuit = () => {
    setShowFirstChild(true)
    setShowSecondChild(false)
    setActiveButton(null)
    sound.play()
  }
  
  return (
    <div> 
    {showFirstChild && (<Modal activeButton={activeButton} handleButtonClick={handleButtonClick} handleButton={handleButton}></Modal>)}
    {showSecondChild && (<Game items={random}  handleLevelUp={handleLevelUp}  difficulty={difficulty} handleQuit={handleQuit} sound={sound}></Game>)}
    </div>
  )
}

export default App
