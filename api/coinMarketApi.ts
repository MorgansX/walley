import axios from "axios";

const COINMARKET_API_KEY = process.env.EXPO_PUBLIC_COINMARKET_API_KEY;

const coinMarketApi = axios.create({
	baseURL: "https://pro-api.coinmarketcap.com",
	headers: {
		"X-CMC_PRO_API_KEY": COINMARKET_API_KEY,
		Accept: "application/json",
	},
});

export const getCoinChartData = async (coinSymbol: string) =>
	await coinMarketApi.get("/v1/cryptocurrency/quotes/latest", {
		params: {
			symbol: coinSymbol,
		},
	});
