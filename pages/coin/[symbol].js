import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CoinDetail from "../../components/coinDetail";
import Header from "../../components/header";

const CoinDetailPage = () => {
  const router = useRouter();
  const [coinData, setCoinData] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      const query = router.query;

      // Parse query parameters to retrieve coin data
      const coinData = {
        starNum: query.starNum,
        coinName: query.coinName,
        coinIcon: query.coinIcon,
        coinSymbol: query.coinSymbol,
        price: query.price,
        hRate: query.hRate,
        dRate: query.dRate,
        hRateIsIncrement: query.hRateIsIncrement === "true", // Convert to boolean
        dRateIsIncrement: query.dRateIsIncrement === "true", // Convert to boolean
        marketCapValue: query.marketCapValue,
        largeImage: query.largeImage,
        price: query.price,
        fullyDilutedValuation: query.fullyDilutedValuation,
        totalVolume: query.totalVolume,
        circulatingSupply: query.circulatingSupply,
        totalSupply: query.totalSupply,
        maxSupply: query.maxSupply,
        high24h: query.high24h,
        low24h: query.low24h,
      };

      setCoinData(coinData);
    }
  }, [router.isReady, router.query]);

  if (!coinData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen text-black">
      <div className="container mx-auto px-4">
        <Header />
        <CoinDetail coinData={coinData} />
      </div>
    </div>
  );
};

export default CoinDetailPage;
