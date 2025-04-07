import { useState } from "react"
import BettingOddsTable from "../components/aniket/BattingOddTable"
import BettingPage from "../components/Roshan/Casino/Popup/BettingPage"
import LiveStreaming from "../components/LiveStreaming"
import RecentResult from "../components/Roshan/DownSlider/RecentResult"

export const Lucky7a = ({ game, gmid }) => {

    const [betRate, setBetRate] = useState()
    const [player, setPlayer] = useState()
    const [betOpenModel, setBetOpenModel] = useState(false)
    const [type, setType] = useState('Back')

    const categoryMapping = {
        "WINNER": ["Low Card", "High Card"],
        "COLORS": ["Odd", "Even"],
        "LUCKY COLOR": ["Red", "Black"],
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