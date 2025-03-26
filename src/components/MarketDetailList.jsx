import { useRef, useState } from "react";

const MarketDetailList = ({ categories, activeCategory, onCategoryClick }) => {
  const listRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Handle mouse down for drag scrolling
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - listRef.current.offsetLeft);
    setScrollLeft(listRef.current.scrollLeft);
  };

  // Handle mouse move for drag scrolling
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - listRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Faster scroll
    listRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle mouse up / leave
  const stopDragging = () => {
    setIsDragging(false);
  };

  // Ensure clicked element is brought into view
  const handleCategoryClick = (category, index) => {
    onCategoryClick(category);
    const button = listRef.current.children[index];
    if (button) {
      button.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  };

  return (
    <div
      className="relative box-border w-full overflow-y-auto custom-scrollbar cursor-grab h-[11.6vw]  bg-gradient-to-b from-[#e0e6e6] to-[#e0e6e6]"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
    >
      <ul ref={listRef} className="flex space-x-2 overflow-x-auto scrollbar-hide px-2 custom-scrollbar ">
        {categories.map((category, index) => (
          <li key={category} className="shrink-0">
            <button
              className={`p-[2.4vw] text-[3.46667vw] text-white font-bold rounded-full shadow-md border whitespace-nowrap ${
                activeCategory === category
                  ? "bg-gradient-to-b from-green-400 to-green-600 border-black"
                  : "bg-gradient-to-b from-[#2E4B5E] to-[#243A48]"
              }`}
              onClick={() => handleCategoryClick(category, index)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarketDetailList;
