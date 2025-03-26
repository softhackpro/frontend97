const MobileStream = ({
    bgUrl = "https://97sports.in/CricketBanner.fa7d242575eddf8f.jpg",
    status = "OPEN",
    gameTime = "14-02-2025 07:30:00 PM",
    betStatus = "Bet Started",
  }) => {
    return (
      <div className="w-full mb-1">
        <div
          className="p-0 text-white h-[90px] w-full  mx-auto grid items-center relative bg-cover bg-bottom bg-no-repeat  shadow-lg"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.77), rgba(0, 0, 0, 0.45)), url(${bgUrl})`,
          }}
        >
          {/* Game Info Container */}
          <div className="flex flex-col items-center justify-between h-full px-4 py-2">
            {/* Game Status & Time */}
            <div className="flex justify-between w-full text-sm md:text-base">
              {/* Game Status */}
              <div className="font-semibold text-white">{status}</div>
  
              {/* Game Time */}
              <div className="text-white">
                <span className="text-yellow-400 font-semibold">Game time:</span>{" "}
                {gameTime}
              </div>
            </div>
  
            {/* Bet Status */}
            <div className="flex flex-col items-center justify-center">
              <span className="text-yellow-400 font-bold text-sm md:text-base">
                {betStatus}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default MobileStream;
  