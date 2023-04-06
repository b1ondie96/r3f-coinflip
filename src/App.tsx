import { useState } from "react";
import Game from "./Game";
import { GameContextProvider } from "./GameMaster";

function App() {
  const [coinsAmount, setCoinsAmount] = useState(1);
  function flip() {}
  return (
    <>
      <GameContextProvider>
        <div className="w-44 bg-transparent">
          <Game coinsAmount={coinsAmount} />
        </div>
      </GameContextProvider>{" "}
    </>
  );
}

export default App;
