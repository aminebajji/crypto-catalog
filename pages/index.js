import Image from "next/image";
import CryptoTable from "../components/crpytoTable";
import Header from "../components/header";
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen text-black">
      <div className="container mx-auto px-4">
        <Header />
        <CryptoTable />
      </div>
    </div>
  );
}
