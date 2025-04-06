import axios from 'axios'
import React, { useEffect, useState } from 'react'

const BallByBallCurrent = () => {
    
    const [fetchedRecent, setFetchedRecent]  = useState([])
    const fetchRecentResult = async() =>{
        try {
            const res = await axios.get(`https://titan97.live/get-lastgamecasino/lucky15`)
            //(res.data.data, "ball by ball");
            
            setFetchedRecent(res.data.data.res)
        } catch (error) {
             //(error);
             
        }
    }
    useEffect(()=>{
     fetchRecentResult()
    }, [])
  return (
    <div className="bg-black flex items-center gap-1 overflow-scroll">
                <p className="text-xl font-bold text-white py-2 px-1 text-nowrap">Recent Result</p>
                {
                    fetchedRecent.map((result, index) => <div className="shrink-0 w-[3rem] h-[2.5rem] flex justify-center items-center bg-yellow-300 rounded-4xl">{result.win}</div>)
                }
            </div>
  )
}

export default BallByBallCurrent
