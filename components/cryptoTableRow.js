import React from "react";
import Image from "next/image";
import Star from "../assets/svg/star";
import Rate from "./rate";
import { useRouter } from "next/router";
import Info from "@/assets/svg/info";

const styles = {
  tableRow: `bg-white border-b dark:bg-gray-800 dark:border-gray-700`,
  flexContainer: `flex items-center`,
  tableCell: `px-6 py-4 text-gray-900 dark:text-white`, // consistent padding to table cells
  tableCellWithImage: `px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer`,
};

const CryptoTableRow = ({
  starNum,
  coinName,
  coinIcon,
  coinSymbol = "---",
  price = "----",
  hRate = "---",
  dRate = "---",
  hRateIsIncrement,
  dRateIsIncrement,
  marketCapValue = "---",
  volumeValue = "---",
  largeImage,
}) => {
  const graphImages = [
    "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/52.svg",
    "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1.svg",
    "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/825.svg",
    "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/3408.svg",
    "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/5426.svg",
    "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/7129.svg",
    "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/3957.svg",
    "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/328.svg",
    "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/2416.svg",
    "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1765.svg",
    "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/2099.svg",
    "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/7653.svg",
  ];
  const getRandomGraph = () => {
    const rndInt = Math.floor(Math.random() * graphImages.length);
    return graphImages[rndInt];
  };

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

  return (
    <tr className={styles.tableRow}>
      <td className={styles.tableCell}>
        <Star />
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
        <Image src={getRandomGraph()} width={150} height={60} alt="" />
      </td>
    </tr>
  );
};

export default CryptoTableRow;
