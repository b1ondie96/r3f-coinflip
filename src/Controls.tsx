import React from "react";
import { useGame } from "./GameMaster";
import ProvablyFair from "./ProvablyFair";
import {
  Switch,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
const Controls = () => {
  const {
    clientSeed,
    setClientSeed,
    flipCoin,
    disabled,
    setCameraControl,
    cameraControl,
  } = useGame();
  return (
    <>
      <Input
        value={clientSeed}
        onChange={(e) => setClientSeed(e.currentTarget.value)}
        id="seed"
        className="font-semibold text-white"
        type="text"
        placeholder="Your seed (optional)"
        variant="outline"
        focusBorderColor="teal.500"
      />

      <Button
        colorScheme={"teal"}
        isDisabled={disabled}
        onClick={() => flipCoin()}
      >
        Flip it
      </Button>
      <FormControl
        display="flex"
        alignItems="center"
        justifyContent={"space-evenly"}
      >
        <FormLabel color={"white"} htmlFor="camera-control">
          Enable free camera?
        </FormLabel>
        <Switch
          colorScheme={"teal"}
          id="camera-control"
          isDisabled={disabled}
          value={cameraControl}
          onChange={() => setCameraControl(!cameraControl)}
        />
      </FormControl>
      <ProvablyFair />
    </>
  );
};

export default Controls;
