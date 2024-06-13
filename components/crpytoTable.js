import React, { useEffect, useState } from "react";
import TableHeader from "./cryptoTableHeader";
import getCoins from "../pages/api/crypto";
import CryptoTableRow from "./cryptoTableRow";
import { Pagination, Input, Spinner } from "@nextui-org/react";
import SearchIcon from "@/assets/svg/search";

const CryptoTable = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [filterField, setFilterField] = useState("id");
  const [filterValue, setFilterValue] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    try {
      const data = await getCoins({ query: { page, perPage: rowsPerPage } });
      setCryptoData(data.coins);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  const handleSearch = () => {
    let filteredData = cryptoData;

    if (searchText) {
      filteredData = filteredData.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchText.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterValue) {
      filteredData = filteredData.filter((coin) => {
        if (filterField === "id") {
          return coin.id.toString().includes(filterValue);
        } else if (filterField === "code") {
          return coin.symbol.toLowerCase().includes(filterValue.toLowerCase());
        } else if (filterField === "name") {
          return coin.name.toLowerCase().includes(filterValue.toLowerCase());
        } else if (filterField === "type") {
          return coin.type.toLowerCase().includes(filterValue.toLowerCase());
        }
        return true;
      });
    }

    return filteredData;
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
    }
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(Number(newRowsPerPage));
    setPage(1); // Reset page to 1 when rows per page changes
  };

  const handleResetFilters = () => {
    setSearchText("");
    setFilterField("id");
    setFilterValue("");
    fetchData(); // Refetch data after resetting filters
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner color="warning" size="lg" />
      </div>
    );
  }

  const filteredData = handleSearch();
  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <>
      <div className="pb-4 bg-white dark:bg-gray-900 flex items-center space-x-2">
        <div className="relative mt-1">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[100%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search for a coin"
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
          />
        </div>
        <div className="flex items-center space-x-2 pt-1">
          <select
            value={filterField}
            onChange={(e) => setFilterField(e.target.value)}
            className="block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
          >
            <option value="id">ID</option>
            <option value="code">Code</option>
            <option value="name">Name</option>
            <option value="type">Type</option>
          </select>
          <input
            type="text"
            placeholder={`Filter by ${filterField}`}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="block py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
          />
          <button
            onClick={handleResetFilters}
            className="flex items-center justify-center p-2 text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              width={15}
              height={15}
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M22.719 12A10.719 10.719 0 0 1 1.28 12h.838a9.916 9.916 0 1 0 1.373-5H8v1H2V2h1v4.2A10.71 10.71 0 0 1 22.719 12z"></path>
                <path fill="none" d="M0 0h24v24H0z"></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <select
            id="rows-per-page"
            value={rowsPerPage}
            onChange={(e) => handleRowsPerPageChange(e.target.value)}
            className="block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
      <div>
        <div className="mx-auto max-w-screen-2xl inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="w-full text-orange">
            <TableHeader />
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((coin, index) => (
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
                    prices={coin.prices_array}
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
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          //isDisabled={hasSearchFilter}
          page={page}
          total={totalPages}
          variant="light"
          onChange={setPage}
        />
      </div>
    </>
  );
};

export default CryptoTable;
