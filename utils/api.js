export async function fetchCryptoData(
  page,
  perPage,
  retries = 10,
  delay = 10000
) {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, { method: "GET" });
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.statusText}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      if (attempt < retries) {
        console.warn(
          `Attempt ${attempt} failed. Retrying in ${delay}ms...`,
          error
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        console.error(
          "Error fetching crypto data after multiple attempts:",
          error
        );
        throw error;
      }
    }
  }
}
