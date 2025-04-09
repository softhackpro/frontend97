import React, { Profiler } from 'react';
import { GiCricket, GiCricketBat } from 'react-icons/gi';
import { BiSolidCricketBall } from "react-icons/bi";
import { PiCricket } from "react-icons/pi";
import player from '/player.png'


export default function CricketScoreboard({ data: matchData }) {
 


    return (
        <div className="w-full bg-black text-white font-mono text-sm p-1">
            {/* Header Row */}
            <div className="flex w-full justify-between items-center text-gray-300 mb-2">
                <div className="text-left pl-1">Powered By Universe Score</div>
                <div className="flex">
                    <div className="w-32 text-right">SCORE</div>
                    <div className="w-16 text-right">OVS</div>
                    <div className="w-12 text-right pr-1">RR</div>
                </div>
            </div>

            {/* Team 1 Row */}
            <div className="flex w-full items-center mb-1 gap-1">
                <div className="w-6 text-center">
                    {matchData.activenation1 === '1' ? <PiCricket className=' text-xl' /> : <BiSolidCricketBall className=' text-xl' />
                    }
                </div>
                <img src={player} className=' h-6 ' alt='' />
                <div className="flex-1">{matchData.spnnation1}</div>
                <div className="flex">
                    <div className="w-32 text-right">{matchData.score1}</div>
                    <div className="w-12 text-right pr-1">{matchData.spnrunrate1 || ''}</div>
                </div>
            </div>

            {/* Team 2 Row */}
            <div className="flex w-full items-center justify-center gap-1 mb-2">
                <div className="w-6 text-center ">
                    {matchData.activenation2 === '1' ? <PiCricket className=' text-xl' /> : <BiSolidCricketBall className=' text-xl' />}
                </div>
                <img src={player} className=' h-6 ' alt='' />        <div className="flex-1">{matchData.spnnation2}</div>
                <div className="flex">
                    <div className="w-32 text-right">{matchData.score2}</div>
                    <div className="w-12 text-right pr-1">{matchData.spnrunrate2 || ''}</div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="text-gray-300 text-xs mt-2 pl-1 flex gap-1">
                {
                    matchData.balls.map((ball, index) => (
                        <div key={index} className={` flex text-sm text-white items-center justify-center rounded-full `}>
                            {ball}
                        </div>
                    ))
                }
            </div>

            <p className=' w-full text-white text-sm mt-1'>
               { matchData.spnmessage}
            </p>
        </div>
    );
}