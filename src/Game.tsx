import { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import SingleCoin from "./SingleCoin";
import { useGame } from "./GameMaster";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CameraController = () => {
  const { camera, gl } = useThree();
  const { cameraControl } = useGame();
  const controls = new OrbitControls(camera, gl.domElement);
  useEffect(() => {
    controls.minDistance = 3;
    controls.maxDistance = 20;
    return () => {
      controls.reset();
      controls.dispose();
    };
  }, [camera, gl, cameraControl]);
  return null;
};
const Game = () => {
  const { cameraControl } = useGame();
  return (
    <>
      <Canvas
        orthographic
        camera={{
          zoom: 15,
          rotation: [0, 0, 0],
        }}
      >
        {cameraControl && <CameraController />}
        <SingleCoin position={[0, 0, -1]} />
      </Canvas>
    </>
  );
};

export default Game;
