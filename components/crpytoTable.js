import React, { useEffect, useState } from "react";
import TableHeader from "./cryptoTableHeader";
import getCoins from "../pages/api/crypto";
import CryptoTableRow from "./cryptoTableRow";
import {
  Pagination,
  Input,
  Spinner,
  Autocomplete,
  AutocompleteItem,
  Button,
} from "@nextui-org/react";
import SearchIcon from "@/assets/svg/search";

const CryptoTable = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
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

  useEffect(() => {
    handleSearch();
  }, [searchText, filterField, filterValue, cryptoData]);

  const handleSearch = () => {
    let newFilteredData = cryptoData;

    if (searchText) {
      newFilteredData = newFilteredData.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchText.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterValue) {
      newFilteredData = newFilteredData.filter((coin) => {
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

    setFilteredData(newFilteredData);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
    }
  };

  const handleRowsPerPageChange = (e) => {
    const newRowsPerPage = e.target.value;
    setRowsPerPage(Number(newRowsPerPage));
    setPage(1); // Reset page to 1 when rows per page changes
  };

  const handleResetFilters = () => {
    setSearchText("");
    setFilterField("id");
    setFilterValue("");
  };

  const handleFilterChange = (value) => {
    setFilterField(value);
    setFilterValue(""); // Reset filter value when filter field changes
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner color="warning" size="lg" />
      </div>
    );
  }

  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const filterOptions = [
    { value: "id", label: "Id" },
    { value: "name", label: "Name" },
    { value: "code", label: "Code" },
    { value: "type", label: "Type" },
  ];

  return (
    <>
      <div className="pb-4 bg-white dark:bg-gray-900 flex items-center space-x-2">
        <div className="relative mt-1">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[40%] pb-2",
              inputWrapper: "border-2",
            }}
            placeholder="Search for a coin"
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            variant="bordered"
          />
          <div className="flex items-center space-x-2 pt-1">
            <Autocomplete
              label="Filter by"
              placeholder="Select filter criteria"
              className="max-w-xs"
              onSelect={handleFilterChange}
              value={filterField}
              disableSelectorIconRotation
            >
              {filterOptions.map((option) => (
                <AutocompleteItem key={option.value} value={option.value}>
                  {option.label}
                </AutocompleteItem>
              ))}
            </Autocomplete>
            <Input
              label="Value"
              placeholder="Enter the value"
              className="max-w-[220px]"
              value={filterValue}
              onChange={handleFilterValueChange}
            />
            <Button onClick={handleResetFilters}>Reset</Button>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center pb-2">
        <span className="text-default-400 text-small">
          Total {cryptoData.length} users
        </span>
        <label className="flex items-center text-default-400 text-small">
          Rows per page:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </label>
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
          page={page}
          total={totalPages}
          variant="light"
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default CryptoTable;
