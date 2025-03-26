import React, { useRef, useState } from "react";
import AviatorButton from "../AviatorButton";
import SearchBarIcon from "../search/SearchBarIcon";

import HorizontalScrollMenuItem from "./HorizontalScrollMenuItem";

const HorizontalScrollList = ({
  setSearchBar,
  menuItem = [],
  showSearchIcon,
  showAviator,
  onMenuItemClick = () => {},
  setCurrentSportEid = () => {},
}) => {
  const [activeTab, setActiveTab] = useState(
    menuItem.length > 0 ? menuItem[0].ename || menuItem[0].name : ""
  );

  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Dragging Logic
  const startDragging = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const stopDragging = () => {
    isDragging.current = false;
  };

  const onDragging = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const scrollToElement = (index) => {
    const container = scrollRef.current;
    const item = container.children[index];
    if (!item) return;

    container.scrollTo({ left: item.offsetLeft, behavior: "smooth" });
  };

  return (
    <div className="w-full bg-gradient-to-b from-[blue] to-[green] relative select-none">
      <div
        className={`flex cursor-default overflow-x-auto items-center whitespace-nowrap flex-nowrap custom-scrollbar w-full gap-3 ${
          showSearchIcon ? "pr-[62px]" : ""
        }`}
        ref={scrollRef}
        onMouseDown={startDragging}
        onMouseLeave={stopDragging}
        onMouseUp={stopDragging}
        onMouseMove={onDragging}
      >
        {/* Aviator Button */}
        {showAviator && <AviatorButton />}

        {/* Menu Items */}
        {menuItem.map((item, index) => (
          <HorizontalScrollMenuItem
            key={index}
            item={item}
            isActive={activeTab === (item.ename || item.name)}
            onClick={() => {
              scrollToElement(index);
              setActiveTab(item.ename || item.name);
              setCurrentSportEid(item.eid);

              onMenuItemClick(item.eid);
            }}
          />
        ))}

        {/* Search Bar Icon */}
        {showSearchIcon && <SearchBarIcon setSearchBar={setSearchBar} />}
      </div>
    </div>
  );
};

export default HorizontalScrollList;
