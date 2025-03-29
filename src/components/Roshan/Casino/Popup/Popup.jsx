import React from 'react';
const Popup = ({setModalOpen}) => {
  // Card results data
  const cards = [
    { id: 'Q1', value: '7', suit: '♣', color: 'black' },
    { id: 'Q2', value: 'A', suit: '♥', color: 'red' },
    { id: 'Q3', value: '4', suit: '♣', color: 'black' },
    { id: 'Q4', value: '3', suit: '♣', color: 'black' },
    { id: 'Q5', value: '5', suit: '♣', color: 'black' }
  ];

  // Results data
  const results = [
    { label: 'RED', result: 'lose' },
    { label: 'BLACK', result: 'win' },
    { label: 'ODD', result: 'win' },
    { label: 'EVEN', result: 'lose' },
    { label: 'UP', result: 'lose' },
    { label: 'DOWN', result: 'win' },
    { label: 'A23', result: 'win' },
    { label: '456', result: 'lose' },
    { label: '8910', result: 'lose' },
    { label: 'JQK', result: 'lose' },
    { label: 'SPADE', result: 'lose' },
    { label: 'HEART', result: 'lose' },
    { label: 'DIAMOND', result: 'lose' },
    { label: 'CLUB', result: 'win' }
  ];

  return (
    <div className="max-w-md mx-auto border border-gray-300 rounded-md overflow-hidden shadow-lg">
      {/* Header */}
      <div className="relative bg-blue-900 text-white p-3 flex justify-between items-center">
        <div className="font-bold text-xl">KBC</div>
        <button onClick={()=>setModalOpen(false)} className="text-white">
          X
        </button>
      </div>

      {/* Round ID */}
      <div className="bg-white p-2 text-center text-sm">
        <div>Round Id: 95929031252612</div>
      </div>

      {/* Cards Display */}
      <div className="flex justify-center p-2 bg-white">
        {cards.map((card) => (
          <div key={card.id} className="mx-1">
            <div className="text-center text-xs font-semibold mb-1">{card.id}</div>
            <div className="border border-gray-300 rounded-lg overflow-hidden w-12">
              <div className="bg-gray-100 p-2 flex justify-center items-center">
                <span className={`text-2xl font-bold ${card.color === 'red' ? 'text-red-600' : 'text-black'}`}>
                  {card.value}
                </span>
              </div>
              <div className={`text-center p-1 ${card.color === 'red' ? 'text-red-600' : 'text-black'}`}>
                {card.suit}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Results Section */}
      <div className="bg-white px-2 pb-4">
        <div className="grid grid-cols-2 gap-2">
          {results.map((item, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center py-1 border-b border-gray-200"
            >
              <span className="text-sm font-medium">{item.label} -</span>
              <span className={item.result === 'win' ? 'text-green-600' : 'text-red-600'}>
                {item.result === 'win' ? '🏆' : '👎'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popup;