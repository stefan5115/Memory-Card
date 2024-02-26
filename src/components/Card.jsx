/* eslint-disable react/prop-types */
function Card({item,isFlipped,onClick}) {
  return (
    <div className={`card h-[250px] w-[180px] flex flex-col justify-center items-center ${isFlipped ? 'is-flipped' : ''}`} onClick={onClick}>
      <div className="card-inner flex flex-row gap-2">
        <div className="flex flex-col justify-center items-center bg-modal/20">
          <img src={item.image} className="h-[200px] w-[100%] [image-rendering:_pixelated]" ></img>
          <p className="text-center">{item.name}</p>
        </div>
        <div className="card-back">
          <img src="/src/image/back-card.jpg" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Card
