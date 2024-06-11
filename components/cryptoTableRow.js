// components/CryptoTableRow.js
import React, { useState } from "react";
import Image from "next/image";
import Star from "../assets/svg/star";
import Rate from "./rate";
import { useRouter } from "next/router";
import ChartLine from "./chartLine";

const styles = {
  tableRow: `bg-white border-b dark:bg-gray-800 dark:border-gray-700`,
  flexContainer: `flex items-center`,
  tableCell: `px-6 py-4 text-gray-900 dark:text-white`,
  tableCellWithImage: `px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer`,
};

const CryptoTableRow = ({
  starNum,
  coinName,
  coinIcon,
  coinSymbol,
  price,
  hRate,
  dRate,
  hRateIsIncrement,
  dRateIsIncrement,
  marketCapValue,
  volumeValue,
  largeImage,
  fullyDilutedValuation,
  totalVolume,
  circulatingSupply,
  totalSupply,
  maxSupply,
  low24h,
  high24h,
  prices,
}) => {
  const [starColor, setStarColor] = useState("none");
  const router = useRouter();

  const viewCoinDetails = (coinSymbol) => {
    const coinData = {
      starNum,
      coinName,
      coinIcon,
      coinSymbol,
      price,
      hRate,
      dRate,
      hRateIsIncrement,
      dRateIsIncrement,
      marketCapValue,
      volumeValue,
      largeImage,
      fullyDilutedValuation,
      totalVolume,
      circulatingSupply,
      totalSupply,
      maxSupply,
      low24h,
      high24h,
    };

    const query = new URLSearchParams(coinData).toString();
    const targetPath = `/coin/${coinSymbol}?${query}`;

    if (router.asPath !== targetPath) {
      router.push(targetPath);
    }
  };

  const formatNum = (num) => {
    return Number(num.toFixed(2)).toLocaleString();
  };

  price = formatNum(price);
  dRate = formatNum(dRate);
  marketCapValue = formatNum(marketCapValue);
  fullyDilutedValuation = formatNum(parseFloat(fullyDilutedValuation));
  totalVolume = formatNum(parseFloat(totalVolume));
  circulatingSupply = formatNum(parseFloat(circulatingSupply));
  totalSupply = formatNum(parseFloat(totalSupply));
  maxSupply = formatNum(parseFloat(maxSupply));
  low24h = formatNum(parseFloat(low24h));
  high24h = formatNum(parseFloat(high24h));

  return (
    <tr className={styles.tableRow}>
      <td className={styles.tableCell}>
        <div
          onClick={() => setStarColor("yellow")}
          style={{ cursor: "pointer" }}
        >
          <Star color={starColor} />
        </div>
      </td>
      <td className={styles.tableCell}>{starNum}</td>

      {coinIcon && (
        <td
          className={styles.tableCellWithImage}
          onClick={() => viewCoinDetails(coinSymbol)}
        >
          <div className={styles.flexContainer}>
            <Image src={coinIcon} alt={coinName} width={20} height={20} />
            <p>{coinName}</p>
          </div>
        </td>
      )}

      <td className={styles.tableCell}>
        <p>${price}</p>
      </td>
      <td className={styles.tableCell}>
        <Rate isIncrement={dRateIsIncrement} rate={`${dRate}%`} />
      </td>
      <td className={styles.tableCell}>
        <Rate isIncrement={hRateIsIncrement} rate={`${formatNum(hRate)}%`} />
      </td>

      <td className={styles.tableCell}>
        <div>
          <p>${formatNum(volumeValue)}</p>
        </div>
      </td>

      <td className={styles.tableCell}>
        <div>
          <p>${marketCapValue}</p>
        </div>
      </td>

      <td className={styles.tableCell}>
        <ChartLine data={prices} />
      </td>
    </tr>
  );
};

export default CryptoTableRow;
