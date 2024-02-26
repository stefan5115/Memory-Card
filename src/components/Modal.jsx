// eslint-disable-next-line react/prop-types
function Modal({activeButton,handleButtonClick,handleButton}) {
  return (
    <div className="flex flex-col bg-modal w-screen h-screen z-10 fixed top-0 left-0 justify-center items-center gap-5">
        <p className="text-2xl">What would you like to do?</p>
        <div className="flex flex-col gap-2">
            <button className={activeButton === 'easy' ? 'inactiveButton':'activeButton'} onClick={() => handleButtonClick('easy')}>Easy</button>
            <button className={activeButton === 'medium' ? 'inactiveButton':'activeButton'} onClick={() => handleButtonClick('medium')}>Medium</button>
            <button className={activeButton === 'hard' ? 'inactiveButton':'activeButton'} onClick={() => handleButtonClick('hard')}>Hard</button>
        </div>
        <button className="activeButton" onClick={handleButton}>START GAME</button>
    </div>
  )
}

export default Modal
