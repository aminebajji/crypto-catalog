import React from "react";
import Image from "next/image";
import Rate from "./rate";
import Info from "@/assets/svg/info";
import ThButton from "./thButton";

const CoinDetail = ({ coinData }) => {
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
    totalVolume,
    circulatingSupply,
    totalSupply,
    maxSupply,
    high24h,
    low24h,
  } = coinData;

  let percentagePrice = 0;
  const maxPrice = parseFloat(high24h.replace(/,/g, ""));
  const minPrice = parseFloat(low24h.replace(/,/g, ""));
  const priceFloat = parseFloat(price.replace(/,/g, ""));

  if (
    !isNaN(maxPrice) &&
    !isNaN(minPrice) &&
    !isNaN(priceFloat) &&
    maxPrice - minPrice !== 0
  ) {
    percentagePrice = ((priceFloat - minPrice) / (maxPrice - minPrice)) * 100;
  }

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
          <span className="ml-2 uppercase">{coinSymbol}</span>
        </div>
        <div className="flex items-center">
          <div className="mt-2 font-bold text-3xl">
            <p>${price}</p>
          </div>
          <div className="pt-3">
            <div className="px-4 py-2 flex items-center">
              <div className="mr-2 font-bold">
                <Rate isIncrement={dRateIsIncrement} rate={`${dRate}%`} />
              </div>
              <Info />
            </div>
          </div>
        </div>

        <ThButton />

        <div className="flex flex-col items-start">
          <div className="progress-container w-full bg-gray-300 rounded h-2">
            <div
              className="progress-bar bg-blue-500 h-2 rounded"
              style={{ width: `${percentagePrice}%` }}
            ></div>
          </div>
          <div className="flex justify-between interval mt-2 w-full">
            <div className="text-sm">${low24h}</div>
            <div className="text-sm">24h Range</div>
            <div className="text-sm">${high24h}</div>
          </div>
        </div>
        <div className="detail-item-2 mt-4">
          <div className="border-b py-2">
            <div className="flex items-center">
              <div>Market Cap</div>
              <Info />
            </div>
            <div>${marketCapValue}</div>
          </div>
          <div className="border-b py-2">
            <div>Fully Diluted Valuation</div>
            <div>${fullyDilutedValuation}</div>
          </div>
          <div className="border-b py-2">
            <div>24 Hour Trading Vol</div>
            <div>${totalVolume}</div>
          </div>
          <div className="border-b py-2">
            <div>Circulating Supply</div>
            <div>${circulatingSupply}</div>
          </div>
          <div className="border-b py-2">
            <div>Total Supply</div>
            <div>${totalSupply}</div>
          </div>
          <div className="border-b py-2">
            <div>Max Supply</div>
            <div>${maxSupply}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetail;
