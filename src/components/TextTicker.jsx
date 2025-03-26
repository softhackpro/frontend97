import React, { useState, useEffect } from 'react';
import { FaMicrophone } from 'react-icons/fa';

const TextTicker = () => {
  const [position, setPosition] = useState(0);
  const [news, setNews] = useState([
    "Breaking News: Major tech announcement expected today",
    "Sports Update: Championship finals scheduled for next weekend",
    "Weather Alert: Sunny conditions expected throughout the week",
    "Financial Report: Markets showing positive trends this quarter",
    "Ball by Ball Started in Our Exchange"
  ]);
  const [currentNews, setCurrentNews] = useState(0);

  useEffect(() => {
    const tickerWidth = 400; // width of the container
    const interval = setInterval(() => {
      if (position <= -tickerWidth) {
        // Reset position and change news
        setPosition(tickerWidth);
        setCurrentNews((prev) => (prev + 1) % news.length);
      } else {
        // Move text left
        setPosition((prev) => prev - 2);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [position, news.length]);

  return (
    <div className="w-full relative overflow-hidden">
      {/* Top header bar */}
      <div className="w-full h-10 bg-gray-700 flex items-center  relative shadow-2xl ">
        <div className="flex items-center h-full w-full">
          <div className="bg-gray-900 text-white font-bold w-2/6 h-full mr-4 flex items-center justify-center">
            <FaMicrophone />
            News
          </div>
          
          {/* Scrolling text */}
          <div className="text-white whitespace-nowrap overflow-hidden" style={{ width: '100%' }}>
            <div style={{ transform: `translateX(${position}px)` }}>
              {news[currentNews]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextTicker;