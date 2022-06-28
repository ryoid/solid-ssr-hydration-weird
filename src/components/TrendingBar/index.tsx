import { Component, createMemo, For, Show } from "solid-js";

import store from "../../store";
import TrendingToken from "./TrendingToken/index";

const TrendingBanner: Component = () => {
  const {
    boot: { hasBootData, tradingPairs, trendingList: trendingList },
  } = store;

  return (
    <>
      <div>
        <Show
          when={
            hasBootData() &&
            trendingList()?.length > 0 &&
            Object.keys(tradingPairs()).length > 0
          }
          fallback={<div>Loading trending</div>}
        >
          <div style={{ display: "flex" }}>
            <For each={trendingList()}>
              {(pair, i) => {
                const _pair = createMemo(
                  () => tradingPairs()[`${pair.pairAddress}`]
                );
                return (
                  <a href={`/charts/terra/${pair.pairAddress}`}>
                    <TrendingToken position={i() + 1} pair={_pair()} />
                  </a>
                );
              }}
            </For>
          </div>
        </Show>
      </div>
    </>
  );
};

export default TrendingBanner;
