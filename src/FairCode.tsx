import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import { agate } from "react-syntax-highlighter/dist/esm/styles/hljs";
SyntaxHighlighter.registerLanguage("javascript", js);
const FairCode = () => {
  return (
    <Accordion allowToggle>
      <AccordionItem color={"white"}>
        <AccordionButton>
          <Box
            as="span"
            flex="1"
            textAlign="left"
            className="text-white font-semibold"
          >
            Provably fair code
          </Box>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel pb={4}>
          <SyntaxHighlighter language="javascript" style={agate}>
            {`const serverSeed = cryptojs.lib.WordArray.random(16);
function randomNumber() {
const hmac = cryptojs.HmacSHA256(
clientSeed + serverSeed.toString(),"fairynuff");
const provablyFairNumber = hmac.words.reduce(
  (result, value, i) => {
    const divider = 1 ** (i + 1);
    const partialResult = value / divider;
  return result + partialResult
  }, 0);      
return provablyFairNumber;
};`}
          </SyntaxHighlighter>
          <p className="mt-2">
            Then we check if return of randomNumber() is odd or even and set
            coin face accordingly.
          </p>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default FairCode;
