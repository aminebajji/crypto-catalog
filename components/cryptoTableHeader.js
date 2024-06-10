import React from "react";
import ChevronDown from "../assets/svg/chevronDown";
import Info from "../assets/svg/chevronDown";

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th></th>
        <th className="flex items-center">
          <b># &nbsp;</b>
          <ChevronDown />
        </th>
        <th>Name</th>
        <th>Price</th>
        <th>24h %</th>
        <th>7d %</th>
        <th>
          <div className="flex items-center">
            <p className="mr-2">Volume(24h)</p> <Info />
          </div>
        </th>
        <th>
          <div className="flex items-center">
            <p className="mr-2">Mkt Cap</p> <Info />
          </div>
        </th>
        <th>Last 7 days</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
