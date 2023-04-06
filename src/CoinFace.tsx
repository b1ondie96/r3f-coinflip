import { useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import { Mesh, TextureLoader } from "three";
import { CoinFaceProps } from "./types";
const CoinFace = (props: CoinFaceProps) => {
  const meshRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, props.image);

  return (
    <mesh
      ref={meshRef}
      position={props.isHeads ? [0, -0.31, 0] : [0, 0.31, 0]}
      rotation={[Math.PI / 2, 0, Math.PI]}
      /* scale={[0.98, 0.98, 0.98]} */
    >
      <circleGeometry args={props.args} />
      <meshBasicMaterial map={texture} transparent alphaTest={0.5} side={2} />
    </mesh>
  );
};

export default CoinFace;
