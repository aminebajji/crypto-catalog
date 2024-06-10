import React, { useEffect, useState } from "react";
import TableHeader from "./cryptoTableHeader";
import getCoins from "../pages/api/crypto";
import CryptoTableRow from "./cryptoTableRow";
import { Pagination } from "@mui/material";

const CryptoTable = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = () => {
    if (!cryptoData) return [];
    return cryptoData.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchText.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCoins({ query: { page, perPage: 10 } });
        setCryptoData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData();
  }, [page]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <form className="flex flex-col md:flex-row gap-3">
        <div className="flex">
          <input
            type="text"
            placeholder="Search for a coin"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full md:w-80 px-3 h-10 rounded-l border-2 border-black focus:outline-none focus:border-black"
          />
          <button
            type="submit"
            className="bg-black text-white rounded-r px-2 md:px-3 py-0 md:py-1"
          >
            Search
          </button>
        </div>
        <select
          id="pricingType"
          name="pricingType"
          className="w-full h-10 border-2 border-black focus:outline-none focus:border-black text-black rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
        >
          <option value="All" selected="">
            Filters
          </option>
          <option value="Freemium">Freemium</option>
          <option value="Free">Free</option>
          <option value="Paid">Paid</option>
        </select>
      </form>
      <div className="font-bold">
        <div className="mx-auto max-w-screen-2xl">
          <table className="w-full text-black">
            <TableHeader />
            <tbody>
              {cryptoData && cryptoData.length > 0 ? (
                handleSearch().map((coin, index) => (
                  <CryptoTableRow
                    key={index}
                    starNum={coin.rank}
                    coinName={coin.name}
                    coinSymbol={coin.symbol}
                    coinIcon={coin.logo}
                    showBuy={true}
                    hRate={coin.percentage24h}
                    dRate={coin.percentage7d}
                    hRateIsIncrement={coin.percentage24h >= 0}
                    price={coin.price}
                    marketCapValue={coin.marketCap}
                    volumeValue={coin.volume}
                    largeImage={coin.large_image}
                    fullyDilutedValuation={coin.fullyDilutedValuation}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <Pagination
            style={{
              padding: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            count={10}
            page={page}
            onChange={(event, value) => setPage(value)}
          />
        </div>
      </div>
    </>
  );
};

export default CryptoTable;
