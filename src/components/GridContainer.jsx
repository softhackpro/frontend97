import React from "react";

const GridContainer = ({ children }) => {
  return (
    <div className="grid  grid-cols-3 md:grid-cols-3 gap-4 p-[15px]">
      {children}
    </div>
  );
};

export default GridContainer;
