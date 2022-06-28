import { Component, Show } from "solid-js";


type Props = {
  position: number;
  pair: any;
};

export const TrendingToken: Component<Props> = (props) => {
  return (
    <div
      style={{ display: 'flex' }}
    >
      <p>#{props.position}</p>

      <div>
        <span>{props.pair.baseAsset?.symbol}</span>/
        {props.pair.quoteAsset?.symbol}
      </div>
    </div>
  );
};

export default TrendingToken;
