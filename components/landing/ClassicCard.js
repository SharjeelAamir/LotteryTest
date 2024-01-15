import React, { useState, useEffect } from "react";
import { MdSavedSearch } from "react-icons/md";
import { classicData } from "../../assets/data";
import { FaRegClock } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";

function ClassicCard() {
  const [showData, setShowData] = useState(false);

  const [classicCardData, setClassicCardData] = useState([]);

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
    const getClassicData = async () => {
      try {
        const response = await fetch(
          "https://testing-luckito-backend.rnssol.com/api/luckito/lottery/get-lottery?lotteryType=CLASSIC"
        );

        const result = await response?.json();

        setClassicCardData(result?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getClassicData();
  }, []);

  const handleArrows = () => {
    if (showData) {
      setShowData(false);
    } else {
      setShowData(true);
    }
  };
  return (
    <div className="Classic_Card_Main">
      <div className="Classic_Card_Header">
        <img src="/classic.png" alt="Cosmic" target="_blank" />
        <p>Past 5 Results</p>
        <p>
          <MdSavedSearch />
        </p>
      </div>
      <div className="Classic_Data_Section">
        {classicData?.map((item, index) => {
          return (
            <div className="Classic_Table_View" key={index}>
              <div className="Classic_Left">
                <p>{item?.first}</p>
              </div>
              <div className="Classic_Centre">
                <p>{item?.second}</p>
              </div>
              <div className="Classic_Right">
                <p>{item?.third}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="Classic_Time_Section">
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

export default ClassicCard;
