export async function fetchCryptoData(page, perPage) {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=50&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`,
      { method: "GET" }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    throw error;
  }
}
