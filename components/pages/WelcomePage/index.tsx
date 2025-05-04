import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PageContainer } from "@/components/containers/PageContainer";
import { AppButton } from "@/components/ui/AppButton";
import {
	useWalletConnectModal,
	WalletConnectModal,
} from "@walletconnect/modal-react-native";
import { providerMetadata } from "@/constants/providerMetaData";
import { useGetNetworkData } from "@/hooks/useGetNetworkData";

export const WelcomePage = () => {
	const { projectId, networkState } = useGetNetworkData();
	const { open, provider } = useWalletConnectModal();

	return (
		<PageContainer>
			<View style={styles.itemsContainer}>
				<Text>Block number: {networkState.blockNumber}</Text>
				<Text>Gas price: {networkState.gasPrice} ETH </Text>
				<View style={styles.buttonWrapper}>
					<AppButton title={"Connect Wallet"} onPress={open} />
					<AppButton
						title="Disconnect"
						variant={"error"}
						onPress={() => provider?.disconnect()}
						color="red"
					/>
				</View>
				<WalletConnectModal
					projectId={projectId}
					providerMetadata={providerMetadata}
				/>
			</View>
		</PageContainer>
	);
};
const styles = StyleSheet.create({
	itemsContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonWrapper: {
		width: "90%",
		height: 180,
		justifyContent: "space-around",
	},
});
