import type React from "react";
import {
	View,
	StyleSheet,
	Dimensions,
	Text,
	TouchableOpacity,
	Alert,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import Feather from "@expo/vector-icons/Feather";

const { width } = Dimensions.get("screen");
const ITEM_WIDTH = width - 50;
const ITEM_SPACING = 10;
const DEFAULT_CARD_BG = "#fc3";

type CryptoCardProps = {
	walletToDisplay: string;
	symbol: string;
	fullWalletNumber: string;
	fiatValue?: number;
	cardBackground: string;
};

export const CryptoCard: React.FC<CryptoCardProps> = ({
	walletToDisplay,
	fullWalletNumber,
	symbol,
	fiatValue = 0,
	cardBackground = DEFAULT_CARD_BG,
}) => {
	const handleCopyWallet = async () => {
		await Clipboard.setStringAsync(fullWalletNumber);
		Alert.alert("Copied", "Wallet address copied to clipboard");
	};

	return (
		<View style={[styles.cardContainer, { backgroundColor: cardBackground }]}>
			<View style={styles.balanceContainer}>
				<Text style={styles.balanceAmount}>{symbol}</Text>
				<Text style={styles.fiatValue}>${fiatValue.toLocaleString()}</Text>
			</View>
			<View style={styles.walletContainer}>
				<Text style={styles.walletNumberTitle}>Wallet Address:</Text>
				<View style={styles.walletNumbContainer}>
					<Text style={styles.walletHash}>{walletToDisplay}</Text>
					<TouchableOpacity onPress={handleCopyWallet}>
						<Feather name="copy" size={18} color="white" />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		width: ITEM_WIDTH,
		height: 190,
		borderRadius: 16,
		marginHorizontal: ITEM_SPACING / 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
		elevation: 5,
		justifyContent: "space-between",
	},
	cryptoSymbol: {
		fontSize: 24,
		fontWeight: "800",
		color: "#fff",
	},
	balanceContainer: {
		paddingTop: 20,
		borderRadius: 8,
		marginHorizontal: 16,
	},
	balanceAmount: {
		fontSize: 24,
		fontWeight: "700",
		color: "#fff",
		marginBottom: 2,
	},
	fiatValue: {
		fontSize: 14,
		color: "#8f94a3",
	},
	walletContainer: {
		padding: 16,
	},
	walletNumberTitle: {
		fontSize: 14,
		fontWeight: "500",
		color: "#8f94a3",
		marginBottom: 6,
	},
	walletNumbContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
	},
	walletHash: {
		fontSize: 14,
		fontWeight: "500",
		color: "#fff",
		letterSpacing: 0.5,
	},
});
