import { useGame } from "./GameMaster";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { RiShieldCheckLine } from "react-icons/ri";

const ProvablyFair = () => {
  const { hashedServerSeed, prevServerSeed, coinsFlipped } = useGame();
  return (
    <Popover closeOnBlur>
      <PopoverTrigger>
        <div className="flex cursor-pointer border-2 items-center justify-center rounded-lg border-[--chakra-colors-teal-500] p-3 gap-4">
          <div className="text-xl whitespace-break-spaces font-semibold text-[--chakra-colors-teal-500] uppercase">
            Provably fair
          </div>
          <div className="flex text-4xl text-[--chakra-colors-teal-500]">
            <RiShieldCheckLine />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <div className="flex flex-col">
            <div className="text-base font-bold">
              Next flip hashed seed:{" "}
              <span className="font-normal">{hashedServerSeed}</span>
            </div>
            {prevServerSeed && (
              <div className="text-base font-bold">
                Previous flip seed:{" "}
                <span className="font-normal">{prevServerSeed}</span>
              </div>
            )}
            <div className="text-base font-bold">
              Coins flipped: <span className="font-normal">{coinsFlipped}</span>
            </div>
          </div>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ProvablyFair;
