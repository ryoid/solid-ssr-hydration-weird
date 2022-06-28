import fetch from "cross-fetch";

/**
 * Returns a properly formatted URL with the query parameters `params`.
 * All `null` or `undefined` values in `params` are removed.
 *
 * @param baseUrl Base URL without trailing `?`
 * @param params Plain js `Record<string, string>` object
 * @returns The properly formatted URL
 */
export function withQueryParams(
  baseUrl: string,
  params: Record<string, any>
): string {
  const paramsWithoutNullishValues: Record<string, any> = {};
  for (const [key, val] of Object.entries(params)) {
    if (val == null) {
      continue;
    }
    paramsWithoutNullishValues[key] = val;
  }

  return `${baseUrl}?${(new URLSearchParams(paramsWithoutNullishValues)).toString()}`;
}

const BASE_API_URL =  "https://api.coinhall.org"

// api to fetch the trendingList
export async function getTrendingList(): Promise<any[]> {
  const res = await fetch(`${BASE_API_URL}/api/v1/pairs/trending`);

  return res.json();
}

export function formatApiPairs(apiPairs: any): any {
  const pairs: any = {};

  for (const [
    addr,
    {
      asset0,
      asset1,
      type,
      defaultBase,
      timestamp,
      dex,
      unofficial,
      startAt,
      endAt,
      llp,
    },
  ] of Object.entries<any>(apiPairs)) {
    const [baseAsset, quoteAsset] =
      defaultBase === "asset0" ? [asset0, asset1] : [asset1, asset0];
    pairs[addr] = {
      baseAsset,
      quoteAsset,
      type,
      name: `${baseAsset.symbol}/${quoteAsset.symbol}`,
      timestamp: new Date(timestamp),
      dex,
      unofficial,
      startAt: startAt && new Date(startAt),
      endAt: endAt && new Date(endAt),
      llp,
    };
  }

  return pairs;
}

export async function getApiPairs(): Promise<any> {
  const res = await fetch(`${BASE_API_URL}/api/v1/charts/terra/pairs`);

  return res.json();
}

export async function getTradingPairs() {
  const apiPairs = await getApiPairs();
  return formatApiPairs(apiPairs);
}

export async function getLatestPrices() {
  const res = await fetch(`${BASE_API_URL}/api/charts/terra/prices/latest`);

  return res.json();
}

export async function getYesterdayPrices(
  pairs: string | string[]
): Promise<Record<string, number>> {
  const res = await fetch(
    withQueryParams(`${BASE_API_URL}/api/charts/terra/prices/historical`, {
      pairs,
    })
  );

  return res.json();
}
