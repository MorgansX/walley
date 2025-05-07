import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Dimensions,
	Text,
	TouchableOpacity, Alert,
} from "react-native";
import * as Clipboard from 'expo-clipboard';
import {Budge} from "@/components/ui/Budge";

const { width } = Dimensions.get("screen");
const ITEM_WIDTH = width - 50;
const ITEM_SPACING = 10;

type CryptoCardProps = {
	walletToDisplay: string;
	symbol: string;
	fullWalletNumber: string;
	balance?: number;
	fiatValue?: number;
};

export const CryptoCard: React.FC<CryptoCardProps> = ({
	walletToDisplay,
	fullWalletNumber,
	symbol,
	balance = 0,
	fiatValue = 0,
}) => {
	const [isShowFullAddress, setIsShowFullAddress] = useState(false);

	const displayAddress = isShowFullAddress
		? fullWalletNumber
		: walletToDisplay;
	const handleCopyWallet = async () => {
		await Clipboard.setStringAsync(fullWalletNumber);
		Alert.alert("Copied", "Wallet address copied to clipboard");
	};

	const toggleAddressDisplay = () => {
		setIsShowFullAddress(!isShowFullAddress);
	};

	return (
		<View style={styles.cardContainer}>
			<View style={styles.cardHeader}>
				<Text style={styles.cryptoSymbol}>{symbol}</Text>
				<Budge title={'Active'} backgroundColor={'#00c087'}/>
			</View>

			<View style={styles.balanceContainer}>
				<Text style={styles.balanceLabel}>Balance</Text>
				<Text style={styles.balanceAmount}>
					{balance} {symbol}
				</Text>
				<Text style={styles.fiatValue}>${fiatValue.toLocaleString()}</Text>
			</View>

			<View style={styles.walletContainer}>
				<Text style={styles.walletNumberTitle}>Wallet Address</Text>
				<Text style={styles.walletHash}>{displayAddress}</Text>
			</View>

			<View style={styles.cardFooter}>
				<TouchableOpacity
					style={styles.actionButton}
					onPress={handleCopyWallet}
				>
					<Text style={styles.actionButtonText}>Copy Wallet</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.actionButton}
					onPress={toggleAddressDisplay}
				>
					<Text style={styles.actionButtonText}>
						{isShowFullAddress ? "Hide Full Address" : "Show Full Address"}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		width: ITEM_WIDTH,
		height: 280,
		backgroundColor: "#1a1f36",
		borderRadius: 16,
		marginHorizontal: ITEM_SPACING / 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
		elevation: 5,
		justifyContent: "space-between",
	},
	cardHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 16,
	},
	cryptoSymbol: {
		fontSize: 24,
		fontWeight: "800",
		color: "#fff",
	},
	balanceContainer: {
		padding: 16,
		backgroundColor: "rgba(255,255,255,0.05)",
		borderRadius: 8,
		marginHorizontal: 16,
	},
	balanceLabel: {
		fontSize: 12,
		color: "#8f94a3",
		marginBottom: 4,
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
	walletHash: {
		fontSize: 14,
		fontWeight: "500",
		color: "#fff",
		letterSpacing: 0.5,
	},
	cardFooter: {
		flexDirection: "row",
		borderTopWidth: 1,
		borderTopColor: "rgba(255,255,255,0.1)",
		padding: 12,
	},
	actionButton: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 8,
		flexDirection: "row",
		justifyContent: "center",
	},
	actionButtonText: {
		color: "#677bff",
		fontWeight: "600",
	},
});
