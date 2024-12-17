"use client";

import { useEffect, useState } from "react";
import sdk from "@farcaster/frame-sdk";

export default function Swap() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[300px] mx-auto py-4 px-2">
      {/* Wallet Address */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Swap</h1>
        <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
          0x1234...5678
        </div>
      </div>

      {/* Sell Token Input */}
      <div className="bg-gray-100 rounded-lg p-4 mb-3">
        <div className="flex items-center gap-2 mb-2">
          <select className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg cursor-pointer">
            <option className="flex items-center gap-2">🔵 ETH</option>
            <option className="flex items-center gap-2">🟡 USDC</option>
          </select>
          <input
            type="number"
            placeholder="0.0"
            className="bg-transparent text-xl w-full outline-none text-right"
          />
        </div>
        <div className="text-right text-sm text-gray-500">Balance: 0.00</div>
      </div>

      {/* Buy Token Input */}
      <div className="bg-gray-100 rounded-lg p-4 mb-3">
        <div className="flex items-center gap-2 mb-2">
          <select className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg cursor-pointer">
            <option className="flex items-center gap-2">🟡 USDC</option>
            <option className="flex items-center gap-2">🔵 ETH</option>
          </select>
          <input
            type="number"
            placeholder="0.0"
            className="bg-transparent text-xl w-full outline-none text-right"
          />
        </div>
        <div className="text-right text-sm text-gray-500">Balance: 0.00</div>
      </div>

      {/* Swap Button */}
      <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700 font-medium">
        Swap Tokens
      </button>
    </div>
  );
}
