import React from 'react';

const AmarAkbarAnthony = () => {
    const cardData = [
        { card: 'A', suits: ['♠', '♥'] },
        { card: '2', suits: ['♠', '♥'] },
        { card: '3', suits: ['♠', '♥'] },
        { card: '4', suits: ['♠', '♥'] },
        { card: '5', suits: ['♠', '♥'] },
        { card: '6', suits: ['♠', '♥'] },
        { card: '7', suits: ['♠', '♥'] }
      ];
  // Data for winner section
  const winnerData = [
    { name: 'AMAR', cards: 'A,2,3,4,5,6', back: '2.12', lay: '2.22', amount: '1000000' },
    { name: 'AKBAR', cards: '7,8,9,10', back: '3.15', lay: '3.35', amount: '1000000' },
    { name: 'ANTHONY', cards: 'J,Q,K', back: '4.15', lay: '4.45', amount: '1000000' }
  ];

  // Data for bottom section
  const oddEvenData = [
    { type: 'ODD', odds: '1.81', color: 'bg-red-700' },
    { type: 'EVEN', odds: '2.12', color: 'bg-blue-600' }
  ];

  const colorData = [
    { type: '+', odds: '1.95', color: 'bg-red-700' },
    { type: '-', odds: '1.95', color: 'bg-blue-600' }
  ];

  const overUnderData = [
    { type: 'UNDER 7', odds: '1.98', color: 'bg-red-700' },
    { type: 'OVER 7', odds: '1.98', color: 'bg-blue-600' }
  ];

  return (
    <>
    <iframe src="https://titan97.live/get-video/dt20" frameborder="0"></iframe>
    <div className="max-w-2xl mx-auto font-sans">
      {/* Header */}
      <div className="bg-slate-800 text-white p-2 font-bold">
        WINNER
      </div>

      {/* Min/Max Row */}
      <div className="grid grid-cols-3">
        <div className="bg-gray-300 p-2 text-center col-span-2">
          Min/Max 100 - 100000
        </div>
        <div className="grid grid-cols-2">
          <div className="bg-blue-200 p-2 text-center font-bold">Back</div>
          <div className="bg-pink-200 p-2 text-center font-bold">Lay</div>
        </div>
      </div>

      {/* Winner Rows */}
      {winnerData.map((item, index) => (
        <div key={index} className="grid grid-cols-3 border-b border-gray-300">
          <div className="bg-white p-2 col-span-2">
            <div className="font-bold">{item.name} ( {item.cards} )</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="bg-blue-200 p-1 text-center">
              <div className="font-bold text-lg">{item.back}</div>
              <div className="text-xs">{item.amount}</div>
            </div>
            <div className="bg-pink-200 p-1 text-center">
              <div className="font-bold text-lg">{item.lay}</div>
              <div className="text-xs">{item.amount}</div>
            </div>
          </div>
        </div>
      ))}

      {/* Bottom Sections */}
      <div className="grid grid-cols-3 gap-1 mt-1">
        {/* ODD/EVEN Section */}
        <div className="border border-gray-400">
          <div className="bg-slate-800 text-white p-1 text-center font-bold">
            ODD/EVEN
          </div>
          <div className="bg-gray-300 p-1 text-xs text-center">
            Min/Max100 - 100000
          </div>
          {oddEvenData.map((item, index) => (
            <div key={index} className={`${item.color} text-white p-2 text-center`}>
              <div className="font-bold">{item.type}</div>
              <div className="text-lg font-bold">{item.odds}</div>
              <div className="text-sm">300000</div>
            </div>
          ))}
        </div>

        {/* COLOR Section */}
        <div className="border border-gray-400">
          <div className="bg-slate-800 text-white p-1 text-center font-bold">
            COLOR
          </div>
          <div className="bg-gray-300 p-1 text-xs text-center">
            Min/Max100 - 100000
          </div>
          {colorData.map((item, index) => (
            <div key={index} className={`${item.color} text-white p-2 text-center`}>
              <div className="font-bold">{item.type}</div>
              <div className="text-lg font-bold">{item.odds}</div>
              <div className="text-sm">300000</div>
            </div>
          ))}
        </div>

        {/* UNDER/OVER Section */}
        <div className="border border-gray-400">
          <div className="bg-slate-800 text-white p-1 text-center font-bold">
            UNDER/OVER
          </div>
          <div className="bg-gray-300 p-1 text-xs text-center">
            Min/Max100 - 100000
          </div>
          {overUnderData.map((item, index) => (
            <div key={index} className={`${item.color} text-white p-2 text-center`}>
              <div className="font-bold">{item.type}</div>
              <div className="text-lg font-bold">{item.odds}</div>
              <div className="text-sm">300000</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="max-w-md mx-auto border border-gray-400 rounded overflow-hidden">
      {/* Header */}
      <div className="bg-slate-800 text-white p-2 font-bold">
        CARD
      </div>

      {/* Min/Max and Back header row */}
      <div className="grid grid-cols-2">
        <div className="bg-teal-100 p-2 text-center border-b border-gray-300">
          Min/Max 100 - 20000
        </div>
        <div className="bg-blue-400 p-2 text-center font-bold border-b border-gray-300">
          Back
        </div>
      </div>

      {/* Card rows */}
      {cardData.map((item, index) => (
        <div key={index} className="grid grid-cols-2 border-b border-gray-300">
          <div className="p-3 flex items-center">
            <div className="font-bold text-xl mr-2">{item.card}</div>
            <div className="flex flex-col">
              <span className="text-black text-xl">{item.suits[0]}</span>
              <span className="text-red-600 text-xl">{item.suits[1]}</span>
            </div>
          </div>
          <div className="bg-blue-400 p-2 text-center">
            <div className="font-bold">12.00</div>
            <div className="text-sm">50000</div>
          </div>
        </div>
      ))}
    </div>
    </>
    
  );
};

export default AmarAkbarAnthony;