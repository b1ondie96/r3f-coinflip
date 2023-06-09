export interface CoinFaceProps {
  args: [
    radius?: number,
    segments?: number,
    thetaStart?: number,
    thetaLength?: number
  ];
  image: string;
  isHeads?: boolean;
}
export interface SingleCoinProps {
  position: [number, number, number];
}
