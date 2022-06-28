import fetch from "cross-fetch";

export async function getUstPriceFromCG(): Promise<number> {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=terrausd&vs_currencies=usd"
  );

  const data = await res.json();

  return data.terrausd.usd;
}

export async function getLunaPriceFromCG(): Promise<number> {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=terra-luna-2&vs_currencies=usd"
  );

  const data = await res.json();

  return data["terra-luna-2"].usd;
}
