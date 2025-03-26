import { useState } from "react";

import androidapkpng from "../assets/androidapk.png";
import knowYourCustomerPolicy from "../details/knowyourcustomerpolicy";
import privacyPolicy from "../details/privacypolicy";
import Modal from "./modals/Modal";


const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState([]);
  const [modalContent, setModalContent] = useState([]);
 

  const sections = [
  { title: "Privacy Policy",content:privacyPolicy},
   { title:"Rules and Regulations",content:[]},
    {title:"KYC", content: knowYourCustomerPolicy}, 
    { title: "Terms and Conditions",content:[]},
    { title:  "Responsible Gambling",content:[]},
 
  
  ];

  const openModal = () => {

  
    setIsOpen(true);
  };

  return (
    <div className="w-full bg-transparent text-transparent h-[150px] py-6 mb-[100px] lg:mb-0 ">
  <div className="m-[5px] pt-[6px]">
    {/* Support Links */}
    <div className="block text-[var(--footer-text-color)] text-[13px] leading-[22px] mb-[10px] mt-[10px] text-center">
    <dl className="inline-block mr-[10px] mb-[6px]">
      {
        sections.map((section, index) => (
          <a
          key={index}
          onClick={
            () => {
              setModalTitle(section.title);
              setModalContent(section.content);
              openModal();
            }
          }
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          className={`mx-[10px] text-black text-[14px] text-center no-underline cursor-pointer ${index>0 ? "before:content-['|'] before:mr-[5px]":""} `}
        >
          {section.title}
        </a>
        ))
      }
    
 
      </dl>
  </div>
{/* Android App Download */}
    <div className="flex justify-center lg:hidden">
      <a target="_blank" >
        <img alt="Download Android App" src={androidapkpng} className="w-[41.33333vw] h-auto rounded-[8px] bg-contain" />
      </a>
    </div>
  </div>
 {
  isOpen && (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title={modalTitle}
      sections={modalContent}
    />
  )
 }
</div>

  );
};

export default Footer;