import React from "react";
import { useNavigate } from "react-router";
import PinButton from "./PinButton";
import OddsTable from "./OddsTable";

const MatchRow = ({ match, noPins }) => {
  const navigate = useNavigate();
  
  return (
    <tr key={`match-${match.gmid}`} className="border-b border-[#c8ced3]">
      
      {/* Event Name */}
      <td className="px-2 py-2 text-left">
        <a
          onClick={() =>
            navigate(
              `/fullgame/${match.gmid}/?sid=${match.etid}&match_name=${
                match.ename
              }`
            )
          }
          href="#"
          className="font-bold text-[#2789ce] no-underline"
        >
          {match.ename || match.name}
        </a>
        {match.iplay && (
          <span className="text-red-500 text-sm font-semibold ml-2 color-change-animation">
            In-Play
          </span>
        )}
        {match.stime && <p className="text-gray-600 text-xs">{match.stime}</p>}
      </td>

      {/* Match Info Badges */}
      <td className="px-2 py-2 text-center">
        {match.bm && (
          <span className="font-bold italic px-[5px] rounded-[4px] text-[12px] text-white bg-gradient-to-t from-[#14213d] to-[#315195]">
            BM
          </span>
        )}
        {match.tv && (
          <span className="font-bold italic px-[5px] rounded-[4px] text-[12px] text-white bg-gradient-to-b from-[#f26d1c] to-[#d14100]">
            S
          </span>
        )}
        {match.f && (
          <span className="font-bold italic px-[5px] rounded-[4px] text-[12px] text-white bg-gradient-to-b from-[#0a92a5] to-[#076875]">
            F
          </span>
        )}
      </td>

      {/* Odds Display */}
      <OddsTable sections={match.section} />
      {/* Pin Button */}
      <td className="text-center px-2 py-1 ">{!noPins && <PinButton />}</td>
    </tr>
  );
};

export default MatchRow;
