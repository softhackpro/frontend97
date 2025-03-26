import React from "react";

const Modal = ({ isOpen, onClose, sections ,title}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-2 left-2.5 flex items-center justify-center min-w-[90%] max-w-[90%]  bg-transparent bg-opacity-50 z-50  rounded-lg shadow-lg ">
      <div className="flex flex-col bg-white p-6  ">
      <div className="relative   min-h-[80vh] max-h-[80vh] overflow-y-auto">
        {/* Modal Header */}
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        {/* Modal Content */}
      
        {sections.length > 0 && sections.map((section, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg  text-black font-bold bg-neutral-300">{section.title}</h3>
            {section.content.map((paragraph, i) => (
              <p key={i} className="text-black mt-2">{paragraph}</p>
            ))}
          </div>
        ))}
       
      </div>
      {/* Close Button */}
      <div className="border-t-2 border-gray-300 p-4 flex justify-center  rounded-b-lg">
  {/* Close Button */}
  <button
className="px-4 py-2 bg-white text-[2.1vw] text-black rounded-md border-2 border-black hover:bg-gray-100 transition duration-300"
    onClick={onClose}
  >
    Okay
  </button>
</div>
      </div>
    </div>
  );
};

export default Modal;
