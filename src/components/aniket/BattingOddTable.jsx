import React from 'react';

const BettingOddsTable = ({ data = [], categoryMapping = {}, onBetClick = () => { }, setBetRate, setBetOpenModel, setPlayer, setType }) => {

    const bettingData = data
    const mapping = categoryMapping

    const organizeByCategories = () => {
        const organized = [];

        // For each category in the mapping
        Object.keys(mapping).forEach(categoryName => {
            const natValues = mapping[categoryName];
            const options = [];

            // Find all data items that match the nat values for this category
            bettingData.forEach(item => {
                if (natValues.includes(item.nat)) {
                    options.push(item);
                }
            });

            // Only add category if it has options
            if (options.length > 0) {
                organized.push({
                    category: categoryName,
                    options: options
                });
            }
        });

        return organized;
    };

    const organizedData = organizeByCategories();

    const handleBetClickL = (option) => {
        setBetRate(option.l);
        setPlayer(option.nat);
        setBetOpenModel(true);
        setType('Lay')
    }

    const handleBetClickB = (option) => {
        setBetRate(option.b);
        setPlayer(option.nat);
        setBetOpenModel(true);
        setType('Back')
    }


    return (
        <div className="flex flex-col text-black space-y-2 w-full max-w-md mx-auto bg-gray-100">
            {organizedData.map((section, index) => (
                <div key={index} className="rounded overflow-hidden border border-gray-300">
                    {/* Category header */}
                    <div className="bg-gray-800 text-white p-2 flex justify-between text-xs items-center">
                        <div className="font-bold">{section.category}</div>
                        <div className="rounded-full bg-white w-3 h-3 flex items-center font-bold justify-center text-xs text-gray-800">i</div>
                    </div>

                    {/* Options */}
                    <div className="divide-y relative divide-gray-300">
                        {section.options.map((option, optIndex) => (
                            <div key={optIndex} className="relative">
                                <div className="flex font-semibold items-center bg-white">
                                    <div className="flex-1 p-2 text-sm">{option.nat}</div>
                                    {
                                        option?.b && option?.bs ? (
                                            <div onClick={() => handleBetClickB(option)} className="bg-blue-300 flex flex-col items-center w-20 pl-2 pr-2">
                                                <div className="text-base font-bold">{option.b}</div>
                                                <div className="text-xs text-gray-600">{option.bs.toLocaleString()}</div>
                                            </div>
                                        ) : null
                                    }
                                    {
                                        option?.l && option?.ls ? (
                                            <div onClick={() => handleBetClickL(option)} className="bg-red-300 flex flex-col items-center w-20 pl-2 pr-2">
                                                <div className="text-base font-bold">{option.l}</div>
                                                <div className="text-xs text-gray-600">{option.ls.toLocaleString()}</div>
                                            </div>
                                        ) : null
                                    }
                                </div>
                            </div>
                        ))}
                        {section.options[0].gstatus === "SUSPENDED" && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-gray-300 bg-opacity-40 w-full h-full flex items-center justify-center">
                                    <div className="text-red-600 font-bold text-xl">SUSPENDED</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BettingOddsTable;