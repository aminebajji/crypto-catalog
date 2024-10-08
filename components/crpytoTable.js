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
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [filterField, setFilterField] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [totalPages, setTotalPages] = useState(1); // To keep track of the total number of pages

  const fetchData = async (page, rowsPerPage) => {
    setLoading(true);
    try {
      const data = await getCoins({
        query: { page, perPage: rowsPerPage },
      });
      setCryptoData(data.coins);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleSearch = () => {
    fetchData(page, rowsPerPage);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (e) => {
    const newRowsPerPage = Number(e.target.value);
    setRowsPerPage(newRowsPerPage);
    setPage(1); // Reset page to 1 when rows per page changes
  };

  const handleResetFilters = () => {
    setSearchText("");
    setFilterField("");
    setFilterValue("");
    setPage(1);
    fetchData(1, rowsPerPage);
  };
  //(cryptoData.totalPages);
  const handleFilterChange = (value) => {
    if (value && typeof value === "object" && value.target) {
      value = value.target.value;
    }
    setFilterField(value);
    setFilterValue("");
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  const renderFilterValueInput = () => {
    if (!filterField) {
      return null; // Render nothing if no filter field is selected
    }

    let placeholderText = "";
    switch (filterField.toLowerCase()) {
      case "id":
        placeholderText = "Enter Id";
        break;
      case "name":
        placeholderText = "Enter Name";
        break;
      case "code":
        placeholderText = "Enter Code";
        break;
      case "type":
        placeholderText = "Enter Type";
        break;
      default:
        placeholderText = "Enter Value";
    }

    return (
      <Input
        label="Value"
        placeholder={placeholderText}
        className="max-w-[220px]"
        value={filterValue}
        onChange={handleFilterValueChange}
      />
    );
  };

  const filteredData = cryptoData.filter((coin) => {
    if (searchText) {
      return (
        coin.name.toLowerCase().includes(searchText.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterValue) {
      const lowerFilterField = filterField.toLowerCase();
      if (lowerFilterField === "id") {
        return coin.id.toString().includes(filterValue);
      } else if (lowerFilterField === "code") {
        return coin.symbol.toLowerCase().includes(filterValue.toLowerCase());
      } else if (lowerFilterField === "name") {
        return coin.name.toLowerCase().includes(filterValue.toLowerCase());
      } else if (lowerFilterField === "type") {
        return coin.type.toLowerCase().includes(filterValue.toLowerCase());
      }
    }

    return true;
  });

  const filterOptions = [
    { value: "id", label: "Id" },
    { value: "name", label: "Name" },
    { value: "code", label: "Code" },
    { value: "type", label: "Type" },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner color="warning" size="lg" />
      </div>
    );
  }

  return (
    <>
      <div className="pb-4 bg-white dark:bg-gray-900 flex items-center space-x-2">
        <div className="relative mt-1">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[60%] pb-2",
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
            {renderFilterValueInput()}
            <Button onClick={handleResetFilters}>Reset</Button>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center pb-2">
        <span className="text-default-400 text-small">
          Total {cryptoData.length} coins
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
            <option value="100">100</option>
          </select>
        </label>
      </div>
      <div>
        <div className="mx-auto max-w-screen-2xl inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="w-full text-orange">
            <TableHeader />
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((coin, index) => (
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
