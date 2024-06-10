import React from "react";
import Image from "next/image";
import Rate from "./rate";
import Info from "@/assets/svg/info";

const CoinDetail = ({ coinData }) => {
  const styles = {
    tableRow: `text-center border-b border-gray-800 text-[0.93rem]`,
    flexContainer: `flex items-center`, // Flexbox container class for vertical alignment
    tableCell: `px-4 py-2`, // consistent padding to table cells
  };
  if (!coinData) {
    return <div>No coin data available</div>;
  }
  const {
    largeImage,
    coinName,
    coinSymbol,
    starNum,
    price,
    dRateIsIncrement,
    dRate,
    marketCapValue,
    fullyDilutedValuation,
  } = coinData;
  return (
    <div className="coinDetail-section">
      <div className="detail-item-1">
        <div className="inline-block text-xs leading-4 text-white font-normal bg-black rounded-md px-1 py-1 hover:bg-gray-800 transition duration-300 ease-in-out">
          Rank #{starNum}
        </div>
        <div className="flex items-center item_1 pt-3">
          <div className="flex items-center">
            <Image src={largeImage} alt={coinName} width={50} height={50} />
            <div className="ml-2 font-bold">{coinName}</div>
          </div>
          <span className="ml-2" style={{ textTransform: "uppercase" }}>
            {coinSymbol}
          </span>
        </div>
        <div className="flex items-center">
          <div className="mt-2 font-bold text-3xl">
            <p>${price}</p>
          </div>
          <div className="pt-3">
            <td className={`${styles.tableCell} flex items-center`}>
              <div className="mr-2 font-bold">
                <Rate isIncrement={dRateIsIncrement} rate={`${dRate}%`} />
              </div>
              <Info />
            </td>
          </div>
        </div>
        <div className="detail-item-2">
          <div className="border-b">
            <div className="flex items-center">
              <div>Market Cap</div>
              <Info />
            </div>
            <div>${marketCapValue}</div>
          </div>
          <div className="border-b">
            <div>fully Diluted Valuation</div>
            <div>${fullyDilutedValuation}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetail;
