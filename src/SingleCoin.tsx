import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import CoinFace from "./CoinFace";
import { useGame } from "./GameMaster";
import { SingleCoinProps } from "./types";
const SingleCoin = (props: SingleCoinProps) => {
  const meshRef = useRef<Mesh>(null);
  let { targetFace, isAnimating, setIsAnimating, spinTime, setDisabled } =
    useGame();

  useFrame((state, _) => {
    let zRot = meshRef.current?.rotation.z;
    if (typeof zRot !== "number") return;
    if (isAnimating) {
      state.clock.start();
      setIsAnimating(false);
    } else if (typeof targetFace === "number") {
      if (state.clock.elapsedTime > spinTime) {
        if (zRot > targetFace - 0.1 && zRot < targetFace + 0.1) {
          zRot = targetFace;
          setDisabled(false);
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
      position={props.position}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <cylinderGeometry args={[5, 5, 0.6, 35]} />
      <CoinFace image="lincoln.png" isHeads args={[5, 35]} />
      <CoinFace image="queen.png" args={[5, 35]} />
      <meshStandardMaterial color={"black"} />
    </mesh>
  );
};

export default SingleCoin;
