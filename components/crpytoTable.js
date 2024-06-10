import React, { useEffect, useState } from "react";
import TableHeader from "./cryptoTableHeader";
import getCoins from "../pages/api/crypto";
import CryptoTableRow from "./cryptoTableRow";

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
      <div class="pb-4 bg-white dark:bg-gray-900">
        <label for="table-search" class="sr-only">
          Search
        </label>
        <div class="relative mt-1">
          <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            class="block pt-2 pb-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for a coin"
          />
        </div>
      </div>
      <div>
        <div className="mx-auto max-w-screen-2xl inline-block min-w-full shadow rounded-lg overflow-hidden">
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
                    fullyDilutedValuation={coin.fully_diluted_valuation}
                    totalVolume={coin.total_volume}
                    circulatingSupply={coin.circulating_supply}
                    totalSupply={coin.total_supply}
                    maxSupply={coin.max_supply}
                    low24h={coin.low_24h}
                    high24h={coin.high_24h}
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
        </div>
        <nav aria-label="Page navigation example">
          <ul class="inline-flex -space-x-px text-base h-10">
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                class="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default CryptoTable;
