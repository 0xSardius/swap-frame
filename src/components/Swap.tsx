"use client";

import { useEffect, useState } from "react";
import sdk from "@farcaster/frame-sdk";
import { useAccount, useDisconnect, useConnect } from "wagmi";

import { Button } from "~/components/ui/Button";
import { truncateAddress } from "~/lib/truncateAddress";

interface Token {
  symbol: string;
  name: string;
  image: string;
  address: string;
  decimals: number;
}

export default function Swap() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  const [sellAmount, setSellAmount] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);

  const [sellToken, setSellToken] = useState("ETH");
  const [buyToken, setBuyToken] = useState("USDC");

  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, connectors } = useConnect();

  const tokens: Record<string, Token> = {
    eth: {
      symbol: "ETH",
      name: "Ethereum",
      image: "https://svgmix.com/uploads/3287b3-ethereum-eth.svg",
      address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      decimals: 18,
    },
    usdc: {
      symbol: "USDC",
      name: "USDC",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ43MuDqq54iD1ZCRL_uthAPkfwSSL-J5qI_Q&s",
      address: "0x7f5c7618cd0b377ee65f826b136e7c83788287ea",
      decimals: 6,
    },
  };

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
        <div className="flex items-center gap-0.5">
          {address ? (
            <>
              <div className="bg-gray-100 px-2 py-1 rounded-full text-sm truncate max-w-[120px]">
                {truncateAddress(address)}
              </div>
              <Button
                onClick={() => disconnect()}
                className="px-1 h-6 min-w-6 hover:bg-gray-100 flex items-center justify-center"
              >
                ×
              </Button>
            </>
          ) : (
            <Button
              onClick={() => connect({ connector: connectors[0] })}
              className="px-3 py-1 text-sm"
            >
              Connect Wallet
            </Button>
          )}
        </div>
      </div>

      {/* Sell Token Input */}
      <div className="bg-gray-100 rounded-lg p-4 mb-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-2">
            <img
              src={tokens[sellToken.toLowerCase()].image}
              alt={tokens[sellToken.toLowerCase()].name}
              className="w-4 h-4"
            />
            <select
              value={sellToken}
              onChange={(e) => setSellToken(e.target.value)}
              className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg cursor-pointer"
            >
              <option value={tokens.eth.symbol}>{tokens.eth.symbol}</option>
              <option value={tokens.usdc.symbol}>{tokens.usdc.symbol}</option>
            </select>
          </div>
          <input
            value={sellAmount}
            onChange={(e) => setSellAmount(Number(e.target.value))}
            type="number"
            inputMode="decimal"
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
          <div className="flex items-center gap-2">
            <img
              src={tokens[buyToken.toLowerCase()].image}
              alt={tokens[buyToken.toLowerCase()].name}
              className="w-4 h-4"
            />
            <select
              value={buyToken}
              onChange={(e) => setBuyToken(e.target.value)}
              className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg cursor-pointer"
            >
              <option value={tokens.usdc.symbol}>{tokens.usdc.symbol}</option>
              <option value={tokens.eth.symbol}>{tokens.eth.symbol}</option>
            </select>
          </div>
          <input
            value={buyAmount}
            onChange={(e) => setBuyAmount(Number(e.target.value))}
            type="number"
            inputMode="decimal"
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
