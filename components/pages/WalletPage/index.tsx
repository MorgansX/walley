import { PageContainer } from "@/components/containers/PageContainer";
import { Text, FlatList, View, StyleSheet, Dimensions } from "react-native";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import { useEffect, useState } from "react";
import { publicClient } from "@/hooks/useGetNetworkData";
import { formatUnits } from "viem";
import { CryptoCard } from "@/components/ui/CryptoCard";
import { shortenAddress } from "@/utils/shortenWalletAdrees";

export type CryptoCardItem = {
	symbol: string;
	wallet: string;
};

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width - 50; // Each item takes screen width minus 50px
const ITEM_SPACING = 10;
const HORIZONTAL_SNAP = ITEM_WIDTH + ITEM_SPACING;

// ERC-20 ABI for balanceOf function
const ERC20_ABI = [
	{
		inputs: [{ name: "account", type: "address" }],
		name: "balanceOf",
		outputs: [{ name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "decimals",
		outputs: [{ name: "", type: "uint8" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "symbol",
		outputs: [{ name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
];

// List of common ERC-20 tokens on Ethereum mainnet
const COMMON_TOKENS = [
	{ name: "Ethereum", symbol: "ETH", address: null, decimals: 18 },
	{
		name: "USD Coin",
		symbol: "USDC",
		address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
		decimals: 6,
	},
	{
		name: "Tether USD",
		symbol: "USDT",
		address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
		decimals: 6,
	},
	{
		name: "DAI Stablecoin",
		symbol: "DAI",
		address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
		decimals: 18,
	},
	{
		name: "Wrapped Bitcoin",
		symbol: "WBTC",
		address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
		decimals: 8,
	},
	{
		name: "Chainlink",
		symbol: "LINK",
		address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
		decimals: 18,
	},
	{
		name: "Uniswap",
		symbol: "UNI",
		address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
		decimals: 18,
	},
	{
		name: "Shiba Inu",
		symbol: "SHIB",
		address: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
		decimals: 18,
	},
];

export const WalletPage = () => {
	const { address: walletAddress } = useWalletConnectModal();
	const [tokenBalances, setTokenBalances] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const displayAddress = walletAddress
		? `${walletAddress.slice(0, 5)}...${walletAddress.slice(walletAddress.length - 5)}`
		: "Not connected";

	// Function to get all token balances
	const getAllTokenBalances = async () => {
		if (!walletAddress) {
			setIsLoading(false);
			return;
		}

		try {
			setIsLoading(true);
			const balancesPromises = COMMON_TOKENS.map(async (token) => {
				try {
					let balance;
					let formattedBalance;

					if (token.address === null) {
						// For native ETH
						balance = await publicClient.getBalance({ address: walletAddress });
						formattedBalance = formatUnits(balance, 18);
					} else {
						// For ERC-20 tokens
						balance = await publicClient.readContract({
							address: token.address,
							abi: ERC20_ABI,
							functionName: "balanceOf",
							args: [walletAddress],
						});
						formattedBalance = formatUnits(balance, token.decimals);
					}

					return {
						...token,
						balance: balance,
						formattedBalance: formattedBalance,
					};
				} catch (error) {
					console.log(`Error fetching balance for ${token.symbol}:`, error);
					return {
						...token,
						balance: 0n,
						formattedBalance: "0",
						error: true,
					};
				}
			});

			const balances = await Promise.all(balancesPromises);
			// Filter out tokens with zero balance
			const nonZeroBalances = balances.filter(
				(token) => parseFloat(token.formattedBalance) > 0,
			);

			setTokenBalances(nonZeroBalances.length ? nonZeroBalances : balances);
			setIsLoading(false);
		} catch (error) {
			console.log("Error fetching token balances:", error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getAllTokenBalances();
	}, [walletAddress]);

	const renderTokenItem = ({ item }) => (
		<View style={styles.tokenItem}>
			<Text style={styles.tokenSymbol}>{item.symbol}</Text>
			<Text style={styles.tokenBalance}>
				{parseFloat(item.formattedBalance).toLocaleString(undefined, {
					maximumFractionDigits: 4,
				})}
			</Text>
		</View>
	);

	const renderData: Array<CryptoCardItem> = [
		{
			symbol: "ETH",
			wallet:
				"a7a11b01036bfe386c659552942ccb0c9e8ee8d60d300a0f91e3125c8c7dc5ac",
		},
		{
			symbol: "ETH",
			wallet: "a7a11b01036bfe386dddw942ccb0c9e8ee8d60d300a0f91e3125c8c7dc5ac",
		},
	];

	const handleRenderDataItems = ({ item: { wallet, symbol } }) => {
		const walletToDisplay = shortenAddress(wallet);
		return (
			<CryptoCard
				walletToDisplay={walletToDisplay}
				fullWalletNumber={wallet}
				symbol={symbol}
			/>
		);
	};

	return (
		<PageContainer>
			<FlatList<CryptoCardItem>
				snapToInterval={HORIZONTAL_SNAP}
				showsHorizontalScrollIndicator={false}
				snapToAlignment="center"
				decelerationRate="fast"
				contentContainerStyle={styles.listContent}
				horizontal
				keyExtractor={({ wallet }) => wallet}
				data={renderData}
				renderItem={(item) => handleRenderDataItems(item)}
			/>

			<Text style={styles.balanceTitle}>Token Balances</Text>
		</PageContainer>
	);
};

const styles = StyleSheet.create({
	listContent: {
		paddingHorizontal: 10,
		height: 310,
	},
	addressContainer: {
		marginBottom: 20,
		padding: 16,
		backgroundColor: "#f5f5f5",
		borderRadius: 8,
	},
	addressLabel: {
		fontSize: 14,
		color: "#666",
		marginBottom: 4,
	},
	addressText: {
		fontSize: 16,
		fontWeight: "bold",
	},
	balanceTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 12,
	},
	tokenList: {
		width: "100%",
	},
	tokenItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},
	tokenSymbol: {
		fontSize: 16,
		fontWeight: "500",
	},
	tokenBalance: {
		fontSize: 16,
	},
	loadingText: {
		padding: 20,
		textAlign: "center",
	},
	emptyText: {
		padding: 20,
		textAlign: "center",
		color: "#888",
	},
});
