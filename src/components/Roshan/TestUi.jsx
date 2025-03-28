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
            fetchValue(); // Call API every 2 seconds
        }, 2000);  // <-- Change this from 200000 to 2000
    
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);
    
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
    title="Ball by Ball Live"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
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
            {value?.sub?.length > 0 ? value.sub.map((stat, index) => (
    <div key={index} style={{ minWidth: "83px" }} className="flex flex-row items-center mb-2">
        <div className="p-2 border-r-2 border-[#c7c8ca] flex justify-between">
            {
                stat?.gstatus === "OPEN" ? (
                    <div
                        onClick={placebet}
                        className={`w-[170px] h-[69px] rounded-xl bg-gradient-to-b ${
                            stat?.nat === "6 Runs" || stat?.nat === "4 Runs"
                                ? "from-[#2dcd68] via-[#98ffbe] to-[#168940]"
                                : "from-[#c9bf34] via-[#f7eb4c] to-[#c9bf34]"
                        } flex`}
                    >
                        <div className="flex-1 border-r-4 border-black border-dashed flex justify-center items-center">
                            <div className="text-center text-sm">
                                <p className="font-bold">{stat.b}</p>
                                <p className="font-semibold">{stat.max}</p>
                            </div>
                        </div>
                        <div className="flex-[1.5] flex justify-center items-center font-bold">
                            <span>{stat.nat}</span>
                        </div>
                    </div>
                ) : (
                    <div className="w-[170px] h-[69px] rounded-xl bg-gradient-to-b from-[#b69ec580] via-[#f7eb4c] to-[#b69ec580] flex">
                        <div className="flex-1 border-r-4 border-black border-dashed flex justify-center items-center">
                            <div className="text-center text-sm">
                                <p className="font-bold">0</p>
                                <p className="font-semibold">{stat.max}</p>
                            </div>
                        </div>
                        <div className="flex-[1.5] flex justify-center items-center font-bold">
                            <span>Suspend</span>
                        </div>
                    </div>
                )
            }
        </div>
    </div>
)) : <p className="text-center p-2 text-red-500">No data available</p>}

            </div>
            <div className="p-2 bg-[#c2d5e4] text-[#3b5160] font-bold text-center text-nowrap text-sm mb-2 overflow-hidden">
                <p className="text_box">Ball By Ball Titan 97</p>
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

