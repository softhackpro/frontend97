import React, { useContext, useEffect, useState } from "react";
import ButtonGroup from "../components/ButtonGroup";
import GroupBox from "../components/GroupBox";
import HorizontalScrollList from "../components/HorizontalScrollbar/HorizontalScrollBarList";
import BottomNavigationBar from "../components/BottomNavigationBar";

import CasinoBox from "../components/casino/CasinoBox";
import { SportsContext } from "../services/allsports/sports.context";
import MatchList from "../components/matchlist/MatchList2";
import TitleBar from "../components/TitleBar";

const secondMenu = [
  { id: "sportsBar0", name: "ALL" },
  { id: "sportsBar1", name: "OUR CASINO" },
  { id: "sportsBar2", name: "OUR VIRTUAL" },
  { id: "sportsBar3", name: "EVOLUTION" },
  { id: "sportsBar4", name: "EZUGI" },
  { id: "sportsBar5", name: "TVBET" },
  { id: "sportsBar6", name: "BETGAME" },
  { id: "sportsBar7", name: "PLATINGAMES" },
];
const InPlayScreen = () => {
  const [activeCategory, setActiveCategory] = useState("inPlay");
  const { inPlayMatches } = useContext(SportsContext);
  const [updatedInPlayMatches, setUpdatedInPlayMatches] = useState([]);

  useEffect(() => {
    const updatedData = [
      ...inPlayMatches.filter(item => item.name === 'Cricket'),
      ...inPlayMatches.filter(item => item.name !== 'Cricket'),
    ];
    
    setUpdatedInPlayMatches(updatedData);
  }, [inPlayMatches]);



  return (
    <div className="pb-[150px]">
      <ButtonGroup onClickItem={setActiveCategory} active={activeCategory} />

      {updatedInPlayMatches.length > 0 ? (
        updatedInPlayMatches.map((matches, i) => {
          if (matches[activeCategory].length < 1) return null;

          return (
            <GroupBox key={i}>
              <TitleBar
                title={matches.name || "Matches"}
                background=" bg-gradient-to-b from-[#243a48] via-[#243a48] to-[#172732] text-white"
                fontSize="text-3.7777vw font-bold mt-2"
              />
              <MatchList
                matchList={matches[activeCategory]}
                classname={true}
                noPins={true}
              />
            </GroupBox>
          );
        })
      ) : (
        <div className="text-center py-4 text-gray-500">
          No matches available
        </div>
      )}

      <HorizontalScrollList menuItem={secondMenu} />
      <CasinoBox />
      <BottomNavigationBar />
    </div>
  );
};

export default InPlayScreen;
