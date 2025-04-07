import React, { useState } from 'react';
import LiveStreaming from '../components/LiveStreaming';
import BettingOddsTable from '../components/aniket/BattingOddTable';
import BettingPage from '../components/Roshan/Casino/Popup/BettingPage';
import RecentResult from '../components/Roshan/DownSlider/RecentResult';

export const Card32 = ({ game, gmid }) => {
    
    const [betRate, setBetRate] = useState()
    const [player, setPlayer] = useState()
    const [betOpenModel, setBetOpenModel] = useState(false)
    const [type, setType] = useState('Back')

    const categoryMapping = {
        "WINNER": ["Player 8", "Player 9", "Player 10", "Player 11", "Player 12"],
        "CARD COLOR": ["Any Three Card Black", "Any Three Card Red", "Two Black Two Red"],
        "CARD TOTAL" : ["8 & 9 Total", "10 & 11 Total"]
    };

    return (
        <>
            <LiveStreaming url={`https://titan97.live/get-video/${gmid}`} />
            <BettingOddsTable
                data={game?.sub} 
                categoryMapping={categoryMapping} 
                setBetRate={setBetRate} setPlayer={setPlayer} 
                setBetOpenModel={setBetOpenModel} 
                setType={setType}
            />
            {betOpenModel &&
            <BettingPage
                game={game} 
                gmid={gmid} 
                betRate={betRate} 
                Player={player} 
                type={type} 
                setisModalopen={setBetOpenModel} 
            />}
            <RecentResult result={gmid} />
        </>
    )
}

