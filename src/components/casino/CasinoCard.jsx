import React from "react";
import { useNavigate } from "react-router";

const CasinoCard = ({ game }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/casino/${game.gmid}`, { state: game })}
      className="relative shadow-lg rounded-md mb-4 cursor-pointer overflow-hidden transition-transform duration-200 hover:scale-105"
    >
      {/* Game Image */}
      <img
        src={`https://nd.sprintstaticdata.com/casino-icons/lc/${game.imgpath}`}
        alt={game.gname}
        className="w-full h-full object-cover"
      />

      {/* Fixed Bottom Button with Uniform Height & Dynamic Text Size */}
      <div className="absolute bottom-0 w-full h-8  bg-gradient-to-b from-[blue] to-[green]  flex items-center justify-center px-2">
        <span className="text-white font-semibold text-sm truncate w-full text-center leading-tight">
          {game.gname}
        </span>
      </div>
    </div>
  );
};

export default CasinoCard;
