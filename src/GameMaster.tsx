import {
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
  const [isAnimating, setIsAnimating] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [cameraControl, setCameraControl] = useState(false);
  const spinTime = useRef(4);
  const targetFace = useRef<number | undefined>(undefined);
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
    setDisabled(true);
    const number = randomNumber();
    setIsAnimating(true);
    spinTime.current = Math.random() * 7;
    targetFace.current = Math.abs(number % 2) ? Math.PI : 0;
    setRotateSpeed(Math.random() / 3);
    setPrevServerSeed(serverSeed.current.toString());
    setCoinsFlipped((p) => p + 1);
    serverSeed.current = cryptojs.lib.WordArray.random(16);
  }

  return (
    <GameContext.Provider
      value={{
        setCoinsFlipped: setCoinsFlipped,
        prevServerSeed: prevServerSeed,
        hashedServerSeed: hashedServerSeed.toString(),
        serverSeed: serverSeed.current.toString(),
        flipCoin: flipCoin,
        coinsFlipped: coinsFlipped,
        rotateSpeed: rotateSpeed,
        targetFace: targetFace.current,
        setIsAnimating: setIsAnimating,
        isAnimating: isAnimating,
        spinTime: spinTime.current,
        setDisabled: setDisabled,
        disabled: disabled,
        setCameraControl: setCameraControl,
        cameraControl: cameraControl,
        setClientSeed: setClientSeed,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
export const useGame = () => {
  return useContext(GameContext);
};
