import React, { useState } from 'react'

const BettingPage = ({setisModalopen}) => {
    const [Money, setMoney] = useState(100)
  return (
    <div className="fixed inset-0 flex items-center justify-center ">
        <div className="w-full max-w-md bg-[#d3edd0] text-lg text-black rounded-md shadow-lg border border-[#beddf4] p-4">
          <div className="flex justify-between gap-1 items-center mb-2">
            <div
              className="flex w-1/2 border border-[#aaaaaa] items-center rounded-md"
              style={{ backgroundColor: "#fcfcfc" }}
            >
              <button className="p-2 text-blue-800">
                <span className="text-xl font-bold">−</span>
              </button>
              <input
                type="text"
                // value={selectedBet.b}
                className="p-2 text-center w-full border-r border-l border-[#aaaaaa] bg-gray-100"
                readOnly
              />
              <button className="p-2 text-blue-800">
                <span className="text-xl font-bold">+</span>
              </button>
            </div>
            <div
              className="flex border border-[#aaaaaa] items-center w-1/2 rounded-md"
              style={{ backgroundColor: "#fcfcfc" }}
            >
              <button className="p-2 text-blue-800">
                <span onClick={()=>setMoney(Money-100)} className="text-sm font-bold">−</span>
              </button>
              <input
                value={Money}
                type="text"
                className="p-2 text-center border-l border-[#aaaaaa] w-full border-r bg-gray-100"
              />
              <button className="p-2 text-blue-800 rounded-xl">
                <span onClick={()=>setMoney(Money+ 100)} className="text-xl font-bold">+</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 mt-2 gap-2 mb-2">
            {[100, 200, 300, 500, 1000, 2000, 4000, 5000, ].map((amount) => (
              <button
                onClick={()=>setMoney(amount)}
                key={amount}
                className="bg-white border border-black py-1 text-center rounded hover:bg-gray-100 text-sm"
              >
                {amount}
              </button>
            ))}
          </div>
          <div className="flex space-x-2 mt-4">
            <button
              onClick={()=>setisModalopen(false)}
              className="w-1/2 py-2 text-center rounded border border-green-300 text-sm bg-white hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
            //   onClick={placebet}
              className="w-1/2 py-2 text-center text-sm text-white rounded font-medium"
              style={{ backgroundColor: "#4a6da7" }}
            >
              Place Bet
            </button>
          </div>
        </div>
      </div>
  )
}

export default BettingPage
