import React, { useContext, useState } from "react";

import ImageCarousel from "../components/ImageCarosouel";
import HorizontalScrollList from "../components/HorizontalScrollbar/HorizontalScrollBarList";

import Footer from "../components/Footer";
import SearchBar from "../components/search/SearchBar";

import CasinoBox from "../components/casino/CasinoBox";
import { SportsContext } from "../services/allsports/sports.context";
import { CasinoContext } from "../services/casino/casino.context";
import MatchList from "../components/matchlist/MatchList2";
import { AuthContext } from "../services/auth/auth.context";
import TextTicker from "../components/TextTicker";
import CircularHorizontalLoader from "../components/loader";

export const Homescreen = () => {
  const [searchBar, setSearchBar] = useState(false);

  const [currentSportEid, setCurrentSportEid] = useState(4);
  const { isAuthenticated, user } = useContext(AuthContext);

  const isCountryHeader = currentSportEid === 10 || currentSportEid === 65;

  const { allSports, getMatchListById, matchList } = useContext(SportsContext);
  const { loading } = useContext(SportsContext);
  // //(user);

  return (
    <div>
      {loading && <CircularHorizontalLoader />}
      {searchBar && <SearchBar setSearchBar={setSearchBar} />}
      {isAuthenticated && <TextTicker />}
      <ImageCarousel
        images={[
          "https://97sports.in/api/users/images/slider-default-2025221103413148.jpg",
          "https://97sports.in/api/users/images/slider-default-2025221103413148.jpg",
        ]}
        className={"lg:hidden"}
      />
      <HorizontalScrollList
        setSearchBar={setSearchBar}
        showSearchIcon={true}
        showAviator={true}
        menuItem={allSports}
        onMenuItemClick={getMatchListById}
        setCurrentSportEid={setCurrentSportEid} //
      />
      <div className="max-w-lg m-auto">
        <ImageCarousel
          images={[
            "https://97sports.in/api/users/images/slider-default-2025221103413148.jpg",
            "https://97sports.in/api/users/images/slider-default-2025221103413148.jpg",
          ]}
          className={"hidden lg:block"}
        />

        <MatchList matchList={matchList} isCountryHeader={isCountryHeader} />

        <CasinoBox />

        <Footer />
      </div>
    </div>
  );
};
