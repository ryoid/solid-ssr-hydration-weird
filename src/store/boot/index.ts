import { createSignal, onMount, batch } from "solid-js";
import { getTradingPairs, getTrendingList } from "../../utils/api";

// import {
//   getGasPrices,
//   getNativeSwapRate,
//   getTradingPairs,
// } from "../../utils/api";
// import { getTrendingList } from "src/components/layout/TrendingBanner/utils/api";
import { getLunaPriceFromCG, getUstPriceFromCG } from "./api";

/**
 * Main store which must be setup on boot in order for other stores to work.
 */
function setupBootStore() {
  // loading indicator for all data
  const [hasBootData, setHasBootData] = createSignal<boolean>(false);

  // gas prices
  const [gasPrices, setGasPrices] = createSignal<Record<string, number>>({});

  // * temporary workaround while support for Terra v2 is being built
  const [nativeCoinUsdPrices, setNativeCoinUsdPrices] = createSignal<
    Record<string, number>
  >({});
  const [lunaPrice, setLunaPrice] = createSignal<number>(0);
  const [ustPrice, setUstPrice] = createSignal<number>(0);

  // pairs
  const [tradingPairs, setTradingPairs] = createSignal<any>({});

  //trending pairs
  const [trendingList, setTrendingList] = createSignal<any>([]);

  onMount(async () => {
    const [
      tradingPairs,
      trendingList,
      ustPrice,
      lunaPrice,
    ] = await Promise.all([
      getTradingPairs(),
      getTrendingList(),
      getUstPriceFromCG(),
      getLunaPriceFromCG(),
    ]);

    batch(() => {
      setTradingPairs(tradingPairs);
      setTrendingList(trendingList);
      setUstPrice(ustPrice);
      setLunaPrice(lunaPrice);
    });

    console.log("setting boot data");
    console.log({
      hasBootData: hasBootData(),
      trendingList,
      tradingPairs,
    });
    setHasBootData(true);

    //* hack to make HMR not duplicate the polling calls multiple times
    //* manually refresh the page during dev if any logic is changed
    if ((window as any).__refreshBootDataInterval) {
      clearInterval((window as any).__refreshBootDataInterval);
    }
    // refresh pairs every 15 mins
    (window as any).__refreshBootDataInterval = setInterval(async () => {
      try {
        const [
          tradingPairs,
          trendingList,
          ustPrice,
          lunaPrice,
        ] = await Promise.all([
          getTradingPairs(),
          getTrendingList(),
          getUstPriceFromCG(),
          getLunaPriceFromCG(),
        ]);

        batch(() => {
          setTradingPairs(tradingPairs);
          setTrendingList(trendingList);
          setUstPrice(ustPrice);
          setLunaPrice(lunaPrice);
        });
      } catch (err) {}
    }, 900000);
  });

  return {
    hasBootData,
    gasPrices,
    nativeCoinUsdPrices,
    lunaPrice,
    ustPrice,
    tradingPairs,
    trendingList,
  };
}

export default setupBootStore;
