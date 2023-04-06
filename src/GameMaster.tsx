import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import cryptojs from "crypto-js";

const GameContext = createContext<any | null>(null);
export function GameContextProvider({ children }: { children: ReactNode }) {
  const [clientSeed, setClientSeed] = useState("");
  const [coinsFlipped, setCoinsFlipped] = useState(0);
  const [prevServerSeed, setPrevServerSeed] = useState("");
  const [rotateSpeed, setRotateSpeed] = useState(0);
  const targetFace = useRef(undefined);
  const clockRef = useRef(0);
  const serverSeed = useRef(cryptojs.lib.WordArray.random(16));
  const hashedServerSeed = useMemo(
    () => cryptojs.HmacSHA256(serverSeed.current.toString(), "fairynuff"),
    [coinsFlipped]
  );

  const randomNumber = () => {
    const hmac = cryptojs.HmacSHA256(
      clientSeed + serverSeed.current.toString(),
      "fairynuff"
    );
    const provablyFairNumber = hmac.words.reduce((result, value, i) => {
      const divider = 1 ** (i + 1);
      const partialResult = value / divider;
      return result + partialResult;
    }, 0);

    return provablyFairNumber;
  };
  function flipCoin() {
    clockRef.current = 0;
    const number = randomNumber();
    console.log(Math.abs(number % 2) ? Math.PI : 0);
    targetFace.current = Math.abs(number % 2) ? Math.PI : 0;
    setRotateSpeed(Math.random() / 3);
    setPrevServerSeed(serverSeed.current.toString());
    setCoinsFlipped((p) => p + 1);
    serverSeed.current = cryptojs.lib.WordArray.random(16);
  }
  console.log(clockRef.current);
  return (
    <GameContext.Provider
      value={{
        prevServerSeed: prevServerSeed,
        hashedServerSeed: hashedServerSeed.toString(),
        serverSeed: serverSeed.current.toString(),
        flipCoin: flipCoin,
        coinsFlipped: coinsFlipped,
        rotateSpeed: rotateSpeed,
        targetFace: targetFace.current,
        clock: clockRef.current,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
export const useGame = () => {
  return useContext(GameContext);
};
