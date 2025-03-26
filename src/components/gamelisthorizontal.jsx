import React from 'react'

const GameListHorizontal = () => {
    const games=[
        {name: 'Game 1', image: 'game1.jpg', score: 90},
        {name: 'Game 2', image: 'game2.jpg', score: 80},
        {name: 'Game 3', image: 'game3.jpg', score: 70},
        {name: 'Game 4', image: 'game4.jpg', score: 60},
        {name: 'Game 5', image: 'game5.jpg', score: 50},
        {name: 'Game 6', image: 'game6.jpg', score: 40},
        {name: 'Game 7', image: 'game7.jpg', score: 30},
        {name: 'Game 8', image: 'game8.jpg', score: 20},
    ]
  return (
    <div className="w-full bg-gradient-to-b from-[#f72424] to-[#bb1c00] hover:opacity-90">
        <div className="flex  px-4  ">
            {games.map((game) => (
              <li className="relative border-r border-gray-300 after:content-[''] after:absolute after:top-0 after:right-0 after:h-full after:w-[1px] after:bg-gray-400 after:shadow-md mx-2 list-none px-1.5 text-center ">
                     
                <b> {game.name}</b>
                    
               </li>
            ))}
            <div className="lg:hidden">
                <button className="flex items-center px-6 py-3 text-white transition duration-300 ease-in-out bg-gradient-to-r from-[#f72424] to-[#bb1c00] rounded-md hover:opacity-90">
                    See All
                </button>
            </div>
        </div>

    </div>
  )
}

export default GameListHorizontal