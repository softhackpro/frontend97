import React from "react";

const AgeVerificationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-content fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
      <div className="login-popup-content bg-gray-900 rounded-xl w-full max-w-lg mx-4">
        <div className="modal-body p-6 bg-gradient-to-b from-[blue] to-[green]">
          <div className="login-panel-container confirm-container text-[16px] font-bold">
            <div className="confirm-text">
              <div className="header-popup flex justify-end">
                <a
                  onClick={onClose}
                  className="ui-link cursor-pointer text-white"
                >
                  <i className="fas fa-times text-2xl"></i>
                </a>
              </div>
              <div className="text1 text-confirm-bold text-[16px] font-bold text-white">
                Non-Gambling Territories.
              </div>
              <hr className="confirm-line border-t border-white my-3" />
              <div className="text-[16px] font-bold text-white">
                Connecting to our site from non gambling countries, it will be
                User's responsibility to ensure that their use of the service is
                lawful.
              </div>
            </div>

            <div className="confirm-text mt-6">
              <div className="text1 text-confirm-bold text-[16px] font-bold text-white">
                Underage gambling is prohibited.
              </div>
              <hr className="confirm-line border-t border-white my-3" />
              <div className="text2 text-white">
                Please confirm if you are <span>18 years old and above</span> as
                of today.
              </div>
            </div>

            <div className="confirm-button flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={onConfirm}
                className="btn-verification btn-confirm w-full sm:w-1/2 bg-white text-black py-3 rounded-lg "
                tabIndex={0}
              >
                <span>Confirm</span>
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-1/2 bg-black text-white border border-white outline outline-white py-3 rounded-lg hover:bg-gray-900"
              >
                <span>Exit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeVerificationModal;
