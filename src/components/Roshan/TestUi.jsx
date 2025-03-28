import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiCircleInfo } from "react-icons/ci";

const TestUi = () => {
    const [value, setValue] = useState()
    const fetchValue = async() =>{
        try {
            const response = await axios.get('https://titan97.live/get-allcasino/ballbyball')
            setValue(response?.data?.data)
            console.log(response.data?.data);
            
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(() => {
        const interval = setInterval(() => {
            fetchValue(); // Call the function every 2 seconds
        }, 200000);
      
        return () => clearInterval(interval); // Cleanup on unmount
      }, [])
    const stats = [
        {
            value1: 2.18,
            total1: 99900,
            type1: "RUNS",
            typeValue1: 0,
            bg1: "bg-gradient-to-b from-[#c9bf34] via-[#f7eb4c] to-[#c9bf34]",
            value2: 2.62,
            total2: 96276,
            type2: "RUNS",
            typeValue2: 1,
            bg2: "bg-gradient-to-b from-[#c9bf34] via-[#f7eb4c] to-[#c9bf34]",
        },
        {
            value1: 7.92,
            total1: 100000,
            type1: "RUNS",
            typeValue1: 2,
            bg1: "bg-gradient-to-b from-[#c9bf34] via-[#f7eb4c] to-[#c9bf34]",
            value2: 11,
            total2: 96276,
            type2: "RUNS",
            typeValue2: 3,
            bg2: "bg-gradient-to-b from-[#c9bf34] via-[#f7eb4c] to-[#c9bf34]",
        },
        {
            value1: 6.52,
            total1: 99900,
            type1: "RUNS",
            typeValue1: 4,
            bg1: "bg-gradient-to-b from-[#2dcd68] via-[#98ffbe] to-[#168940]",
            value2: 12.2,
            total2: 99450,
            type2: "RUNS",
            typeValue2: 6,
            bg2: "bg-gradient-to-b from-[#8b97ff] via-[#a8bdff] to-[#7173fc]",
        },
        {
            value1: 6.87,
            total1: 100000,
            type1: "WICKET",
            typeValue1: null,
            bg1: "bg-gradient-to-b from-[#e7645a] via-[#f68f87] to-[#ff5043]",
            value2: 8.67,
            total2: 100000,
            type2: "EXTRA RUNS",
            typeValue2: null,
            bg2: "bg-gradient-to-b from-[#c9bf34] via-[#f7eb4c] to-[#c9bf34]",
        },
    ];
    const placebet = () => {
        try {
            toast.success("Bet placed")
        } catch (error) {
            toast.error("Server ERROR")
        }
    }
    return (
        
        <div>
            <style>
                {`
                    @keyframes textMove {
                        from { transform: translateX(100%); }
                        to { transform: translateX(-100%); }
                    }
                    .text_box {
                        display: inline-block;
                        white-space: nowrap;
                        animation: textMove 10s ease-in-out infinite;
                    }
                `}
            </style>
            <div className="flex justify-between items-center text-white bg-[#2E4B5E] p-1 ">
                <p className="font-semibold text-lg">Ball by Ball</p>
                <p className="font-semibold text-sm">{value?.mid}</p>
            </div>
            <div>
                <iframe
                    width="100%"
                    height="300"
                    src="https://titan97.live/get-video/ballbyball"
                    title="How To Survive in City ? | ft. Village Vlogger Lautu Paswan"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                ></iframe>
            </div>
            <div className="flex justify-between items-center text-white bg-[#243A48] p-1 ">
                <p className="font-semibold text-lg">Runs</p>
                <CiCircleInfo />
            </div>
            <div className="flex">
                <button className="flex items-center justify-center border border-[#c7c8ca] text-black font-bold w-[50%] py-1.5">
                    Back
                </button>
                <button className="flex items-center justify-center border border-[#c7c8ca] text-black font-bold w-[50%] py-1.5">
                    Back
                </button>
            </div>
            <div className="bg-gradient-to-r from-green-300 via-teal-100 to-green-300 py-2 flex flex-row flex-wrap justify-center">
                {value?.sub.map((stat, index) => (
                   <div  style={{minWidth: "83px"}} key={index} className="flex flex-row items-center mb-2">
                   <div className="p-2 border-r-2 border-[#c7c8ca] flex justify-between">
                       {
                         stat?.gstatus === "OPEN" ? (<div onClick={placebet} className={`w-[170px] h-[69px] rounded-xl bg-gradient-to-b from-[#c9bf34] via-[#f7eb4c] to-[#c9bf34] flex`}>
                            <div className="flex-1 border-r-4 border-black border-dashed flex justify-center items-center">
                                <div className="text-center text-sm">
                                    <p className="font-bold">{stat.b}</p>
                                    <p className="font-semibold">{stat.max}</p>
                                </div>
                            </div>
                            <div className="flex-[1.5] flex justify-center items-center font-bold">
                                {
                                    stat.min ? <span> {stat.nat}  </span> : <span className="text-sm"> {stat.nat} </span>
                                }
                            </div>
                        </div> ) : (<div className={`w-[170px] h-[69px] rounded-xl bg-gradient-to-b from-[#b69ec580] via-[#f7eb4c] to-[#b69ec580] flex`}>
                           <div className="flex-1 border-r-4 border-black border-dashed flex justify-center items-center">
                               <div className="text-center text-sm">
                                   <p className="font-bold">0</p>
                                   <p className="font-semibold">{stat.max}</p>
                               </div>
                           </div>
                           <div className="flex-[1.5] flex justify-center items-center font-bold">
                               {
                                   stat.min ? <span> Suspend  </span> : <span className="text-sm"> Suspend </span>
                               }
                           </div>
                       </div>)
                       }
                       
                   </div>
               </div>
                ))}
            </div>
            <div className="p-2 bg-[#c2d5e4] text-[#3b5160] font-bold text-center text-nowrap text-sm mb-2 overflow-hidden">
                <p className="text_box">Results are based on stream only. Score board may be different or updated later</p>
            </div>
            <div className="bg-black flex items-center gap-1 overflow-scroll">
                <p className="text-xl font-bold text-white py-2 px-1 text-nowrap">Recent Result</p>
                {
                    new Array(10).fill('').map(() => <div className="shrink-0 w-[3rem] h-[2.5rem] flex justify-center items-center bg-yellow-300 rounded-4xl">0</div>)
                }
            </div>
        </div>
    );
};

export default TestUi;

// function StatCard({
//     value1,
//     total1,
//     type1,
//     typeValue1,
//     bg1,
//     value2,
//     total2,
//     type2,
//     typeValue2,
//     bg2,
// }) {
//     return (
//         <div className="flex items-center mb-2">
//             <div className="w-1/2 border-r-2 border-[#c7c8ca] flex justify-center">
//                 <div className={`w-[170px] h-[69px] rounded-xl ${bg1} flex`}>
//                     <div className="flex-1 border-r-4 border-black border-dashed flex justify-center items-center">
//                         <div className="text-center text-sm">
//                             <p className="font-bold">{value1}</p>
//                             <p className="font-semibold">{total1}</p>
//                         </div>
//                     </div>
//                     <div className="flex-[1.5] flex justify-center items-center font-bold">
//                         {
//                             typeValue2 ? <span> {typeValue1} {type1} </span> : <span className="text-sm"> {type1} </span>
//                         }
//                     </div>
//                 </div>
//             </div>
//             <div className="w-1/2 flex justify-center">
//                 <div className={`w-[170px] h-[69px] rounded-xl ${bg2} flex`}>
//                     <div className="flex-1 border-r-4 border-black border-dashed flex justify-center items-center">
//                         <div className="text-center text-sm">
//                             <p className="font-bold">{value2}</p>
//                             <p className="font-semibold">{total2}</p>
//                         </div>
//                     </div>
//                     <div className="flex-[1.5] flex justify-center items-center font-bold">
//                         {
//                             typeValue2 ? <span> {typeValue2} {type2} </span> : <span className="text-sm"> {type2} </span>
//                         }
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
