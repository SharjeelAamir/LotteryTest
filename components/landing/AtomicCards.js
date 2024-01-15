import React, { useState, useEffect } from "react";
import { MdSavedSearch } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";

function AtomicCards() {
  const [showData, setShowData] = useState(false);

  const [atomicCardData, setAtomicCardData] = useState([]);

  const [time, setTime] = useState(35000);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    const getAtomicData = async () => {
      try {
        const response = await fetch(
          "https://testing-luckito-backend.rnssol.com/api/luckito/lottery/get-lottery?lotteryType=ATOMIC"
        );

        const result = await response?.json();

        setAtomicCardData(result?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getAtomicData();
  }, []);

  const handleArrows = () => {
    if (showData) {
      setShowData(false);
    } else {
      setShowData(true);
    }
  };
  return (
    <div className="Atomic_Card_Main">
      <div className="Atomic_Card_Header">
        <img src="/atomic.png" alt="Cosmic" target="_blank" />
        <p>No. {atomicCardData?.roundNumber}</p>
        <p>
          <MdSavedSearch />
        </p>
      </div>
      <div className="Atomic_Sub_Cards">
        {atomicCardData?.previousWinningticket?.map((item) => {
          return (
            <div className="Round_Cards_Atomic">
              <p>{item}</p>
            </div>
          );
        })}
      </div>
      <div className="Atomic_Points_Section">
        <p>Winning Pot</p>
        <p>{atomicCardData?.winningPot}</p>
        <p>LUCK!</p>
      </div>
      <div className="Atomic_Time_Section">
        <p>
          Next<br></br>Draw
        </p>
        <p>
          <FaRegClock />
        </p>
        <p> {formatTime(time)}</p>
        <button>Play</button>
      </div>
      <div className="Details_Section">
        <p onClick={handleArrows}>
          {showData ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
        </p>
        <p>Current Pool Status</p>
      </div>
    </div>
  );
}

export default AtomicCards;
