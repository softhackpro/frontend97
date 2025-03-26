import React, { useState } from "react";
import CircularButtons from "../components/CircularButtons";
import BettingTable from "../components/BettingTable";
import MarketDetailList from "../components/MarketDetailList";
import MarketDetailTable from "../components/MarketDetailTable";
import TitleBar from "../components/TitleBar";
import MobileStream from "../components/MobileStream";

const categories = ["All", "Popular", "Match Odds", "Tied Match", "Lunch"];
const sampleData = [
  {
    name: "Mumbai Indians Women",
    back: { price: 2.7, volume: 200 },
    lay: { price: 4, volume: 146 },
    minMax: "0",
  },
  {
    name: "Delhi Capitals Women",
    back: { price: 1.82, volume: 100 },
    lay: { price: 2.12, volume: 116.88 },
    minMax: "0",
  },
  {
    name: "Gujarat Giants Women",
    back: { price: 1.01, volume: "3K" },
    lay: { price: 100, volume: 126.33 },
    minMax: "0",
  },
  {
    name: "UP Warriorz Women",
    back: { price: 0, volume: 0 },
    lay: { price: 0, volume: 0 },
    minMax: "0",
  },
  {
    name: "RC Bengaluru Women",
    back: { price: 0, volume: 0 },
    lay: { price: 0, volume: 0 },
    minMax: "0",
  },
];
const GameDetailsScreen = ({ title = "cricket" }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  return (
    <>
      <TitleBar
        title={title}
        background="bg-gradient-to-b from-[#2E4B5E] to-[#243A48]"
        stream={true}
        fontSize="text-[16px] leading-[35px] text-white 
md:text-[25px] md:leading-[45px] md:bg-transparent"
      />
      <MobileStream />
      <MarketDetailList
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={setActiveCategory}
      />
    
      <MarketDetailTable data={sampleData} matchedAmount="10.4K" />
    </>
  );
};

export default GameDetailsScreen;
