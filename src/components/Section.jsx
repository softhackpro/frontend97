import React from "react";

const Section = ({ children, classname = "" , backgroundImage }) => {
  return (
    <section className={`w-full  py-8 ${!classname?"bg-gray-100":classname}`} style={{ backgroundImage: `url(${backgroundImage || ""})` }}>
      <div className="w-[95%] mx-auto">{children}</div>
    </section>
  );
};

export default Section;