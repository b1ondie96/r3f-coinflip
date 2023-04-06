import Controls from "./Controls";
import FairCode from "./FairCode";
import Game from "./Game";

function App() {
  return (
    <>
      <div className="p-4 flex flex-col gap-4 items-center">
        <div className="w-80 bg-transparent">
          <Game />
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-wrap max-w-sm items-stretch m-auto">
        <Controls />
      </div>
      <div className="flex flex-col mt-4 flex-wrap max-w-sm items-stretch m-auto">
        <FairCode />
      </div>
    </>
  );
}

export default App;
