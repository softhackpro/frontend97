import React, { useState } from "react";
import ListItem from "./ListItem";
import { useNavigate } from "react-router";

const SportsMenu = ({ sports, onItemClick }) => {
  const navigate = useNavigate();

  const handleNavigateClick = (gmid, etid) => {
    navigate(`/fullgame/${gmid}`, { state: { etid } });
  };

  const [expandedSports, setExpandedSports] = useState({});

  // Toggle expansion for a specific sport
  const toggleSport = (sportId) => {
    setExpandedSports((prev) => ({
      ...prev,
      [sportId]: !prev[sportId],
    }));
  };

  return (
    <div className="w-full">
      {sports.length > 0 ? (
        sports.map((sport, index) => (
          <React.Fragment key={index}>
            <ListItem
              item={sport?.ename || sport.cname}
              classname="text-blue-400 font-bold"
              isToggle={true}
              onClick={() => {
                if (sport.ename) {
                  onItemClick(sport.eid);
                } else {
                  toggleSport(index);
                }
              }}
              isExpanded={expandedSports[index] || false}
            />
            {/* Only show matches if this sport is expanded */}
            {expandedSports[index] &&
              sport.matches?.map((match, matchIndex) => {
                //(match);

                return (
                  <ListItem
                    preIcon={true}
                    key={matchIndex}
                    item={match.ename}
                    classname="text-blue-400 font-bold px-5 "
                    isToggle={false}
                    isIcon={true}
                    onClick={() => handleNavigateClick(match.gmid, match.etid)}
                  />
                );
              })}
          </React.Fragment>
        ))
      ) : (
        <p className="text-center text-gray-500">No sports available</p>
      )}
    </div>
  );
};

export default SportsMenu;
