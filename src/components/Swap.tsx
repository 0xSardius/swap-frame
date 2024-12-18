"use client";

import { useEffect, useState } from "react";
import sdk from "@farcaster/frame-sdk";
import { useAccount, useDisconnect } from "wagmi";

import { Button } from "~/components/ui/Button";
import { truncateAddress } from "~/lib/truncateAddress";

export default function Swap() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  const [sellAmount, setSellAmount] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);

  const [sellToken, setSellToken] = useState("ETH");
  const [buyToken, setBuyToken] = useState("USDC");

  const { address } = useAccount();
  const { disconnect } = useDisconnect();

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
        <h1 className="text-xl font-bold mr-2">Swap</h1>
        <div className="flex items-center gap-1">
          <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
            {address ? truncateAddress(address) : "Connect Wallet"}
          </div>
          {address && (
            <Button
              onClick={() => disconnect()}
              className="px-1.5 h-6 min-w-6 hover:bg-gray-100"
            >
              ×
            </Button>
          )}
        </div>
      </div>

      {/* Sell Token Input */}
      <div className="bg-gray-100 rounded-lg p-4 mb-3">
        <div className="flex items-center gap-2 mb-2">
          <select
            value={sellToken}
            onChange={(e) => setSellToken(e.target.value)}
            className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg cursor-pointer"
          >
            <option value="ETH">🔵 ETH</option>
            <option value="USDC">🟡 USDC</option>
          </select>
          <input
            value={sellAmount}
            onChange={(e) => setSellAmount(Number(e.target.value))}
            type="number"
            placeholder="0.0"
            className="bg-transparent text-xl w-full outline-none text-right"
          />
        </div>
        <div className="text-right text-sm text-gray-500">Balance: 0.00</div>
      </div>

      {/* Interchange Button */}
      <button
        onClick={() => {
          setSellAmount(buyAmount);
          setBuyAmount(sellAmount);
          setSellToken(buyToken);
          setBuyToken(sellToken);
        }}
        className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all mx-auto -my-2 block relative z-10"
      >
        ⇅
      </button>

      {/* Buy Token Input */}
      <div className="bg-gray-100 rounded-lg p-4 mb-3">
        <div className="flex items-center gap-2 mb-2">
          <select
            value={buyToken}
            onChange={(e) => setBuyToken(e.target.value)}
            className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg cursor-pointer"
          >
            <option value="USDC">🟡 USDC</option>
            <option value="ETH">🔵 ETH</option>
          </select>
          <input
            value={buyAmount}
            onChange={(e) => setBuyAmount(Number(e.target.value))}
            type="number"
            placeholder="0.0"
            className="bg-transparent text-xl w-full outline-none text-right"
          />
        </div>
        <div className="text-right text-sm text-gray-500">Balance: 0.00</div>
      </div>

      {/* Swap Button */}
      <Button className="w-full py-6 mt-4 font-medium">Swap Tokens</Button>
    </div>
  );
}
