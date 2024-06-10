import React from "react";
import ChevronDown from "../assets/svg/chevronDown";
import Info from "../assets/svg/info";
import Star from "../assets/svg/star";

const TableHeader = () => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3"></th>
        <th scope="col" className="px-6 py-3">
          <b># &nbsp;</b>
        </th>
        <th scope="col" className="px-6 py-3">
          Name
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          24h %
        </th>
        <th scope="col" className="px-6 py-3">
          7d %
        </th>
        <th scope="col" className="px-6 py-3">
          <div className="flex items-center">
            <p className="mr-2">Volume(24h)</p> <Info />
          </div>
        </th>
        <th scope="col" className="px-6 py-3">
          <div className="flex items-center">
            <p className="mr-2">Mkt Cap</p> <Info />
          </div>
        </th>
        <th scope="col" className="px-6 py-3">
          Last 7 days
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
