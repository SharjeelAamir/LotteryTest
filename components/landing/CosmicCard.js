import React, { useState, useEffect } from "react";
import { MdSavedSearch } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";

function CosmicCard() {
  const [showData, setShowData] = useState(false);
  const [cosmicData, setCosmicData] = useState([]);

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
    const fetchCosmicData = async () => {
      try {
        const response = await fetch(
          "https://testing-luckito-backend.rnssol.com/api/luckito/lottery/get-lottery?lotteryType=COSMIC"
        );

        const result = await response?.json();

        setCosmicData(result?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCosmicData();
  }, []);

  const handleArrows = () => {
    if (showData) {
      setShowData(false);
    } else {
      setShowData(true);
    }
  };
  return (
    <div className="Cosmic_Card_Main">
      <div className="Cosmic_Card_Header">
        <img src="/cosmic.png" alt="Cosmic" target="_blank" />
        <p>No. {cosmicData?.roundNumber}</p>
        <p>
          <MdSavedSearch />
        </p>
      </div>
      <div className="Cosmic_Sub_Cards">
        {cosmicData?.previousWinningticket?.map((item, index) => {
          return (
            <div className="Round_Cards_Cosmic" key={index}>
              <p>{item}</p>
            </div>
          );
        })}
      </div>
      <div className="Cosmic_Points_Section">
        <p>Winning Pot</p>
        <p>{cosmicData?.winningPot}</p>
        <p>LUCKI</p>
      </div>
      <div className="Cosmic_Time_Section">
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

export default CosmicCard;
