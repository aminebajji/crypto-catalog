import { fetchCryptoData } from "../../utils/api";

export default async function getCoins(req, res) {
  const { page = 1, perPage = 10 } = req.query;

  try {
    const data = await fetchCryptoData(page, perPage);
    const list_data = await fetchCryptoData();
    const totalCoins = list_data.length;
    const totalPages = parseInt(totalCoins / perPage) + 1;
    const coins = [];

    for (let i = 0; i < data.length; i++) {
      const coin = data[i];
      const coinPercentage1h = parseFloat(
        coin.price_change_percentage_1h_in_currency.toFixed(1)
      );
      const coinPercentage24h = parseFloat(
        coin.price_change_percentage_24h_in_currency.toFixed(1)
      );
      const coinPercentage7d = parseFloat(
        coin.price_change_percentage_7d_in_currency.toFixed(1)
      );
      const coinIndex = coin.image.replace(
        "https://assets.coingecko.com/coins/images/",
        ""
      )[0];
      const low24h = parseFloat(coin.low_24h.toFixed(8));
      const high24h = parseFloat(coin.high_24h.toFixed(8));

      coins.push({
        id: coin.id,
        symbol: coin.symbol,
        rank: coin.market_cap_rank,
        number: i + 1,
        isFavorite: false,
        name: coin.name,
        logo: coin.image.replace("large", "small"),
        price: coin.current_price,
        percentage1h: coinPercentage1h,
        percentage24h: coinPercentage24h,
        percentage7d: coinPercentage7d,
        volume: coin.total_volume,
        marketCap: coin.market_cap,
        index: coin.symbol.toUpperCase(),
        circulating_supply: coin.circulating_supply,
        large_image: coin.image,
        dRateIsIncrement: coin.dRateIsIncrement,
        dRate: coin.dRate,
        fully_diluted_valuation: coin.fully_diluted_valuation,
        total_volume: coin.total_volume,
        circulating_supply: coin.circulating_supply,
        total_supply: coin.total_supply,
        max_supply: coin.max_supply,
        high_24h: coin.high_24h,
        low_24h: coin.low_24h,
        prices_array: coin.sparkline_in_7d.price,
      });
    }
    console.log("hada", totalCoins);
    const response = { coins, totalPages };
    return response;
  } catch (error) {
    console.error(error);
  }
}
