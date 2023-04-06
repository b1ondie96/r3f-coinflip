import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import CoinFace from "./CoinFace";
import { useGame } from "./GameMaster";
const SingleCoin = (props) => {
  const meshRef = useRef<Mesh>(null);
  let { targetFace, clock, isAnimating, setIsAnimating } = useGame();

  //rot.z === 0 = queen rot.z === Math.PI = lincoln
  //rot.z < 0-0.1 && rot.z > 0+0.1
  useFrame((state, delta) => {
    let zRot = meshRef.current?.rotation.z;
    if (isAnimating) {
      zRot = 0;
      state.clock.elapsedTime = 0;
      setIsAnimating(false);
    } else if (typeof targetFace === "number") {
      if (state.clock.elapsedTime > 5) {
        if (zRot > targetFace - 0.1 && zRot < targetFace + 0.1) {
          zRot = targetFace;
          return;
        } else meshRef.current?.rotateZ(0.1 / state.clock.elapsedTime);
      } else {
        meshRef.current?.rotateZ(0.1 / state.clock.elapsedTime);
      }
    } else {
      meshRef.current?.rotateZ(0.01);
      state.clock.elapsedTime = 0;
      return;
    }
  });
  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      rotation={[Math.PI / 2, 0, 0]}
      {...props}
    >
      <cylinderGeometry args={[5, 5, 0.6, 35]} />
      <CoinFace image="lincoln.png" isHeads args={[5, 35]} />
      <CoinFace image="queen.png" args={[5, 35]} />
      <meshStandardMaterial color={"black"} />
    </mesh>
  );
};

export default SingleCoin;
