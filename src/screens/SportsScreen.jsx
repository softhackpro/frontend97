// import React, { useContext, useEffect, useState } from 'react';
// import TitleBar from '../components/TitleBar';
// import SportQuickLinks from '../components/SportsQuickLinks';
// import { SportsContext } from '../services/allsports/sports.context';
// import SportsMenu from '../components/SportsMenu';

// const SportsScreen = () => {
//   const { allSports, getMatchListById, matchList } = useContext(SportsContext);
//   const [sports, setSports] = useState([]);
//   const [showMatchList, setShowMatchList] = useState(false);

//   /**
//    * Initialize sports with allSports data on first render.
//    */
//   useEffect(() => {
//     if (Array.isArray(allSports) && allSports.length > 0 && !showMatchList) {
//       setSports(allSports);
//     }
//   }, [allSports, showMatchList]);

//   /**
//    * Process and update sports when matchList changes.
//    */
//   useEffect(() => {

//     if (!showMatchList) return;

//     let matchData = [];

//     // Ensure matchList is an array before processing
//     if (Array.isArray(matchList)) {
//       matchData = matchList;
//     } else if (matchList && typeof matchList === 'object') {
//       // Handle cases where matchList is an object with possible match data
//       if (Array.isArray(matchList.data)) {
//         matchData = matchList.data;
//       } else {
//         for (const key in matchList) {
//           if (Array.isArray(matchList[key])) {
//             matchData = matchList[key];
//             break;
//           }
//         }
//       }
//     }

//     //("Extracted match data:", matchData);

//     if (matchData.length === 0 || !matchData[0]?.hasOwnProperty('cname')) {
//       //("Invalid or empty match data:", matchData);
//       return;
//     }

//     try {
//       // Group matches by `cname`
//       const groupedMatches = matchData.reduce((acc, match) => {
//         const { cname, cid, mid, ename, etid, gmid } = match;

//         if (!acc[cname]) acc[cname] = [];
//         acc[cname].push({ cid, mid, ename, etid, gmid, cname });

//         return acc;
//       }, {});

//       // Convert grouped matches to an array format
//       const formattedSports = Object.keys(groupedMatches).map(cname => ({
//         cname,
//         matches: groupedMatches[cname],
//       }));

//       //("Processed match data into:", formattedSports);
//       setSports(formattedSports);
//     } catch (error) {
//       console.error("Error processing match data:", error);
//     }
//   }, [matchList, showMatchList]);

//   /**
//    * Handles quick link clicks and fetches matches for the selected sport.
//    */
//   const handleQuickLinkClick = (id) => {
//     //("Quick link clicked with ID:", id);
//     setShowMatchList(true);

//     // Use setTimeout to ensure state updates before fetching
//     setTimeout(() => getMatchListById(id), 0);
//   };

//   const handleMenuItemClick = (id) => {

//     //("Menu item clicked with ID:", id);
//     setShowMatchList(true);
//     getMatchListById(id); // Fetch match list for the selected sport
//   };

//   /**
//    * Resets the view to display all sports.
//    */
//   const handleResetToAllSports = () => {
//     setShowMatchList(false);
//     if (Array.isArray(allSports) && allSports.length > 0) {
//       setSports(allSports);
//     }
//   };

//   return (
//     <div className="pb-[150px]">
//       <TitleBar
//         title="Quick Links"
//         fontSize="text-[3.77777vw]"
//         background="bg-gradient-to-b from-[#2E4B5E] to-[#243A48]"
//       />

//       <SportQuickLinks onLinkClick={handleQuickLinkClick} />

//       <TitleBar
//         title="ALL SPORTS"
//         fontSize="text-[3.77777vw]"
//         background="bg-gradient-to-b from-[#2E4B5E] to-[#243A48]"
//         onClick={handleResetToAllSports}
//       />

//       <SportsMenu sports={sports} onItemClick={handleMenuItemClick} />
//     </div>
//   );
// };

// export default SportsScreen;

import React, { useContext, useEffect, useState } from "react";
import TitleBar from "../components/TitleBar";
import SportQuickLinks from "../components/SportsQuickLinks";
import { SportsContext } from "../services/allsports/sports.context";
import SportsMenu from "../components/SportsMenu";

const SportsScreen = () => {
  const { allSports, getMatchListById, matchList } = useContext(SportsContext);
  const [sports, setSports] = useState([]);
  const [showMatchList, setShowMatchList] = useState(false);

  /**
   * Initialize sports with allSports data on first render.
   */
  useEffect(() => {
    if (Array.isArray(allSports) && allSports.length > 0 && !showMatchList) {
      setSports(allSports);
    }
  }, [allSports, showMatchList]);

  /**
   * Process and update sports when matchList changes.
   * Handles both nested and non-nested data structures.
   */
  useEffect(() => {
    if (!showMatchList) return;

    // Skip if matchList is empty
    if (!matchList) return;

    //("Processing matchList:", matchList);

    // Ensure we're working with an array
    const matchData = Array.isArray(matchList) ? matchList : [matchList];

    // Array to collect all processed matches
    let processedMatches = [];

    // Process each item in matchList
    matchData.forEach((item) => {
      // Check if this is the nested structure or flat structure
      if (item.children && Array.isArray(item.children)) {
        // This is the nested structure: cname -> children -> ename -> children
        const { cid, cname, children: venues } = item;

        // Process each venue (second level)
        venues.forEach((venue) => {
          const { ename, children: matches } = venue;

          // Skip if there are no matches
          if (!Array.isArray(matches)) return;

          // Process each match (third level)
          matches.forEach((match) => {
            // Extract match data and add parent information
            processedMatches.push({
              cid,
              cname,
              ename,
              mid: match.mid,
              etid: match.etid,
              gmid: match.gmid,
              iplay: match.iplay,
              stime: match.stime,
              m: match.m,
              gtype: match.gtype,
            });
          });
        });
      } else {
        // This is the flat structure with direct match properties
        // Just add the item directly
        if (item.cname) {
          processedMatches.push(item);
        }
      }
    });

    //("Processed matches:", processedMatches);

    // Group matches by cname for display
    const groupedMatches = processedMatches.reduce((acc, match) => {
      const { cname } = match;

      if (!cname) return acc; // Skip if no cname

      if (!acc[cname]) acc[cname] = [];
      acc[cname].push(match);

      return acc;
    }, {});

    // Format for SportsMenu component
    const formattedSports = Object.keys(groupedMatches).map((cname) => ({
      cname,
      matches: groupedMatches[cname],
    }));

    //("Formatted sports data:", formattedSports);
    setSports(formattedSports);
  }, [matchList, showMatchList]);

  /**
   * Handles quick link clicks and fetches matches for the selected sport.
   */
  const handleQuickLinkClick = (id) => {
    //("Quick link clicked with ID:", id);
    setShowMatchList(true);
    getMatchListById(id);
  };

  /**
   * Handles menu item click and fetches matches for the selected sport.
   */
  const handleMenuItemClick = (id) => {
    //("Menu item clicked with ID:", id);
    setShowMatchList(true);
    getMatchListById(id);
  };

  /**
   * Resets the view to display all sports.
   */
  const handleResetToAllSports = () => {
    setShowMatchList(false);
    if (Array.isArray(allSports) && allSports.length > 0) {
      setSports(allSports);
    }
  };

  return (
    <div className="pb-[150px]">
      <TitleBar
        title="Quick Links"
        fontSize="text-[3.77777vw]"
        background="bg-gradient-to-b from-[#2E4B5E] to-[#243A48]"
      />

      <SportQuickLinks onLinkClick={handleQuickLinkClick} />

      <TitleBar
        title="ALL SPORTS"
        fontSize="text-[3.77777vw]"
        background="bg-gradient-to-b from-[#2E4B5E] to-[#243A48]"
        onClick={handleResetToAllSports}
      />

      <SportsMenu sports={sports} onItemClick={handleMenuItemClick} />
    </div>
  );
};

export default SportsScreen;
