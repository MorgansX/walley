import type React from "react";
import { Text, View, StyleSheet } from "react-native";
import { CryptoCoinChart } from "@/components/ui/CryptoCoinChart";
import {getCoinChartData} from "@/api/coinMarketApi";
import {useEffect, useState} from "react";

type WalletBalanceItemProps = {
	currency: string;
	amount: string;
};

export const WalletBalanceItem: React.FC<WalletBalanceItemProps> = ({
	currency,
	amount,
}) => {
	const [chartData, setChartData] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [currentMarketPrice, setCurrentMarketPrice] = useState(0)

	const generateSimpleChartData = (currentPrice, percentChange) => {
		const numPoints = 5;
		const data = [];

		for (let i = 0; i < numPoints; i++) {
			const progress = i / (numPoints - 1);
			if (i === numPoints - 1) {
				data.push(currentPrice);
			} else {
				const pointPrice =
					currentPrice / (1 + (percentChange / 100) * (1 - progress));
				data.push(pointPrice);
			}
		}

		return data;
	};

	const totalValue = amount * currentMarketPrice;


	// TODO: MANAGE THIS WITH ZUSTAND
	const fetchCoinData = async () => {
		try {
			const response = await getCoinChartData(currency);
			const data = response.data;

			if (!data.data || !data.data[currency]) {
				throw new Error(`Cryptocurrency ${currency} not found`);
			}

			const coinData = data.data[currency];
			const currentMarketPrice = coinData.quote.USD.price || 0;
			const percentChange = coinData.quote.USD.percent_change_24h || 0;

			setCurrentMarketPrice(currentMarketPrice);

			setChartData({
				datasets: [
					{
						currentMarketPrice,
						data: generateSimpleChartData(currentMarketPrice, percentChange),
						color: (opacity = 1) =>
							percentChange >= 0
								? `rgba(46, 204, 113, ${opacity})`
								: `rgba(231, 76, 60, ${opacity})`,
						strokeWidth: 2,
					},
				],
			});

			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);

			const fallbackPrice = 100;
			setChartData({
				datasets: [
					{
						data: [
							fallbackPrice * 0.98,
							fallbackPrice * 0.99,
							fallbackPrice,
							fallbackPrice * 1.01,
						],
						color: (opacity = 1) => `rgba(150, 150, 150, ${opacity})`,
						strokeWidth: 2,
					},
				],
			});
		}
	};

	useEffect(() => {
		fetchCoinData();
	}, [currency]);

	//TODO: IMPROVE UI OF TEXT ELEMENTS

	return (
		<View style={styles.itemContainer}>
			<View style={styles.leftSection}>
				<View style={styles.currencyInfo}>
					<Text style={styles.currencyName}>{currency}</Text>
					<Text style={styles.amountText}>
						{amount.toLocaleString()} tokens
					</Text>
				</View>
			</View>
			<View style={styles.midSection}>
				<Text style={styles.valueText}>${totalValue.toLocaleString()}</Text>
				<View style={styles.priceContainer}>
					<Text style={styles.priceText}>
						${currentMarketPrice.toLocaleString()}
					</Text>
				</View>
			</View>
			<View style={styles.chartContainer}>
				<CryptoCoinChart chartData={chartData} isLoading={isLoading}/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	itemContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "white",
		marginHorizontal: 16,
		marginBottom: 12,
		padding: 16,
		borderRadius: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	leftSection: {
		flexDirection: "row",
		alignItems: "center",
	},
	currencyInfo: {
		justifyContent: "center",
	},
	currencyName: {
		fontSize: 16,
		fontWeight: "600",
		color: "#333",
	},
	amountText: {
		fontSize: 14,
		color: "#666",
		marginTop: 2,
	},
	midSection: {
		alignItems: "flex-start",
		justifyContent: "flex-start",
	},
	valueText: {
		fontSize: 16,
		fontWeight: "700",
		color: "#333",
	},
	priceContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 2,
	},
	priceText: {
		fontSize: 14,
		color: "#666",
		marginRight: 4,
	},
	chartContainer: {
		width:150
	},
});
