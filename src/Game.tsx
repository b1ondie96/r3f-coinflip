import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import SingleCoin from "./SingleCoin";
import cryptojs from "crypto-js";
import { useGame } from "./GameMaster";

interface Props {
  coinsAmount: number;
}
const Game = ({ coinsAmount }: Props) => {
  const { hashedServerSeed, flipCoin, prevServerSeed, coinsFlipped } =
    useGame();

  return (
    <>
      <Canvas
        orthographic
        camera={{
          zoom: 15,
        }}
      >
        <SingleCoin position={[0, 0, -1]} />
      </Canvas>
      <div className="text-lg">{hashedServerSeed}</div>
      <div className="text-lg">{prevServerSeed}</div>
      <div className="text-lg">Coins flipped: {coinsFlipped}</div>
      <button onClick={() => flipCoin()}>flip</button>
    </>
  );
};

export default Game;
