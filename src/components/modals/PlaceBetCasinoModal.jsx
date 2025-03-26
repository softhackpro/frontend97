import React, { useState, useEffect } from 'react';

const CasinoBetModal = ({ 
  initialValues = { primary: 2, secondary: 0 },
  quickBetOptions = [100, 200, 300, 400, 500, 600, 700, 800],
  onCancel = () => {},
  onPlaceBet = () => {},
  primaryLabel = "",
  secondaryLabel = "",
  minValues = { primary: 0, secondary: 0 },
  maxValues = { primary: 999, secondary: 999 },
  disabled = false
}) => {
  const [values, setValues] = useState(initialValues);
  const [canPlace, setCanPlace] = useState(false);

  // Validate if bet can be placed
  useEffect(() => {
    const isValid = values.primary > 0 || values.secondary > 0;
    setCanPlace(isValid && !disabled);
  }, [values, disabled]);

  // Handle increment/decrement for both inputs
  const handleAdjust = (field, increment) => {
    setValues(prev => {
      const newValue = prev[field] + increment;
      
      // Stay within min/max bounds
      if (newValue < minValues[field] || newValue > maxValues[field]) {
        return prev;
      }
      
      return { ...prev, [field]: newValue };
    });
  };

  // Set a quick bet amount to primary value
  const handleQuickBet = (amount) => {
    setValues(prev => ({ ...prev, primary: amount }));
  };

  return (
    <div className="flex flex-col rounded-lg p-2 sm:p-4 shadow-lg w-full bg-gradient-to-b from-blue-50 to-blue-100">
      {/* First row: Cancel button, inputs, and Place Bet button */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {/* Cancel button */}
        <button 
          className="py-2 px-3 text-sm sm:text-base border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
          onClick={onCancel}
        >
          Cancel
        </button>
        
        {/* Primary value input */}
        <div className="flex flex-1 min-w-24 items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
          <button 
            className="p-1 sm:p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-base sm:text-xl font-bold"
            onClick={() => handleAdjust('primary', -1)}
          >
            −
          </button>
          <div className="px-2 sm:px-3 py-1 sm:py-2 text-center flex-1">
            {primaryLabel && <span className="text-xs text-gray-500 block">{primaryLabel}</span>}
            <div className="text-sm sm:text-base font-semibold">{values.primary}</div>
          </div>
          <button 
            className="p-1 sm:p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-base sm:text-xl font-bold"
            onClick={() => handleAdjust('primary', 1)}
          >
            +
          </button>
        </div>
        
        {/* Secondary value input */}
        <div className="flex flex-1 min-w-24 items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
          <button 
            className="p-1 sm:p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-base sm:text-xl font-bold"
            onClick={() => handleAdjust('secondary', -1)}
          >
            −
          </button>
          <div className="px-2 sm:px-3 py-1 sm:py-2 text-center flex-1">
            {secondaryLabel && <span className="text-xs text-gray-500 block">{secondaryLabel}</span>}
            <div className="text-sm sm:text-base font-semibold">{values.secondary}</div>
          </div>
          <button 
            className="p-1 sm:p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-base sm:text-xl font-bold"
            onClick={() => handleAdjust('secondary', 1)}
          >
            +
          </button>
        </div>
        
        {/* Place Bet button */}
        <button 
          className={`py-2 px-3 sm:px-4 rounded-lg text-white text-sm sm:text-base font-medium ${canPlace ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
          onClick={() => canPlace && onPlaceBet(values)}
          disabled={!canPlace}
        >
          Place Bet
        </button>
      </div>
      
      {/* Second row: Quick bet options in a single row with horizontal scroll */}
      <div className="flex overflow-x-auto pb-2 gap-2 custom-scrollbar">
        {quickBetOptions.map((amount) => (
          <button 
            key={amount}
            className="py-1 sm:py-2 px-2 sm:px-4 flex-none border border-blue-300 rounded-lg bg-white text-blue-700 hover:bg-blue-50 text-center text-sm sm:text-base font-medium"
            onClick={() => handleQuickBet(amount)}
          >
            {amount}
          </button>
        ))}
      </div>
    </div>
  );
};


export default CasinoBetModal;